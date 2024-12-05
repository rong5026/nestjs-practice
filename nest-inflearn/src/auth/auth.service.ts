import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './user.entity';
import { authCredentialsDto } from './dto/auth-credentail.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectConnection()
        private readonly connectopm: mongoose.Connection,
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){}

    async signUp(authCredentialsDto: authCredentialsDto): Promise<void> {
        const {userName, password} = authCredentialsDto;
        const user = await this.findUserByName(userName);
       
        if (user) {
            throw new HttpException({ status: HttpStatus.CONFLICT, error: 'User already exists'}, HttpStatus.CONFLICT);
        }
        
        const newUser = new this.userModel({
            userName,
            password
        });
        
        newUser.save();
    }

    async findUserByName(userName: string): Promise<User> {
        return await this.userModel.findOne({userName});
    }
    
}
