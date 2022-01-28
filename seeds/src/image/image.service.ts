import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture, PictureDocument } from './image.schema';

@Injectable()
export class ImageService {

    constructor(@InjectModel(Picture.name) private readonly model: Model<PictureDocument>) {
    }

    async findAll(): Promise<Picture[]> {
        return await this.model.find().lean();
    }

    async findOne(id: string): Promise<Picture> {
        return await this.model.findById(id).lean();
    }

}
