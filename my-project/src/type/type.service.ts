import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypeInput } from './schema/type.input';
import { Type, TypeDocument } from './schema/type.schema';
import * as mongoose from 'mongoose';

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
    
    async create(input: TypeInput): Promise<Type> {
        console.log(input);
        return await new this.model({...input, createdAt: new Date(), updatedAt: new Date()}).save();
    }
    
    async update(id: string, input: TypeInput): Promise<Type> {
        return await this.model.findByIdAndUpdate(id, input, { new: true }).exec();
    }
    
    async delete(id: string): Promise<Type> {
        return await this.model.findByIdAndDelete(id).exec();
    }

}
