import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { GridFsStorage } from 'multer-gridfs-storage';
import { mongooseConntectionStr } from '../globals';

@Injectable()
export class MulterService implements MulterOptionsFactory {

    public storage: any;

    constructor() {
        this.storage = new GridFsStorage({
            url: mongooseConntectionStr,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        return {
            storage: this.storage,
        };
    }

}