import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Picture, PictureDocument } from './image.schema';

@Injectable()
export class ImageSeeder implements Seeder {

    constructor(
        @InjectModel(Picture.name) private readonly model: Model<PictureDocument>
        ) {
    }
 
    async seed(): Promise<any> {
        console.log('[ImageSeeder] : seed()');
        const data = readFileSync('./assets/captions.json', 'utf-8');
        if (!data) {
            console.log('[ImageSeeder] : File not found at ./assets/captions.json');
            return;
        }
        const rawImages: Array<any> = JSON.parse(data)?.images.slice(0, 10);
        if (!rawImages) {
            console.log('[ImageSeeder] : Images not found');
            return;
        }
        const images = rawImages.map(i => {
            const image = new Picture();
            image.name = i.file_name;
            image.width = i.width;
            image.height = i.height;
            image.cocoUrl = i.coco_url;
            image.flickrUrl = i.flickr_url;
            image.dateCaptured = new Date(i.date_captured);
            return image;
        });
        console.log(`[ImageSeeder] : Import ${images.length} images ...`);
        await this.model.insertMany(images);
        return;
    }
    
    async drop(): Promise<any> {
        console.log('[ImageSeeder] : drop()');
        return this.model.deleteMany({});
    }
}
