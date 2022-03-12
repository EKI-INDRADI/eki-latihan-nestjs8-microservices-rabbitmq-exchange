import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { RabbitmqPublisherService } from 'src/etc/service/rabbitmq-publisher/rabbitmq-publisher.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqPublisherModule } from 'src/etc/service/rabbitmq-publisher/rabbitmq-publisher.module';
// import { RabbitmqSubscriberUserModule } from 'src/etc/service/rabbitmq-subscriber-user/rabbitmq-subscriber-user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user_service_exchange',
          type: 'topic',
        },
        // {
        //   name: 'ekiexchange2', 
        //   type: 'topic',
        // },
      ],
      uri: 'amqp://ekiuser:ekipassword@0.0.0.0:5672',
      // channels: {
      //   'channel-1': {
      //     prefetchCount: 15,
      //     default: true,
      //   },
      //   // 'channel-2': {
      //   //   prefetchCount: 2,
      //   // },
      // },
      // connectionInitOptions: { wait: true }, 
    }),
    // RabbitmqSubscriberUserModule,
    // UserModule
  ],
  controllers: [UserController],
  providers: [UserService, ToolsService, RabbitmqPublisherService], //https://stackoverflow.com/questions/51692886/nest-cant-resolve-dependencies-of-the-userservice-please-make-sure-that
  exports: [UserService]
})
export class UserModule { }
