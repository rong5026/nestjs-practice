import { Inject, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { Cat } from './entity/cats.entity';

@Injectable()
export class CatsService {

    constructor(
        @Inject(Cat)
        private catsRepository: Repository<Cat>,
    ) {}

    async findAll():Promise<Cat[]> {
        return this.catsRepository.find();
    }

    async findOne(id: number): Promise<Cat> {
        return this.catsRepository.findOne({ where: { id } });
    }

    async create(cat: Cat): Promise<void> {
        await this.catsRepository.save(cat);
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id);
    }
    
    async update(id: number, cat: Cat): Promise<void> {
        const existedCat = await this.findOne(id);
        if (existedCat) {
            await getConnection()
            .createQueryBuilder()
            .update(Cat)
            .set({
                name: cat.name,
                age: cat.age,
                breed: cat.breed
            })
            .where("id = :id", {id})
            .execute();
        }
    }
    
}
