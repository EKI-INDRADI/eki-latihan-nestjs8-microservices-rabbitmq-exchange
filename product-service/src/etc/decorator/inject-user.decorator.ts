import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const InjectUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()

    let UserLogin = { ...req.user.payload_login }
    delete UserLogin._id
    delete UserLogin.__v
    req.body.user = UserLogin

    return req.body
})