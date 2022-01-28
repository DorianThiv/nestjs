import { Args, Query, Resolver } from '@nestjs/graphql';
import { Picture } from './image.schema';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {

    constructor(private service: ImageService) {
    }

    @Query(() => [Picture])
    async allImages() {
      return await this.service.findAll();
    }

    @Query(() => Picture)
    async findImage(@Args('id') id: string) {
      return await this.service.findOne(id);
    }

}
