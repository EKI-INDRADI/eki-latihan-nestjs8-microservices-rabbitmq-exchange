import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqPublisherService } from 'src/etc/service/rabbitmq-publisher/rabbitmq-publisher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product
    ]),
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
    })
  ],
  controllers: [ProductController],
  providers: [ProductService, ToolsService, RabbitmqPublisherService],
  exports: [ProductService]
})
export class ProductModule { }
