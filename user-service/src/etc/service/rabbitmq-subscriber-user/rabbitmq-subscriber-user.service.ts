import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqSubscriberUserService {
    @RabbitSubscribe({
        exchange: 'user_service_exchange',
        routingKey: 'user_service_routing_key',
        //https://github.com/golevelup/nestjs/issues/208
        queue: 'user_service_queue',
        queueOptions: {
          durable: false, // DISABLE MULTI REQUEST (DISABLE DURABLE TRUE)
          exclusive: false,
          autoDelete: false,
        },
    })

    public async RabbitmqSubscriber(message: {}) {
        console.log(`received message from user_service : \n${JSON.stringify(message)}`);
    }

}
