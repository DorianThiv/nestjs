import { Query, Resolver } from '@nestjs/graphql';
import { Message } from './dto/message.dto';

@Resolver()
export class MessageResolver {

    @Query(() => String)
    getMessage(): string {
        return JSON.stringify(new Message());
    }

}
