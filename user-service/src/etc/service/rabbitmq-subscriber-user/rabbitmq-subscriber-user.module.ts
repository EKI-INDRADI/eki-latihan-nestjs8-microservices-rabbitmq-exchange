import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitmqSubscriberUserService } from './rabbitmq-subscriber-user.service';

@Module({
  imports: [
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
      // connectionInitOptions: { wait: true }, 
    }),
    RabbitmqSubscriberUserModule,
  ],
  controllers: [], //[RabbitmqSubscriberController],
  providers: [RabbitmqSubscriberUserService]
})
export class RabbitmqSubscriberUserModule { }
