import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
    ],
    controllers: [],
    providers: [MessageResolver, MessageService]
})
export class MessageModule {}
