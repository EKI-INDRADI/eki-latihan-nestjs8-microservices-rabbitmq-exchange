import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserDtoAutoSync, GetUserListDto, GetUserListDto_WithPage, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserDtoAutoSync } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
// import { PageService } from 'src/etc/service/page/page.service';
import { ToolsService } from 'src/etc/service/tools/tools.service';
import { PageMongodbService } from 'src/etc/service/page-mongodb/page-mongodb.service';

@Injectable()
export class UserService extends PageMongodbService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<User>,
    @InjectConnection() public MongoDbConnection: Connection,
    private readonly toolsService: ToolsService
  ) {
    super();
  }


  async create(createUserDto: CreateUserDtoAutoSync) {
    // async create(createUserDto: CreateUserDto) {

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
      ...createUserDto,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

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

  // async findAllPages(getUserListDto_WithPage: GetUserListDto_WithPage) {
  //   return this.mongodbGeneratePage(getUserListDto_WithPage, User.name, this.MongoDbConnection)
  // }

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
      let GetParams = { id: getUser.id }
      let updateParamsAutoSync = {
        $set: {
          ...updateUserDto,
          updated_at: new Date().toISOString()
        }
      }

      delete updateParamsAutoSync.$set.id

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
