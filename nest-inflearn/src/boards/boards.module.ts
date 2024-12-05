import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board } from './board.entity';
import { BoardSchema } from './board.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Board.name, schema: BoardSchema}
    ])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
