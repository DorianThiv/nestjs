import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from '../message/message.service';
import { Message, MessageSchema } from '../message/schema/message.schema';
import { Type, TypeSchema } from './schema/type.schema';
import { TypeResolver } from './type.resolver';
import { TypeService } from './type.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: Message.name,
        schema: MessageSchema
      }, {
        name: Type.name,
        schema: TypeSchema
      }
    ])
  ],
  providers: [TypeResolver, TypeService, MessageService],
  exports: [TypeService]
})
export class TypeModule {}
