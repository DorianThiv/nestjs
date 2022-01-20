import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from 'mongoose';
import { SchemaTypes } from "mongoose";
import { Message } from "src/message/schema/message.schema";

export type TypeDocument = Type & Document;

@Schema()
@ObjectType()
export class Type {

    @Field(() => ID)
    _id: string;

    @Prop({ required: true })
    @Field(type => String)
    name: string;

    messages: Message[];

}

export const TypeSchema = SchemaFactory.createForClass(Type);