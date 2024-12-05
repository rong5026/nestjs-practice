import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { get } from 'http';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class BoardsService {
    constructor(
        @InjectConnection()
        private readonly connection: mongoose.Connection,
        @InjectModel(Board.name)
        private readonly boardModel: Model<Board>
    ){}


    async getAllBoards(): Promise<Board[]> {
        return this.boardModel.find().exec();
    }

    async getBoardById(id: string) : Promise<Board> {
        const found = await this.boardModel.findById(id).exec();

        if (!found) {
            throw new NotFoundException(`Can not find board with id ${id}`);
        }
        return found;
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const newBoard = new this.boardModel({
            title,
            description
        });
        return newBoard.save();
    }

    deleteBoard(id: string): void {
       this.boardModel.findByIdAndDelete(id).exec();
    }

    async updateBoard(id: string, status: BoardStatus): Promise<Board> {
        return this.boardModel.findByIdAndUpdate(
            id,
            {status},
            {new: true},
        ).exec();
    }
}
