import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from './schema/type.schema';
import { TypeResolver } from './type.resolver';
import { TypeService } from './type.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema },])
  ],
  providers: [TypeResolver, TypeService]
})
export class TypeModule {}
