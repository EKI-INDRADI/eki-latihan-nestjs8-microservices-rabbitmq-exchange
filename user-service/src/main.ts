import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>( // FASTIFY
    AppModule,
    new FastifyAdapter()
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
    validateCustomDecorators: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  })) // middleware

  const configSwagger = new DocumentBuilder()
    .setTitle('OPEN-API USER SERVICE')
    .setDescription('Documentasi API untuk User Service')
    .setVersion('1.3')
    // .addBearerAuth() // terlalu simple
    // .addBearerAuth( // NOT USED
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token',
    // )

    //==================== GAK BS BUAT CUSTOM HEADER di controller addBearerAuth
    // .addBearerAuth( // CUSTOM
    //   { type: 'apiKey', in: 'header' },
    //   'eki-custom-token',
    // )
    //====================/GAK BS BUAT CUSTOM HEADER di controller addBearerAuth


    // ====================== SOLVED 
    .addSecurity('eki-custom-token', {
      type: 'apiKey',
      in: 'header',
      name: 'eki-custom-token'
    })
    // https://stackoverflow.com/questions/64269804/how-to-globally-apply-swagger-uis-apibearerauth-instead-of-applying-for-each
        // .addSecurityRequirements('eki-custom-token') // JGN DIPAKE GAMBAR GEMBOK SEMUA
    // ====================== /SOLVED 


    .build()

  //reference :
  // https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer
  // https://swagger.io/docs/specification/authentication/
  // https://docs.nestjs.com/security/authentication
  // https://docs.nestjs.com/openapi/operations
  // https://stackoverflow.com/questions/50317738/fromauthheaderasbearertoken-is-not-working-in-node

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" }
  }
  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api-docs', app, swaggerDocument, configCustomSwagger)

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
