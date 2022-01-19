
import { Field, InputType } from "@nestjs/graphql";
import { TypeInput } from "src/type/schema/type.input";

@InputType()
export class MessageInput {

    @Field()
    type: string;

    @Field(type => String)
    content: string;

}