import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { IGridFSObject, MongoGridFS } from 'mongo-gridfs';
import { Connection } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';
import { createWriteStream } from 'fs';
import { FileObject } from './file.schema';

@Injectable()
export class FileService {

    private model: MongoGridFS;

    constructor(@InjectConnection() private readonly connection: Connection) {
        this.model = new MongoGridFS(this.connection.db, 'fs');
    }

    async upload(filename, createReadStream): Promise<FileObject> {
      console.log(filename);
      console.log(createReadStream);
      const path = `./uploads/${filename}`;
      return new Promise(async (resolve, reject) => 
        createReadStream()
          .pipe(createWriteStream(path))
          .on('finish', async () => {
            const file = await this.model.uploadFile(path, {
              filename: filename,
            });
            console.log(file);
            return resolve(new FileObject(file));
          })
          .on('error', () => reject(false))
      );
    }

    async readStream(id: string): Promise<GridFSBucketReadStream> {
      return await this.model.readFileStream(id);
    }

    async download(id: string): Promise<FileObject> {
        const result = await this.model
          .findById(id)
          .catch(err => { throw new HttpException('File not found', HttpStatus.NOT_FOUND) });
        return new FileObject(result);
    }
    
}
