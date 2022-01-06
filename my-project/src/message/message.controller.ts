import { Controller, Get } from '@nestjs/common';
import { Message } from './dto/message.dto';
import { MessageResolver } from './message.resolver';

@Controller('message')
export class MessageController {

    constructor(private resolver: MessageResolver) {
    }

    @Get()
    getHello(): string {
        return this.resolver.getMessage();
    }
}
