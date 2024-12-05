import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board } from './board.entity';
import { BoardSchema } from './board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Board.name, schema: BoardSchema}
    ]),
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
