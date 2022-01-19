import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { Message, MessageSchema } from './message/schema/message.schema';
import { Type, TypeSchema } from './type/schema/type.schema';
import { TypeModule } from './type/type.module';

@Module({
  imports: [
    MessageModule,
    TypeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    MongooseModule.forFeature([{
      name: Message.name,
      schema: MessageSchema
    }, {
      name: Type.name,
      schema: TypeSchema
    }]),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
