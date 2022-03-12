import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitmqSubscriberProductService } from './rabbitmq-subscriber-product.service';

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
          exchanges: [
            {
              name: 'product_service_exchange',
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
        RabbitmqSubscriberProductModule,
      ],
      controllers: [], //[RabbitmqSubscriberController],
      providers: [RabbitmqSubscriberProductService]
})
export class RabbitmqSubscriberProductModule {}
