import { Injectable } from '@nestjs/common';
import { CreateUserDto, GetUserListDto, GetUserListDto_WithPage, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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


  async create(createUserDto: CreateUserDto) {

    let res_json: any = {}
    createUserDto.password = this.hash(createUserDto.password)

    let data = await this.userRepo.create(createUserDto);

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

  async update(updateUserDto: UpdateUserDto) {

    let res_json: any = {}

    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password)
    }

    let getUser = await this.userRepo.findOne({ id: updateUserDto.id })

    if (getUser) {
      let process = await this.userRepo.updateOne({ id: getUser.id }, { $set: { ...updateUserDto, updated_at: Date.now() } })
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
        result.forEach((element, index) => {
  
          let data_after_sort = this.toolsService.objectSortAlphabetical(element.toObject()).after_sort
          dataSort.push(data_after_sort)
  
          if (index == result.length - 1) {
            res_json.data = dataSort
          }
  
        })
  
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
