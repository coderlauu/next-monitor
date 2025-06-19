import { Controller, Post, Request, UseGuards } from '@nestjs/common'

import { LocalAuthGuard } from '../../guard/local-auth/local-auth.guard'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/auth/login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req): Promise<any> {
        // LocalStrategy验证成功后，req.user包含用户信息
        const token = await this.authService.login(req.user)
        return {
            data: token,
            success: true,
            message: '登录成功',
        }
    }
}
