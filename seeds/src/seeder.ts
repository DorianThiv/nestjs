import { MongooseModule } from "@nestjs/mongoose";
import { seeder } from "nestjs-seeder";
import { ImageSeeder } from "./image/image.seed";
import { Picture, PictureSchema } from "./image/image.schema";
import { mongooseConntectionStr } from "./globals";
import { FileSeeder } from "./file/file.seed";
import { FileModule } from "./file/file.module";
import { ImageModule } from "./image/image.module";
import { MulterModule } from "@nestjs/platform-express";
import { MulterService } from "./file/multer.service";

seeder({
    imports: [
      MongooseModule.forRoot(mongooseConntectionStr),
      MongooseModule.forFeature([
        { name: Picture.name, schema: PictureSchema }
      ]),
      MulterModule.registerAsync({
        useClass: MulterService
      }),
      FileModule,
      ImageModule
    ]
}).run([ImageSeeder, FileSeeder]);