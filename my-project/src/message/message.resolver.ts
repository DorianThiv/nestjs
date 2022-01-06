import { Delete } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private service: MessageService) {
    }

    // @Query(() => String)
    // getMessage(): string {
    //     return '<h1>Home</h1>'
    // }

    @Query(() => Message)
    async index() {
      return await this.service.findAll();
    }
  
    @Query(() => Message)
    async find(@Args('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Query(() => Message)
    async create(createTodoDto: Message) {
      return await this.service.create(createTodoDto);
    }
  
    @Query(() => Message)
    async update(@Args('id') id: string, updateTodoDto: Message) {
      return await this.service.update(id, updateTodoDto);
    }
  
    @Query(() => Message)
    async delete(@Args('id') id: string) {
      return await this.service.delete(id);
    }

    

}
