import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './user.entity';
import { authCredentialsDto } from './dto/auth-credentail.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectConnection()
        private readonly connectopm: mongoose.Connection,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ){}

    async signUp(authCredentialsDto: authCredentialsDto): Promise<void> {
        const {userName, password} = authCredentialsDto;
        const user = await this.findUserByName(userName);
       
        if (user) {
            throw new HttpException({ status: HttpStatus.CONFLICT, error: 'User already exists'}, HttpStatus.CONFLICT);
        }
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new this.userModel({
            userName,
            password: hashedPassword
        });
        
        newUser.save();
    }

    async findUserByName(userName: string): Promise<User> {
        return await this.userModel.findOne({userName});
    }

    async signin(authCredentialsDto: authCredentialsDto): Promise<{accessToken: string}> {
        const {userName, password} = authCredentialsDto;
        const user = await this.findUserByName(userName);

        if (user && (await bcrypt.compare(password, user.password))) {

            const payload = {userName};
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken} ;
         } else {
            throw new UnauthorizedException('logIn filed');
         }
        
    }
    
}
