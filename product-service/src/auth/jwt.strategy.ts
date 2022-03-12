import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Connection } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { UserService } from "src/user/user.service";
import { User } from '../user/entities/user.entity';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        // private userService: UserService,
        @InjectConnection() public MongoDbConnection: Connection
    ) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // terlalu simple
            jwtFromRequest: ExtractJwt.fromHeader('eki-custom-auth-header'), //2022-02-06 //https://stackoverflow.com/questions/50317738/fromauthheaderasbearertoken-is-not-working-in-node
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(payload: any) {
        //let user: any = await this.userService.findOne(payload.id)
        let user: any = await this.MongoDbConnection.model(User.name).findOne({ id: payload.id })

        let payload_custom: any = {}
        if (payload.user_payload && payload.user_payload) {
            payload_custom = { ...payload.user_payload }
            delete payload_custom.password
        }

        if (user) {
            let res_json: any = {
                id: user.id,
                name: user.name,
                payload_login: payload_custom
            }
            return res_json
        }
        else {
            throw new UnauthorizedException()
        }
    }

}