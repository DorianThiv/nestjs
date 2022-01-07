import { Resolver } from '@nestjs/graphql';
import { Type } from './schema/type.schema';

@Resolver(of => Type)
export class TypeResolver {}
