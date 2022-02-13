import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RabbitmqPublisherService } from './rabbitmq-publisher.service';

@Module({
  imports: [

    //================= OLD
    // RabbitMQModule.forRoot(RabbitMQModule, {
    //   exchanges: [
    //     {
    //       name: 'user_service_exchange',
    //       type: 'topic',
    //     },
    //     // {
    //     //   name: 'ekiexchange2', 
    //     //   type: 'topic',
    //     // },
    //   ],
    //   uri: 'amqp://ekiuser:ekipassword@0.0.0.0:5672',
    //   // connectionInitOptions: { wait: true }, 
    // }),
    // RabbitmqPublisherModule,
    //================= /OLD

  ],
  controllers: [], //[RabbitmqPublisherController],
  providers: [RabbitmqPublisherService],
  exports: [RabbitmqPublisherService]
})
export class RabbitmqPublisherModule { }
