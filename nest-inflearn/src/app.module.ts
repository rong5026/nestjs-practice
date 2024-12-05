import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Board, BoardSchema } from './boards/board.entity';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    BoardsModule,
    AuthModule
  ],

})
export class AppModule {}
