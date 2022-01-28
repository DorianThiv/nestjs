import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageResolver } from './image.resolver';
import { Picture, PictureSchema } from './image.schema';
import { ImageService } from './image.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Picture.name, schema: PictureSchema }])
  ],
  providers: [ImageResolver, ImageService]
})
export class ImageModule {}
