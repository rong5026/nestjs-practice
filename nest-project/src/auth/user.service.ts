import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { UserDTO } from "./dto/user.dto";
import * as bcypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject(User)
        private userReposotpry: Repository<User>,
    ) {}

    async findByFields(option: FindOneOptions<User>): Promise<User | undefined> {
        return await this.userReposotpry.findOne(option);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        await this.transformPassword(userDTO);

        return await this.userReposotpry.save(userDTO);
    }

    async transformPassword(user: UserDTO): Promise<void> {
        user.password = await bcypt.hash(
            user.password,
            10
        );
        return Promise.resolve();
    }
}