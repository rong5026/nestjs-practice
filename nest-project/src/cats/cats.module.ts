import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { DatabaseModule } from 'src/orm/database.module';
import { catsProviders } from './cats.providers';

@Module({ 
  imports: [DatabaseModule],
  providers: [
    ...catsProviders,
    CatsService
  ],
  controllers: [CatsController]
})
export class CatsModule {}
