import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './user/entities/user.entity';
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { createConnection } from 'mongoose';
import { ToolsService } from './etc/service/tools/tools.service';
import { PageMongodbService } from './etc/service/page-mongodb/page-mongodb.service';
import { RabbitmqPublisherService } from './etc/service/rabbitmq-publisher/rabbitmq-publisher.service';
import { RabbitmqPublisherModule } from './etc/service/rabbitmq-publisher/rabbitmq-publisher.module';
import { RabbitmqSubscriberUserService } from './etc/service/rabbitmq-subscriber-user/rabbitmq-subscriber-user.service';
import { RabbitmqSubscriberUserModule } from './etc/service/rabbitmq-subscriber-user/rabbitmq-subscriber-user.module';
import { ExistMongodbValidator } from './etc/validator/exist-mongodb-validator';
import { UniqueMongodbValidator } from './etc/validator/unique-mongodb-validator';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`),
    // MongooseModule.forRoot('mongodb://root:masuk123@127.0.0.1:7000/ms_user_service?authSource=admin'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    UserModule,
    AuthModule,
    RabbitmqPublisherModule,
    RabbitmqSubscriberUserModule
  ],
  controllers: [AppController],
  providers: [AppService, ToolsService, PageMongodbService, RabbitmqPublisherService, RabbitmqSubscriberUserService, ExistMongodbValidator, UniqueMongodbValidator
  
    // ,{
    //   provide: 'ASYNC_CONNECTION', 
    //   useFactory: async () => {
    //     const connection = await createConnection();
    //     return connection;
    //   },
    // }
     //https://docs.nestjs.com/fundamentals/async-providers 
     //https://docs.nestjs.com/fundamentals/custom-providers
  
  ]
})
export class AppModule { }
