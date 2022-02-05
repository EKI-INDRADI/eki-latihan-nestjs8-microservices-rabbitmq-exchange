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


## 1. installation Docker, Mongodb
```bash
install vm alpine + docker
https://github.com/EKI-INDRADI/eki-latihan-vm-alpine-docker-portable

install Docker, Mongodb
https://github.com/EKI-INDRADI/eki-latihan-docker-mongodb (mongodb 5.xx)

mongosh admin -u 'root' -p 'masuk123'
show dbs
use simple_pos
```

## 2. install nodejs & nestjs

```bash
install nodejs   (https://nodejs.org)

npm i -g @nestjs/cli
nest --version
```

## 3. CLI & note


## ==== USER SERVICE

<details>
  <summary>USER-SERVICE-20220206-0001</summary>

```bash

1. install mongodb database

2. create database ms_user_service

3. nest new user-service

4. npm install --save @nestjs/mongoose mongoose

5. rubah .env 

MONGODB_HOST=127.0.0.1
MONGODB_PORT=7000
MONGODB_USER=root
MONGODB_PASSWORD=masuk123
MONGODB_DATABASE=ms_user_service
JWT_SECRET_KEY=eki-secret-key


6. depedency list :

npm i @nestjs/config

npm uninstall @nestjs/platform-express
npm i --save @nestjs/platform-fastify

npm uninstall @nestjs/swagger swagger-ui-express
npm install --save @nestjs/swagger fastify-swagger

//======= optional
nest g provider etc/validator/unique-validator
nest g provider etc/validator/exist-validator
//======= /optional

npm i bcrypt
npm i -D @types/bcrypt
npm i class-validator class-transformer

npm i @nestjs/passport
npm i @nestjs/jwt
npm i passport
npm i passport-jwt
npm i -D @types/passport-jwt

//======= optional
buat file pada src/auth/jwt.strategy.ts
//======= /optional

7. npm i

```

</details>


<details>
  <summary>USER-SERVICE-20220206-0002-CUSTOM-HEADER</summary>

```bash

update user-service\src\main.ts -> 'eki-custom-token'
update user-service\src\auth\auth.controller.ts -> 'eki-custom-token'
update user-service\src\auth\jwt.strategy.ts -> 'eki-custom-token'
update user-service\src\user\user.controller.ts  -> 'eki-custom-token'
update user-service\src\auth\auth.controller.ts -> 'eki-custom-token'

```

</details>

<details>
  <summary>USER-SERVICE-20220206-0003-DESIGN-PATTERN</summary>

```bash

update user-service\src\auth\jwt.strategy.ts
update user-service\src\user\user.controller.ts

nest g res tools

update user-service\src\tools\tools.service.ts (objectSortAlphabetical)
update user-service\src\tools\tools.module.ts (objectSortAlphabetical)
update user-service\src\user\user.module.ts (objectSortAlphabetical)

update user-service\src\user\user.controller.ts
update user-service\src\user\user.service.ts

NOTE : MASIH RAPIHIN DESIGN PATTERN

```
</details>

## ==== /USER SERVICE

 
## REFERENCE :

```bash

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