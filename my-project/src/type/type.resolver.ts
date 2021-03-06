import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageService } from '../message/message.service';
import { Message } from '../message/schema/message.schema';
import { TypeInput } from './schema/type.input';
import { Type } from './schema/type.schema';
import { TypeService } from './type.service';

@Resolver(() => Type)
export class TypeResolver {

    constructor(private service: TypeService, private messageService: MessageService) {
    }

    @Query(() => [Type])
    async allTypes() {
      return await this.service.findAll();
    }
  
    @Query(() => Type)
    async findType(@Args('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Mutation(() => Type)
    async createType(@Args('input') input: TypeInput) {
      const result = await this.service.create(input);
      return result;
    }
  
    @Mutation(() => Type)
    async updateType(@Args('id') id: string, @Args('input') input: TypeInput) {
      const result = await this.service.update(id, input);
      return result;
    }
  
    @Query(() => Type)
    async deleteType(@Args('id') id: string) {
      return await this.service.delete(id);
    }

    @ResolveField('messages', () => [Message])
    async messages(@Parent() type: Type) {
      const { _id } = type;
      return this.messageService.findByType(_id);
    }

}
