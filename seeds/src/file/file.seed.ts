import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { createWriteStream, readFileSync } from 'fs';
import { IncomingMessage } from 'http';
import { MongoGridFS } from 'mongo-gridfs';
import { Connection, Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { uploadDir } from '../globals';

const axios = require('axios');

@Injectable()
export class FileSeeder implements Seeder {

    private model: MongoGridFS;

    constructor(@InjectConnection() private readonly connection: Connection) {
        this.model = new MongoGridFS(this.connection.db, 'fs');
    }
 
    async seed(): Promise<any> {
        console.log('[FileSeeder] : seed()');
        const jsonPath = './assets/captions.json';
        const data = readFileSync(jsonPath, 'utf-8');
        if (!data) {
            console.log('[FileSeeder] : File mock not found at ' + jsonPath);
            return;
        }
        const rawImages: Array<any> = JSON.parse(data)?.images.slice(0, 1);
        if (!rawImages) {
            console.log('[FileSeeder] : Images mock not found');
            return;
        }
        console.log(`[FileSeeder] : Import ${rawImages.length} files ...`);
        for (const image of rawImages) {
            // Download file from `coco_url`
            const response = await axios({
                method: "get",
                url: image.coco_url,
                responseType: "stream"
            });
            if (response) {
                console.log(`[FileSeeder] : ${image.coco_url} downloaded`);
                const path = `${uploadDir}${image.file_name}`;
                console.log(`[FileSeeder] : Write file ${image.file_name} at ${path} ...`);
                return new Promise(async (resolve, reject) => 
                    (response.data as IncomingMessage)
                    .pipe(createWriteStream(path))
                    .on('finish', async () => {
                        await this.uploadFile(path, image);
                        return resolve(true);
                    })
                    .on('error', () => reject(false))
                );
            }
        }
        console.log('fished');
        return true;
    }

    private async uploadFile(path: string, image: any) {
        console.log(`[FileSeeder] : Upload file ${image.file_name} in MongoDB ...`);
        console.log(this.connection.readyState);
        await this.model.uploadFile(path, {
            filename: image.file_name,
            metadata: {
                url: image.coco_url,
                width: image.width,
                height: image.height
            }
        });
    }
    
    async drop(): Promise<any> {
        console.log('[FileSeeder] : drop()');
        return await this.connection.dropDatabase();
    }
}
