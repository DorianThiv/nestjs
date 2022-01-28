import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type PictureDocument = Picture & mongoose.Document;

@Schema()
@ObjectType()
export class Picture {

    @Field(() => ID)
    _id: string;

    @Prop()
    @Field(() => String)
    name: string;

    @Prop()
    @Field(() => Number)
    width: number;

    @Prop()
    @Field(() => Number)
    height: number;

    @Prop()
    @Field(() => String)
    cocoUrl: string;

    @Prop()
    @Field(() => String)
    flickrUrl: string;

    @Prop()
    @Field(() => Date)
    dateCaptured: Date;

    constructor() {
    }

}

export const PictureSchema = SchemaFactory.createForClass(Picture);