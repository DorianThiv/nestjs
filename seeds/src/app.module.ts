import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ImageModule } from './image/image.module';
import { mongooseConntectionStr } from './globals';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongooseConntectionStr),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    FileModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
