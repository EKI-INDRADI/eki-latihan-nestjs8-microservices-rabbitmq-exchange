import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqPublisherService {

    //================ OLD

    // constructor(
    //     private readonly amqpConnection: AmqpConnection
    // ) {

    // }

    // async AmqpConnectionRabbitmqPublisher(exchange: String, routingKey: String, message: String) {

    //     let res_json: any = {}

    //     try {

    //         //========================= SETELAH BUG FIX RECEIVER QUEUE SERVICES UDAH GA PERLU PROMISE INIT 
    //         // let request: any = await this.amqpConnection.init().then(async () => {

    //         await this.amqpConnection.publish(`${exchange}`, `${routingKey}`, {
    //             msg: `${message}`
    //         }).then(async () => {
    //             res_json.statusCode = 1
    //             res_json.message = `SUCCESS SENT ROUTING KEY : ${routingKey}`

    //             return res_json
    //         }).catch(async err => {
    //             res_json.statusCode = 0
    //             res_json.message = `ERROR SENT ROUTING KEY : ${routingKey}, detail : ${err}`

    //             return res_json
    //         })

    //         // }).catch(async err => {
    //         //   res_json.statusCode = 0
    //         //   res_json.message = `ERROR INIT CONNECTION, detail : ${err}`

    //         //   return res_json
    //         // })

    //         //========================= /SETELAH BUG FIX RECEIVER QUEUE SERVICES UDAH GA PERLU PROMISE INIT 

    //         // EKI NOTE : 

    //         // publisher-sender-request.service.ts <<< PADA SERVICE RECIEVER PASTIKAN  JANGAN MENGGUNAKAN QUEUE
    //         // BIAR DARI EXCHANGE YANG GENERATE QUEUE NYA BIAR GA DOUBLE HIT

    //         // let force_firstValueFrom = await firstValueFrom(request, { defaultValue: "FINISH" })

    //         return res_json


    //     } catch (error) {
    //         res_json.statusCode = 0
    //         res_json.message = error.message
    //         return res_json

    //     }

    // } //AmqpConnectionRabbitmqPublisher

    //================ /OLD


    async AmqpConnectionRabbitmqPublisher(amqpConnection: any, exchange: String, routingKey: String, message: String) {
        let res_json: any = {}

        try {

            //========================= SETELAH BUG FIX RECEIVER QUEUE SERVICES UDAH GA PERLU PROMISE INIT 
            // let request: any = await this.amqpConnection.init().then(async () => {

            await amqpConnection.publish(`${exchange}`, `${routingKey}`, {
                msg: `${message}`
            }).then(async () => {
                res_json.statusCode = 1
                res_json.message = `SUCCESS SENT ROUTING KEY : ${routingKey}`

                return res_json
            }).catch(async err => {
                res_json.statusCode = 0
                res_json.message = `ERROR SENT ROUTING KEY : ${routingKey}, detail : ${err}`

                return res_json
            })

            // }).catch(async err => {
            //   res_json.statusCode = 0
            //   res_json.message = `ERROR INIT CONNECTION, detail : ${err}`

            //   return res_json
            // })

            //========================= /SETELAH BUG FIX RECEIVER QUEUE SERVICES UDAH GA PERLU PROMISE INIT 

            // EKI NOTE : 

            // publisher-sender-request.service.ts <<< PADA SERVICE RECIEVER PASTIKAN  JANGAN MENGGUNAKAN QUEUE
            // BIAR DARI EXCHANGE YANG GENERATE QUEUE NYA BIAR GA DOUBLE HIT

            // let force_firstValueFrom = await firstValueFrom(request, { defaultValue: "FINISH" })

            return res_json


        } catch (error) {
            res_json.statusCode = 0
            res_json.message = error.message
            return res_json

        }

    } //AmqpConnectionRabbitmqPublisher



}
