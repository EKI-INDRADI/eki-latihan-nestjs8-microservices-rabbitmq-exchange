import { Injectable } from '@nestjs/common';
import { CreateUserDtoAutoSync, GetUserListDto, GetUserListDto_WithPage, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDtoAutoSync } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { PageMongodbService } from 'src/etc/service/page-mongodb/page-mongodb.service';
import { RabbitmqPublisherService } from 'src/etc/service/rabbitmq-publisher/rabbitmq-publisher.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

let set_exchange = 'user_service_exchange';


@Injectable()
export class UserService extends PageMongodbService {

  constructor(
    @InjectModel(User.name) private userRepo: Model<User>,
    @InjectConnection() public MongoDbConnection: Connection,
    private readonly toolsService: ToolsService,
    private readonly amqpConnection: AmqpConnection,
    private readonly rabbitmqPublisherService: RabbitmqPublisherService
  ) {
    super();
  }



  async create(createUserDto: CreateUserDtoAutoSync) {
    let res_json: any = {}
    createUserDto.password = this.hash(createUserDto.password)

    let id = String(
      new Date().getFullYear()
      + ("0" + (new Date().getMonth() + 1)).slice(-2)
      + ("0" + new Date().getDate()).slice(-2)
      + "-" + String(Date.now())
      // + ("0" + new Date().getMinutes()).slice(-2)
      // + ("0" + new Date().getSeconds()).slice(-2)
      // + ("0" + new Date().getMilliseconds()).slice(-3)
    )

    let createParamsAutoSync = {
      id: id,
      event: "create",
      model_main: "main_user", // for publisher model
      model_sync: "sync_user", // for subscriber model
      model_name: "User", // Schema Name
      ...createUserDto,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }


    //========================= USER SERVICE
    let set_user_service_routing_key = 'user_service_routing_key'
    let PublisherUserService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_user_service_routing_key, JSON.stringify(createParamsAutoSync))
    // .then(
    //   async (rabbitmqPublisher: any) => { // FIX PROGRESSIVE BACKEND
    //     console.log(`Success sent message `)
    //   } // end then async
    // ) //end async
    if (PublisherUserService && PublisherUserService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_user_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /USER SERVICE

    //========================= PRODUCT SERVICE
    let set_product_service_routing_key = 'product_service_routing_key'
    let PublisherProductService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_product_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublisherProductService && PublisherProductService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_product_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /PRODUCT SERVICE

    //========================= INVENTORY SERVICE
    let set_inventory_service_routing_key = 'inventory_service_routing_key'
    let PublisherInventoryService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_inventory_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublisherInventoryService && PublisherInventoryService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_inventory_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /INVENTORY SERVICE

    //========================= ORDER SERVICE
    let set_order_service_routing_key = 'order_service_routing_key'
    let PublisherIOrderService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_order_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublisherIOrderService && PublisherIOrderService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_order_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /ORDER SERVICE

    //========================= NOTIFICATION SERVICE
    let set_notification_service_routing_key = 'notification_service_routing_key'
    let PublisherNotificationService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_notification_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublisherNotificationService && PublisherNotificationService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_notification_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /NOTIFICATION SERVICE

    //========================= PAYMENT SERVICE
    let set_payment_service_routing_key = 'payment_service_routing_key'
    let PublisherPaymentService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_payment_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublisherPaymentService && PublisherPaymentService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_payment_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /PAYMENT SERVICE

    //========================= PRINCIPAL SERVICE
    let set_principal_service_routing_key = 'principal_service_routing_key'
    let PublishePrincipalService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_principal_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublishePrincipalService && PublishePrincipalService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_principal_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /PRINCIPAL SERVICE

    //========================= STORE SERVICE
    let set_store_service_routing_key = 'store_service_routing_key'
    let PublisheStoreService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_store_service_routing_key, JSON.stringify(createParamsAutoSync))
    if (PublisheStoreService && PublisheStoreService.statusCode == 1) {
      console.log(`Success sent message routing_key : ${set_store_service_routing_key}, \nevent : ${createParamsAutoSync.event}, \nmodel_name : ${createParamsAutoSync.model_name}, \n${createParamsAutoSync.model_main} -> ${createParamsAutoSync.model_sync}\n `)
    }
    //========================= /STORE SERVICE

    let data = await this.userRepo.create(createParamsAutoSync);

    if (data && createUserDto) {
      res_json.statusCode = 200
      res_json.message = "success, create user_account"
      let dataSortObj = this.toolsService.objectSortAlphabetical(createUserDto).after_sort
      dataSortObj.password = undefined
      res_json.data = dataSortObj
    } else {
      res_json.statusCode = 400
      res_json.message = "error"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }

  async findAll(getUserListDto: GetUserListDto) {

    let res_json: any = {}
    let data = await this.userRepo.find(getUserListDto, { _id: 0, password: 0, __v: 0 });

    if (data) {
      res_json.statusCode = 200
      res_json.message = "success, get findAll"

      let dataSort = []
      data.forEach((element, index) => {

        let data_after_sort = this.toolsService.objectSortAlphabetical(element.toObject()).after_sort
        dataSort.push(data_after_sort)

        if (index == data.length - 1) {
          res_json.data = dataSort
        }

      })

    } else {
      res_json.statusCode = 400
      res_json.message = "error, data not found"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json

  }

  async findAllPages(getUserListDto_WithPage: GetUserListDto_WithPage) {
    return await this.mongodbGeneratePage(getUserListDto_WithPage, User.name, this.MongoDbConnection)
  }

  async findOne(userIdDto: UserIdDto) {

    let res_json: any = {}
    let data = await this.userRepo.findOne({ id: userIdDto.id }, { _id: 0, password: 0, __v: 0 });

    if (data) {
      res_json.statusCode = 200
      res_json.message = "success, get findOne"
      let dataSortObj = this.toolsService.objectSortAlphabetical(data.toObject()).after_sort
      res_json.data = dataSortObj
    } else {
      res_json.statusCode = 400
      res_json.message = "error, data not found"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort
    // delete res_json.password // NOT WORK
    // res_json.password = undefined
    // res_json._id = undefined
    // res_json.__v = undefined
    // remove by projection
    return res_json

  }

  // async update(updateUserDto: UpdateUserDto) {
  async update(updateUserDto: UpdateUserDtoAutoSync) {

    let res_json: any = {}

    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password)
    }

    let getUser = await this.userRepo.findOne({ id: updateUserDto.id })

    if (getUser) {

      let SyncInfo = {
        event: "update",
        model_main: "main_user", // for publisher model
        model_sync: "sync_user", // for subscriber model
        model_name: "User", // Schema Name
      }
      let GetParams = { id: getUser.id }
      let updateParamsAutoSync = {
        $set: {
          ...updateUserDto,
          updated_at: new Date().toISOString()
        }
      }

      delete updateParamsAutoSync.$set.id

      //======================================= MICROSERVICE


      let updateParamsAutoSyncMicroService = {
        ...SyncInfo,
        condition: GetParams,
        update: updateParamsAutoSync
      }


      //========================= USER SERVICE
      let set_user_service_routing_key = 'user_service_routing_key'
      let PublisherUserService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_user_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      // .then(
      //   async (rabbitmqPublisher: any) => { // FIX PROGRESSIVE BACKEND
      //     console.log(`Success sent message `)
      //   } // end then async
      // ) //end async
      if (PublisherUserService && PublisherUserService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_user_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /USER SERVICE

      //========================= PRODUCT SERVICE
      let set_product_service_routing_key = 'product_service_routing_key'
      let PublisherProductService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_product_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublisherProductService && PublisherProductService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_product_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /PRODUCT SERVICE

      //========================= INVENTORY SERVICE
      let set_inventory_service_routing_key = 'inventory_service_routing_key'
      let PublisherInventoryService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_inventory_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublisherInventoryService && PublisherInventoryService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_inventory_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /INVENTORY SERVICE

      //========================= ORDER SERVICE
      let set_order_service_routing_key = 'order_service_routing_key'
      let PublisherIOrderService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_order_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublisherIOrderService && PublisherIOrderService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_order_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /ORDER SERVICE

      //========================= NOTIFICATION SERVICE
      let set_notification_service_routing_key = 'notification_service_routing_key'
      let PublisherNotificationService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_notification_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublisherNotificationService && PublisherNotificationService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_notification_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /NOTIFICATION SERVICE

      //========================= PAYMENT SERVICE
      let set_payment_service_routing_key = 'payment_service_routing_key'
      let PublisherPaymentService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_payment_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublisherPaymentService && PublisherPaymentService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_payment_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /PAYMENT SERVICE

      //========================= PRINCIPAL SERVICE
      let set_principal_service_routing_key = 'principal_service_routing_key'
      let PublishePrincipalService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_principal_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublishePrincipalService && PublishePrincipalService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_principal_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /PRINCIPAL SERVICE

      //========================= STORE SERVICE
      let set_store_service_routing_key = 'store_service_routing_key'
      let PublisheStoreService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(this.amqpConnection, set_exchange, set_store_service_routing_key, JSON.stringify(updateParamsAutoSyncMicroService))
      if (PublisheStoreService && PublisheStoreService.statusCode == 1) {
        console.log(`Success sent message routing_key : ${set_store_service_routing_key}, \nevent : ${updateParamsAutoSyncMicroService.event}, \nmodel_name : ${updateParamsAutoSyncMicroService.model_name}, \n${updateParamsAutoSyncMicroService.model_main} -> ${updateParamsAutoSyncMicroService.model_sync}\n `)
      }
      //========================= /STORE SERVICE

      //======================================= /MICROSERVICE

      let process = await this.userRepo.updateOne(GetParams, updateParamsAutoSync)
    }

    if (getUser) {
      res_json.statusCode = 200
      updateUserDto.password = undefined

      updateUserDto = this.toolsService.objectSortAlphabetical(updateUserDto).after_sort

      res_json.data = updateUserDto
      res_json.message = "success, data updated"
    } else {
      res_json.statusCode = 400
      res_json.message = "error, data update"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }

  async remove(userIdDto: UserIdDto) {

    let res_json: any = {}
    let data = await this.userRepo.findOne({ id: userIdDto.id })

    if (data) {
      await this.userRepo.deleteOne({ id: userIdDto.id });
      res_json.statusCode = 200
      data.password = undefined
      let data_after_sort = this.toolsService.objectSortAlphabetical(data.toObject()).after_sort
      res_json.data = data_after_sort
      res_json.message = "success, data deleted"
    } else {
      res_json.statusCode = 400
      res_json.message = "error, data not found"
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }



  async manualQuery(variant: string, condition: any) {

    let res_json: any = {}
    let result: any = null

    try {
      if (variant) {
        result = await this.userRepo[variant](condition).exec()
        res_json.statusCode = 200
        res_json.message = "success, get manualQuery"

        let dataSort = []

        if (result && result.constructor == Array && result.length > 0) {

          result.forEach((element, index) => {

            let data_after_sort = this.toolsService.objectSortAlphabetical(element.toObject()).after_sort
            dataSort.push(data_after_sort)

            if (index == result.length - 1) {
              res_json.data = dataSort
            }

          })

        }
        else if (result && typeof result == 'object') {

          let resultObj = { ...result.toObject() }

          resultObj._id = undefined
          resultObj.__v = undefined

          res_json.data = this.toolsService.objectSortAlphabetical(resultObj).after_sort

        } else {
          res_json.data = null
        }

        // res_json.data = result
      } else {
        res_json.statusCode = 400
        res_json.message = "error, manual query variant is missing"
      }
    } catch (error) {
      res_json.statusCode = 400
      res_json.message = error.message
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json

  }


  findAll2(req_body) {
    return this.mongodbGeneratePage(req_body, User.name, this.MongoDbConnection)
  }



  // =================AUTH SERVICE=====================
  findUsername(username) {
    return this.userRepo.findOne({ username: username });
  }


  hash(plaintextPassword) {
    const hash = bcrypt.hashSync(plaintextPassword, 10)
    return hash
  }

  compare(plaintextPassword, hashPassword) {
    const valid = bcrypt.compareSync(plaintextPassword, hashPassword)
    return valid
  }

  // =================/AUTH SERVICE=====================

}
