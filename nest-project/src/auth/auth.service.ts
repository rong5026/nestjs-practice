import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Payload } from './security/payload.interface';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: {username: newUser.username}
        });

        if (userFind) {
            throw new HttpException("username already used!", HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async validateUser(userDTO: UserDTO): Promise<{accessToken: string} | undefined> {
        let userFind: User = await this.userService.findByFields({
            where: { username: userDTO.username}
        });
        const validatePasswrod = await bcrypt.compare(userDTO.password, userFind.password);
        if(!userFind || !validatePasswrod) {
            throw new UnauthorizedException();
        }
        const payload: Payload = { id: userFind.id , username: userFind.username};

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        return await this.userService.findByFields({
            where: { id: payload.id }
        });
    }
}
