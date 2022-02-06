import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    let res_json : any= {}
    res_json.statusCode = 200
    res_json.message = "USER SERVICE OK!"
    return res_json
  }
}
