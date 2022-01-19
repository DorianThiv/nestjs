import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class TypeInput {

    @Field(type => String)
    name: string;

}