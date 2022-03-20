import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PagePostgresqlService } from 'src/etc/service/page-postgresql/page-postgresql.service';
import { RabbitmqPublisherService } from 'src/etc/service/rabbitmq-publisher/rabbitmq-publisher.service';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto, CreateProductDtoAutoSync, GetProductListDto, GetProductListDto_WithPage, ProductIdDtoAutoSync } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductDtoAutoSync } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

let set_exchange = 'product_service_exchange';
let set_model_event = 'main'

@Injectable()
export class ProductService extends PagePostgresqlService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectConnection() private PostgreSqlConnection: Connection,
    private readonly toolsService: ToolsService,
    private readonly amqpConnection: AmqpConnection,
    private readonly rabbitmqPublisherService: RabbitmqPublisherService
  ) {
    super()
  }

  async generateProductMicroservice(AmqpConnection: any, setEvent: string, setModel: string, setModelMain: string, setModelSync: string, setObject: object) {

    let res_json: any = {}

    res_json.process_trace = []

    let setMessage = {
      event: setEvent,
      model: setModel,
      model_main: setModelMain,
      model_sync: setModelSync,
      ...setObject
    }

    let setStringify = JSON.stringify(setMessage)

    //========================= PRODUCT SERVICE
    let set_product_service_routing_key = 'product_service_routing_key'
    let PublisherProductService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(AmqpConnection, set_exchange, set_product_service_routing_key, setStringify)
    if (PublisherProductService && PublisherProductService.statusCode == 1) {
      // console.log(`Success sent message routing_key : ${set_product_service_routing_key}, \nevent : ${setEvent}, \nmodel_name : ${setModel}, \n${setModelMain} -> ${setModelSync}\n `)

      res_json.process_trace.push({
        [`${set_product_service_routing_key}`]: "success"
      })

    } else {
      console.log(`Error sent message routing_key : ${set_product_service_routing_key}, \nevent : ${setEvent}, \nmodel_name : ${setModel}, \n${setModelMain} -> ${setModelSync}\n `)

      res_json.process_trace.push({
        [`${set_product_service_routing_key}`]: "error"
      })
    }
    //========================= /PRODUCT SERVICE

    //========================= INVENTORY SERVICE
    let set_inventory_service_routing_key = 'inventory_service_routing_key'
    let PublisherInventoryService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(AmqpConnection, set_exchange, set_inventory_service_routing_key, setStringify)
    if (PublisherInventoryService && PublisherInventoryService.statusCode == 1) {
      // console.log(`Success sent message routing_key : ${set_inventory_service_routing_key}, \nevent : ${setEvent}, \nmodel_name : ${setModel}, \n${setModelMain} -> ${setModelSync}\n `)

      res_json.process_trace.push({
        [`${set_inventory_service_routing_key}`]: "success"
      })

    } else {
      console.log(`Error sent message routing_key : ${set_inventory_service_routing_key}, \nevent : ${setEvent}, \nmodel_name : ${setModel}, \n${setModelMain} -> ${setModelSync}\n `)

      res_json.process_trace.push({
        [`${set_inventory_service_routing_key}`]: "error"
      })
    }
    //========================= /INVENTORY SERVICE

    //========================= ORDER SERVICE
    let set_order_service_routing_key = 'order_service_routing_key'
    let PublisherOrderService = await this.rabbitmqPublisherService.AmqpConnectionRabbitmqPublisher(AmqpConnection, set_exchange, set_order_service_routing_key, setStringify)
    if (PublisherOrderService && PublisherOrderService.statusCode == 1) {
      // console.log(`Success sent message routing_key : ${set_order_service_routing_key}, \nevent : ${setEvent}, \nmodel_name : ${setModel}, \n${setModelMain} -> ${setModelSync}\n `)

      res_json.process_trace.push({
        [`${set_order_service_routing_key}`]: "success"
      })

    } else {
      console.log(`Error sent message routing_key : ${set_order_service_routing_key}, \nevent : ${setEvent}, \nmodel_name : ${setModel}, \n${setModelMain} -> ${setModelSync}\n `)

      res_json.process_trace.push({
        [`${set_order_service_routing_key}`]: "error"
      })
    }
    //========================= /ORDER SERVICE


    let dataSort = []
    await res_json.process_trace.forEach(async (element, index) => {

      let data_after_sort = this.toolsService.objectSortAlphabetical(element).after_sort
      dataSort.push(data_after_sort)
      if (index == res_json.process_trace.length - 1) {
        res_json.process_trace = dataSort
      }

    })


    res_json.process_success = []
    res_json.process_error = []

    for (let i = 0; i < res_json.process_trace.length; i++) {
      if (Object.values(res_json.process_trace)[i] == "error") {
        res_json.process_error.push(res_json.process_trace[i])
      } else {
        res_json.process_success.push(res_json.process_trace[i])
      }
    }


    if (res_json.process_error.length > 0) {
      res_json.statusCode = 400
    } else {
      res_json.statusCode = 200
    }



    delete res_json.process_trace
    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json

  }

  async create(createProductDto: CreateProductDtoAutoSync) {
    let res_json: any = {}

    let id = String(
      new Date().getFullYear()
      + ("0" + (new Date().getMonth() + 1)).slice(-2)
      + ("0" + new Date().getDate()).slice(-2)
      + "-" + String(Date.now())
      // + ("0" + new Date().getMinutes()).slice(-2)
      // + ("0" + new Date().getSeconds()).slice(-2)
      // + ("0" + new Date().getMilliseconds()).slice(-3)
    )

    let createParamsAutoSync: any = {
      id: id,
      // event: "create",
      // model_main: "main_user", // for publisher model
      // model_sync: "sync_user", // for subscriber model
      // model_name: "User", // Schema Name
      ...createProductDto,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // createParamsAutoSync.payload_login = JSON.stringify(createParamsAutoSync.payload_login)
    // product-service\src\auth\auth.controller.ts

    createParamsAutoSync.user = JSON.stringify(createParamsAutoSync.user)


    //======================================= MICROSERVICE
    let processMicroservices = null
    if (set_model_event == 'main') {
      processMicroservices = await this.generateProductMicroservice(this.amqpConnection, "create", "Product", "main_product", "sync_product", createParamsAutoSync)
    }
    //======================================= MICROSERVICE

    // let data : any = await this.productRepo.create(createParamsAutoSync);
    let data: any = await this.productRepo.save(createParamsAutoSync);

    if (data && createProductDto) {
      res_json.statusCode = 200
      res_json.message = "success, create product"
      let dataSortObj = this.toolsService.objectSortAlphabetical(createProductDto).after_sort
      dataSortObj.password = undefined
      res_json.data = dataSortObj
      res_json.microservice = processMicroservices
    } else {
      res_json.statusCode = 400
      res_json.message = "error"
      res_json.microservice = processMicroservices
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }

  async findAll(getProductListDto: GetProductListDto) {

    let res_json: any = {}
    let data = await this.productRepo.find(getProductListDto);

    if (data) {
      res_json.statusCode = 200
      res_json.message = "success, get findAll"

      let dataSort = []
      data.forEach((element, index) => {

        let data_after_sort = this.toolsService.objectSortAlphabetical(element).after_sort
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


  async findAll_WithPage(getProductListDto_WithPage: GetProductListDto_WithPage) {
    let res_json: any = {}
    let data: any = await this.generatePage(getProductListDto_WithPage, this.productRepo, {
      // relations: ['user']
    }
    )

    if (data && data.data) {
      res_json.statusCode = 200
      res_json.message = "success, get findAll_WithPage"

      let dataSort = []
      data.data.forEach((element, index) => {

        let data_after_sort = this.toolsService.objectSortAlphabetical(element).after_sort
        dataSort.push(data_after_sort)

        if (index == data.data.length - 1) {
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


  async update(updateProductDto: UpdateProductDtoAutoSync) {

    let res_json: any = {}

    let getProduct = await this.productRepo.findOne({ id: updateProductDto.id })

    let processMicroservices: any = {}
    if (getProduct) {

      let GetParams = getProduct.id
      let updateParamsAutoSync: any = {
        ...updateProductDto,
        updated_at: new Date().toISOString()
      }

      updateParamsAutoSync.user = JSON.stringify(updateParamsAutoSync.user)

      delete updateParamsAutoSync.id

      // console.log(updateParamsAutoSync)

      let updateParamsAutoSyncMicroService = {
        condition: GetParams,
        update: updateParamsAutoSync
      }

      //======================================= MICROSERVICE
      let processMicroservices = null
      if (set_model_event == 'main') {
        processMicroservices = await this.generateProductMicroservice(this.amqpConnection, "update", "Product", "main_product", "sync_product", updateParamsAutoSyncMicroService)
      }
      //======================================= /MICROSERVICE
      // if (updateParamsAutoSync && updateParamsAutoSync.$set && updateParamsAutoSync.$set.password) {
      //   updateParamsAutoSync.$set.password = this.hash(updateParamsAutoSync.$set.password)
      // }
      let process = await this.productRepo.update(GetParams, updateParamsAutoSync)
    }

    if (getProduct) {
      res_json.statusCode = 200
      // updateProductDto.password = undefined

      updateProductDto = this.toolsService.objectSortAlphabetical(updateProductDto).after_sort

      res_json.data = updateProductDto
      res_json.message = "success, data updated"
      res_json.microservice = processMicroservices
    } else {
      res_json.statusCode = 400
      res_json.message = "error, data update"
      res_json.microservice = processMicroservices
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }


  async remove(productIdDto: ProductIdDtoAutoSync) {

    let res_json: any = {}
    let deleteAutoSyncMicroService = { id: productIdDto.id }
    let data = await this.productRepo.findOne({ id: productIdDto.id })

    if (data) {

      let data_result = { ...data }
      //======================================= MICROSERVICE
      let processMicroservices = null
      if (set_model_event == 'main') {
        processMicroservices = await this.generateProductMicroservice(this.amqpConnection, "delete", "Product", "main_product", "sync_product", deleteAutoSyncMicroService)
      }
      //======================================= /MICROSERVICE

      await this.productRepo.remove(data);

      res_json.statusCode = 200
      let data_after_sort = this.toolsService.objectSortAlphabetical(data_result).after_sort
      res_json.data = data_after_sort
      res_json.message = "success, data deleted"
      res_json.microservice = processMicroservices
    } else {
      res_json.statusCode = 400
      res_json.message = "error, data not found"
      res_json.microservice = null
    }

    res_json = this.toolsService.objectSortAlphabetical(res_json).after_sort

    return res_json
  }



  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

}
