import { Delete } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private service: MessageService) {
    }

    @Query(() => Message)
    async allMessages() {
      return await this.service.findAll();
    }
  
    @Query(() => Message)
    async findMessage(@Args('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Mutation(() => Message)
    async createMessage(createDto: Message) {
      return await this.service.create(createDto);
    }
  
    @Mutation(() => Message)
    async updateMessage(@Args('id') id: string, updateDto: Message) {
      return await this.service.update(id, updateDto);
    }
  
    @Query(() => Message)
    async deleteMessage(@Args('id') id: string) {
      return await this.service.delete(id);
    }

    

}
