import { Injectable } from '@nestjs/common';
import { CreateUserDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { PageService } from 'src/etc/service/page/page.service';

@Injectable()
export class UserService extends PageService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<User>,
    @InjectConnection() public MongoDbConnection: Connection 
  ) {
    super();
  }


  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hash(createUserDto.password)
    return this.userRepo.create(createUserDto);
  }

  findAll() {
    return this.userRepo.find({},{_id : 0, password:0, __v:0});
  }

  findOne(id: string) {
    return this.userRepo.findOne({ id: id },{_id : 0, password:0, __v:0});
  }

  findUsername(username) {
    return this.userRepo.findOne({ username: username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id

    let res_json: any = {}

    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password)
    }

    let getUser = await this.userRepo.findOne({ id: updateUserDto.id })

    if (getUser) {
      let process = await this.userRepo.updateOne({ id: getUser.id }, { $set: { ...updateUserDto, updated_at: Date.now() } })
    }

    if (getUser) {
      res_json.statusCode = 1
      res_json.message = "data berhasil dirubah"
    } else {
      res_json.statusCode = 0
      res_json.message = "data gagal dirubah"
    }

    return res_json
  }

  async remove(id: string) {
    let result = await this.userRepo.findOne({ id: id })
    return this.userRepo.deleteOne({ id: result.id });
  }

  hash(plaintextPassword) {
    const hash = bcrypt.hashSync(plaintextPassword, 10)
    return hash
  }

  compare(plaintextPassword, hashPassword) {
    const valid = bcrypt.compareSync(plaintextPassword, hashPassword)
    return valid
  }

  async manualQuery(variant: string, condition: any) {

    let res_json: any = {}
    let result: any = null

    try {
      if (variant) {
        result = await this.userRepo[variant](condition).exec()
        res_json.statusCode = 1
        res_json.data = result
      } else {
        res_json.statusCode = 0
        res_json.message = "manual query error, variant is missing"
      }
    } catch (error) {
      res_json.statusCode = 0
      res_json.message = error.message
    }

    return res_json

  }

  
  findAll2(req_body) {
    return this.generatePage(req_body, User.name, this.MongoDbConnection)
  }

}
