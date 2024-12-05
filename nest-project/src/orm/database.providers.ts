
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'ghddudghks1029',
        database: 'nest',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
        logging: true
      });

      return dataSource.initialize();
    },
  },
];
