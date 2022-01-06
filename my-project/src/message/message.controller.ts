import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { Message } from './schemas/message.schema';

@Controller('messages')
export class MessageController {

    constructor(private resolver: MessageResolver) {
    }

    @Get()
    async index() {
      return await this.resolver.index();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.resolver.find(id);
    }
  
    @Post()
    async create(@Body() createTodoDto: Message) {
      return await this.resolver.create(createTodoDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTodoDto: Message) {
      return await this.resolver.update(id, updateTodoDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.resolver.delete(id);
    }
}
