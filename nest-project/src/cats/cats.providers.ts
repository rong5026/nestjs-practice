import { DataSource } from 'typeorm';
import { Cat } from './entity/cats.entity';

export const catsProviders = [
    {
        provide: Cat,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Cat),
        inject: ['DATA_SOURCE'],
    },
];
