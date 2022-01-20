
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MessageInput {

    @Field()
    type: string;

    @Field(type => String)
    content: string;

}