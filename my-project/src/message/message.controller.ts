import { Controller, Get } from '@nestjs/common';
import { MessageResolver } from './message.resolver';

@Controller('message')
export class MessageController {

    constructor(private resolver: MessageResolver) {
    }

    @Get()
    getMessage(): string {
        return this.resolver.getMessage();
    }
}
