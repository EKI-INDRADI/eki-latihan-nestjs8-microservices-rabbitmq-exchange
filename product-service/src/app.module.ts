import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './user/entities/user.entity';
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsService } from './etc/service/tools/tools.service';
import { PageMongodbService } from './etc/service/page-mongodb/page-mongodb.service';
import { RabbitmqPublisherService } from './etc/service/rabbitmq-publisher/rabbitmq-publisher.service';
import { RabbitmqPublisherModule } from './etc/service/rabbitmq-publisher/rabbitmq-publisher.module';
import { RabbitmqSubscriberProductService } from './etc/service/rabbitmq-subscriber-product/rabbitmq-subscriber-product.service';
import { RabbitmqSubscriberProductModule } from './etc/service/rabbitmq-subscriber-product/rabbitmq-subscriber-product.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagePostgresqlService } from './etc/service/page-postgresql/page-postgresql.service';
import { ExistMongodbValidator } from './etc/validator/exist-mongodb-validator';
import { UniqueMongodbValidator } from './etc/validator/unique-mongodb-validator';
import { ExistPostgresqlValidator } from './etc/validator/exist-postgresql-validator';
import { UniquePostgresqlValidator } from './etc/validator/unique-postgresql-validator';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`),
    // MongooseModule.forRoot('mongodb://root:masuk123@127.0.0.1:7000/ms_user_service?authSource=admin'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_PORT),
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [
        Product
      ],
      synchronize: true // entity yang dibuat tablenya akan otomatis di generate
    }),
    UserModule,
    AuthModule,
    RabbitmqPublisherModule,
    RabbitmqSubscriberProductModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ToolsService,
    PageMongodbService,
    RabbitmqPublisherService,
    RabbitmqSubscriberProductService,
    PagePostgresqlService,
    ExistMongodbValidator,
    UniqueMongodbValidator,
    ExistPostgresqlValidator,
    UniquePostgresqlValidator

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
