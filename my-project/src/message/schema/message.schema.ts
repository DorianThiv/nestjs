import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from '../../type/schema/type.schema';


export type MessageDocument = Message & Document;

@Schema()
@ObjectType()
export class Message {

    @Field(() => ID)
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Type.name, required: true })
    @Field(() => Type)
    type: string;

    @Prop({ required: true })
    @Field(type => String)
    content: string;

    @Prop()
    completedAt?: Date;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop()
    deletedAt?: Date;

}

export const MessageSchema = SchemaFactory.createForClass(Message);