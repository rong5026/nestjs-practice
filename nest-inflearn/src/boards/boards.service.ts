import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    getBoardById(id: string) : Board {
        const found = this.boards.find((board ) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can not find board with id ${id}`);
        }
        return found;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoard(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
