import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

let set_queue = 'product_service_product_main_queue'

@Injectable()
export class RabbitmqSubscriberProductService {
    @RabbitSubscribe({
        exchange: 'product_service_exchange',
        routingKey: 'product_service_routing_key',
        //https://github.com/golevelup/nestjs/issues/208
        queue: set_queue,
        queueOptions: {
            durable: false, // DISABLE MULTI REQUEST (DISABLE DURABLE TRUE)
            exclusive: false,
            autoDelete: false,
        },
    })

    public async RabbitmqSubscriber(message: any) {
        // console.log(`received message from product_service : \n${JSON.stringify(message)}`);

        console.log(`received message from ${set_queue}:`);
        console.log(`msg :`)
        let params = await JSON.parse(message.msg)
        console.log(params)
        // let generate = await this.create(params)
        // console.log(`statusCode : ${generate.statusCode}`)
        console.log(`statusCode : 200`)
    }
}
