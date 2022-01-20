import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Type } from '../type/schema/type.schema';
import { TypeService } from '../type/type.service';
import { MessageService } from './message.service';
import { MessageInput } from './schema/message.input';
import { Message } from './schema/message.schema';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private service: MessageService, private typeService: TypeService) {
    }

    @Query(() => [Message])
    async allMessages() {
      return await this.service.findAll();
    }
  
    @Query(() => Message)
    async findMessage(@Args('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Mutation(() => Message)
    async createMessage(@Args('input') input: MessageInput) {
      return await this.service.create(input);
    }
  
    @Mutation(() => Message)
    async updateMessage(@Args('id') id: string, @Args('input') input: MessageInput) {
      return await this.service.update(id, input);
    }

    @ResolveField('type', () => Type)
    async type(@Parent() message: Message) {
      return this.typeService.findOne(String(message.type));
    }
  
    @Query(() => Message)
    async deleteMessage(@Args('id') id: string) {
      return await this.service.delete(id);
    }

    

}
