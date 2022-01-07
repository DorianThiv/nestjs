import { Delete } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './schema/message.schema';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private service: MessageService) {
    }

    @Query(() => Message)
    async all() {
      return await this.service.findAll();
    }
  
    @Query(() => Message)
    async find(@Args('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Mutation(() => Message)
    async create(createDto: Message) {
      return await this.service.create(createDto);
    }
  
    @Mutation(() => Message)
    async update(@Args('id') id: string, updateDto: Message) {
      return await this.service.update(id, updateDto);
    }
  
    @Query(() => Message)
    async delete(@Args('id') id: string) {
      return await this.service.delete(id);
    }

    

}
