import { Body, Controller, Get, Post, Param, Delete, Put, Patch, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validtaion.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boarsdService: BoardsService){}

    @Get("/")
    getAllBoards(): Promise<Board[]> {
        return this.boarsdService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Promise<Board> {
        return this.boarsdService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Promise<Board> {
       return this.boarsdService.createBoard(createBoardDto);
    }   

    @Delete('/:id')
    deleteBoard(@Param('id') id: string) : void {
        this.boarsdService.deleteBoard(id);
    }

    @Patch(':id/status')
    updateBoard(
        @Param('id') id: string, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        return this.boarsdService.updateBoard(id, status);
    }
}
