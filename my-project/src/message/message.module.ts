import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { TypeService } from 'src/type/type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { Type, TypeSchema } from 'src/type/schema/type.schema';

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
    providers: [MessageResolver, MessageService, TypeService]
})
export class MessageModule {}
