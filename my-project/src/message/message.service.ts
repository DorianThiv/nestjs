import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageInput } from './schema/message.input';
import { Message, MessageDocument } from './schema/message.schema';

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private readonly model: Model<MessageDocument>) {
    }

    async findAll(): Promise<Message[]> {
        return await this.model.find().exec();
    }
    
    async findOne(id: String): Promise<Message> {
        return await this.model.findById(id).exec();
    }
    
    async create(input: MessageInput): Promise<Message> {
        return await new this.model({...input, createdAt: new Date(), updatedAt: new Date()}).save();
    }
    
    async update(id: String, input: MessageInput): Promise<Message> {
        return await this.model.findByIdAndUpdate(id, {...input, updateAt: new Date()} , { new: true }).exec();
    }
    
    async delete(id: String): Promise<Message> {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async findByType(typeId: String): Promise<Message[]> {
        return await this.model.find({ type: typeId });
    }

}
