import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema({
    collection : 'main_user'
})


export class User {

    //======================== AUTO GENERATE

    @Prop({
        type: String,
        default: () =>  
            String(
                new Date().getFullYear()
                + ("0" + (new Date().getMonth() + 1)).slice(-2)
                + ("0" + new Date().getDate()).slice(-2)
                +  "-" + String(Date.now())
                // + ("0" + new Date().getMinutes()).slice(-2)
                // + ("0" + new Date().getSeconds()).slice(-2)
                // + ("0" + new Date().getMilliseconds()).slice(-3)
            )
    })
    id: Number

    //======================== /AUTO GENERATE

    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({ type: Date, default: () => Date.now() })
    created_at?: Date

    @Prop({ type: Date, default: () => Date.now() })
    updated_at?: Date

}


export const UserSchema = SchemaFactory.createForClass(User);
