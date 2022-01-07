import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type, TypeDocument } from './schema/type.schema';

@Injectable()
export class TypeService {

    constructor(@InjectModel(Type.name) private readonly model: Model<TypeDocument>) {
    }

    async findAll(): Promise<Type[]> {
        return await this.model.find().exec();
    }
    
    async findOne(id: string): Promise<Type> {
        return await this.model.findById(id).exec();
    }
    
    async create(createTodoDto: Type): Promise<Type> {
        return await new this.model({...createTodoDto, createdAt: new Date(), updatedAt: new Date()}).save();
    }
    
    async update(id: string, updateTodoDto: Type): Promise<Type> {
        return await this.model.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
    }
    
    async delete(id: string): Promise<Type> {
        return await this.model.findByIdAndDelete(id).exec();
    }

}
