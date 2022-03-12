<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).





 ## ROAD MAP :
 

 ## 1. MICROSERVICES CHOREOGRAPHY PATTERN

<details>
  <summary>[CLICK] USER SERVICE - CHOREOGRAPHY PATTERN [DONE]</summary>

[ CLICK HERE ](/user-service/README.md)

LOG :

USER SERVICE -> INJECT DATABASE MONGODB [DONE]

USER SERVICE AUTH (WITHOUT API GATEWAY, INJECT AUTH TO ALL SERVICE) [DONE]

USER SERVICE -> AUTO SWAGGER [DONE]

USER SERVICE AUTO SYNC MESSAGE -> AUTO VALIDATION -> USER CRUD PUBLISHER -> TO ALL SERVICE [DONE]

</details>


<details>
  <summary>[CLICK] PRODUCT SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS-DEVELOPMENT]</summary>

[ CLICK HERE ](/product-service/README.md)

LOG : 

PRODUCT SERVICE -> INJECT DATABASE MONGODB & POSTGRESQL [DONE]

PRODUCT SERVICE AUTH (SAME TOKEN WITH USER SERVICE) [DONE]

PRODUCT SERVICE -> AUTO SWAGGER [DONE]

PRODUCT SERVICE AUTO SYNC MESSAGE -> AUTO VALIDATION -> USER CRUD SUBSCRIBER  [DONE]

PRODUCT SERVICE AUTO SYNC MESSAGE -> AUTO VALIDATION -> PRODUCT CRUD PUBLISHER -> INVENTORY SERVICE [INPROGRESS]

</details>

<details>
  <summary>[CLICK] INVENTORY SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

LOG : 

INVENTORY SERVICE -> INJECT DATABASE MONGODB & POSTGRESQL [INPROGRESS]

INVENTORY SERVICE AUTH (SAME TOKEN WITH USER SERVICE) [INPROGRESS]

INVENTORY SERVICE -> AUTO SWAGGER [INPROGRESS]

INVENTORY SERVICE AUTO SYNC MESSAGE -> AUTO VALIDATION -> USER CRUD SUBSCRIBER  [INPROGRESS]

INVENTORY SERVICE AUTO SYNC MESSAGE -> AUTO VALIDATION -> PRODUCT CRUD PUBLISHER -> INVENTORY SERVICE [INPROGRESS]

</details>

<!-- 
<details>
  <summary>[CLICK] ORDER SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

</details>


<details>
  <summary>[CLICK] NOTIFICATION SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

</details>


<details>
  <summary>[CLICK] PAYMENT SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

</details>


<details>
  <summary>[CLICK] PRINCIPAL SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

</details>


<details>
  <summary>[CLICK] STORE SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

</details>

-->


<details>
  <summary>[CLICK] UPLOAD SERVICE - CHOREOGRAPHY PATTERN [INPROGRESS]</summary>

[INPROGRESS]

UPLOAD SERVICE -> INJECT DATABASE MONGODB & SQLITE [INPROGRESS]

UPLOAD SERVICE AUTH (SAME TOKEN WITH USER SERVICE) [INPROGRESS]

UPLOAD SERVICE -> AUTO SWAGGER [INPROGRESS]

UPLOAD SERVICE AUTO SYNC MESSAGE -> AUTO VALIDATION -> USER CRUD SUBSCRIBER  [INPROGRESS]

</details>


## 2. PORT AND ADAPTER HEXAGONAL ARCHITECTURE

<details>
  <summary>[CLICK] PORT AND ADAPTER HEXAGONAL ARCHITECTURE [INPROGRESS]</summary>

LOG :

SUPPORT ENTITY CONCEPT(MODEL) [DONE], 

SUPPORT VALIDATOR CONCEPT(INTERFACE/MODULAR CLASS) [DONE], 

SUPPORT MANY REPOSITORY() [DONE]

MODULAR GRAPHQL <-> JSON [INPROGRESS]

</details>
 
## REFERENCE :

```bash

https://www.youtube.com/playlist?list=PL-CtdCApEFH-MtoBwQ0F3xNG21yjt5Kvs

https://www.npmjs.com/package/@golevelup/nestjs-rabbitmq

https://github.com/adehikmatfr/nestjs-rabbitmq-example

https://github.com/EKI-INDRADI/eki-latihan-vm-alpine-docker-portable

https://github.com/EKI-INDRADI/eki-latihan-docker-phpmyadmin-mariadb
https://github.com/EKI-INDRADI/eki-latihan-nestjs-mysql
https://github.com/EKI-INDRADI/eki-latihan-nestjs-fastify-mysql

https://github.com/EKI-INDRADI/eki-latihan-docker-postgresql
https://github.com/EKI-INDRADI/eki-latihan-nestjs-postgresql
https://github.com/EKI-INDRADI/eki-latihan-nestjs-fastify-postgresql 

https://github.com/EKI-INDRADI/eki-latihan-docker-mongodb
https://github.com/EKI-INDRADI/eki-latihan-nestjs-mongodb
https://github.com/EKI-INDRADI/eki-latihan-nestjs-fastify-mongodb

https://github.com/EKI-INDRADI/eki-latihan-nestjs-sqlite-portable-file-upload

https://github.com/EKI-INDRADI/eki-latihan-nestjs-http-module-rxjs-8

https://github.com/EKI-INDRADI/eki-latihan-docker-rabbitmq
https://github.com/EKI-INDRADI/eki-latihan-nestjs-rabbitmq
https://github.com/EKI-INDRADI/eki-latihan-nestjs8-rabbitmq-exchange-promise-handle


-- CUSTOM TOKEN HEADER

https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer

https://swagger.io/docs/specification/authentication/

https://docs.nestjs.com/security/authentication

https://docs.nestjs.com/openapi/operations

https://stackoverflow.com/questions/50317738/fromauthheaderasbearertoken-is-not-working-in-node

-- /CUSTOM TOKEN HEADER

https://stackoverflow.com/questions/51692886/nest-cant-resolve-dependencies-of-the-userservice-please-make-sure-that


```

## EKI INDRADI

"TIME > KNOWLEDGE > MONEY". #STILL_ONE_DIGIT
