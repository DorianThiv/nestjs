import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Type } from './schema/type.schema';
import { TypeService } from './type.service';

@Resolver(of => Type)
export class TypeResolver {

    constructor(private service: TypeService) {
    }

    @Query(() => Type)
    async allTypes() {
      return await this.service.findAll();
    }
  
    @Query(() => Type)
    async findType(@Args('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Mutation(() => Type)
    async createType(createDto: Type) {
      return await this.service.create(createDto);
    }
  
    @Mutation(() => Type)
    async updateType(@Args('id') id: string, updateDto: Type) {
      return await this.service.update(id, updateDto);
    }
  
    @Query(() => Type)
    async deleteType(@Args('id') id: string) {
      return await this.service.delete(id);
    }

}
