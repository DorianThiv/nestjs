import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from '../../type/schema/type.schema';

export type MessageDocument = Message & Document;

@Schema()
@ObjectType()
export class Message {

    @Prop()
    @Field(() => ID)
    id: string;

    @Prop({ required: true })
    @Field(type => Type)
    type: Type;

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