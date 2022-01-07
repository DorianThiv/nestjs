import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { Type, TypeSchema } from './schemas/type.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
            { name: Type.name, schema: TypeSchema },
        ]),
    ],
    controllers: [MessageController],
    providers: [MessageResolver, MessageService]
})
export class MessageModule {}
