import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { FileService } from './file.service';
import { GridFSBucketReadStream } from 'mongodb';
import { createWriteStream } from 'fs';
import { IGridFSObject } from 'mongo-gridfs';
import { FileObject } from './file.schema';

@Resolver()
export class FileResolver {

    constructor(private service: FileService) {
    }

    // @Query(() => [Ffile])
    // async allFiles() {
    //   return await this.service.findAll();
    // }

    // @Query(() => GridFSBucketReadStream)
    // async readFile(@Args('id') id: string) {
    //   return await this.service.readStream(id);
    // }

    @Mutation(() => FileObject)
    async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) { createReadStream, filename }: FileUpload): Promise<FileObject> {
      const file = await this.service.upload(filename, createReadStream);
      return new FileObject(file);
    }

    @Query(() => FileObject)
    async downloadFile(@Args('id') id: string) {
      return await this.service.download(id);
    }
    
}
