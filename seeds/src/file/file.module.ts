import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { MulterService } from './multer.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterService
    }),
    HttpModule
  ],
  providers: [MulterService, FileResolver, FileService]
})
export class FileModule {}
