import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TypeDocument = Type & Document;

@Schema()
@ObjectType()
export class Type {

    @Field(() => ID)
    id: string;

    @Prop({ required: true })
    @Field(type => String)
    name: string;

}

export const TypeSchema = SchemaFactory.createForClass(Type);