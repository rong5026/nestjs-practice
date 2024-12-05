import { timestamp } from "rxjs";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps : true })
export class User extends Document {

    @Prop({ required: true})
    userName: string;

    @Prop({ required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);