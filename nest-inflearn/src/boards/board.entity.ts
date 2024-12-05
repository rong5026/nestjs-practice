import { BoardStatus } from './board-status.enum';
import { Document, HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: true})
export class Board extends Document {

    @Prop({ required: true})
    title: string;

    @Prop({ required: true})
    description: string;

    @Prop({ required: true, enum: BoardStatus, default: BoardStatus.PUBLIC})
    status: BoardStatus;
}

export const BoardSchema = SchemaFactory.createForClass(Board);