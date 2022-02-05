import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsService } from 'src/tools/tools.service';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
  controllers: [UserController],
  providers: [UserService, ToolsService], //https://stackoverflow.com/questions/51692886/nest-cant-resolve-dependencies-of-the-userservice-please-make-sure-that
  exports: [UserService] 
})
export class UserModule {}
