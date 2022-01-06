import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private readonly model: Model<MessageDocument>) {
    }

    async findAll(): Promise<Message[]> {
        return await this.model.find().exec();
    }
    
    async findOne(id: string): Promise<Message> {
        return await this.model.findById(id).exec();
    }
    
    async create(createTodoDto: Message): Promise<Message> {
        return await new this.model({...createTodoDto, createdAt: new Date(), updatedAt: new Date()}).save();
    }
    
    async update(id: string, updateTodoDto: Message): Promise<Message> {
        updateTodoDto.updatedAt = new Date();
        return await this.model.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
    }
    
    async delete(id: string): Promise<Message> {
        return await this.model.findByIdAndDelete(id).exec();
    }

}
