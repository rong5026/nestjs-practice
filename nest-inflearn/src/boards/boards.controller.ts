import { Body, Controller, Get, Post, Param, Delete, Put, Patch, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boarsdService: BoardsService){}

    @Get("/")
    getAllBoards(): Board[] {
        return this.boarsdService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boarsdService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
       return this.boarsdService.createBoard(createBoardDto);
    }   

    @Delete('/:id')
    deleteBoard(@Param('id') id: string) : void {
        this.boarsdService.deleteBoard(id);
    }

    @Patch(':id/status')
    updateBoard(@Param('id') id: string, @Body('status') status: BoardStatus): Board {
        return this.boarsdService.updateBoard(id, status);
    }
}
