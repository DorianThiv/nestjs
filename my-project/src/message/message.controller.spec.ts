import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageResolver } from './message.resolver';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [MessageResolver]
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  describe('root', () => {
    it('should return new default message', () => {
      expect(controller.getMessage()).toBe('{"id":0,"content":"Hello World","isSand":false}');
    });
  });
});
