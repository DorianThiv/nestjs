import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageController } from './message.controller';

@Module({
    providers: [MessageResolver],
    controllers: [MessageController]
})
export class MessageModule {}
