import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    getUser() : string {
        return "유저입니다";
    }
}
