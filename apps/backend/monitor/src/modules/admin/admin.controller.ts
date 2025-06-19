import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../../guard/jwt-auth/jwt-auth.guard'
import { AdminService } from './admin.service'

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('/currentUser')
    // 使用JwtAuthGuard保护需要登录才能访问的接口
    @UseGuards(JwtAuthGuard)
    async getAdmin(@Request() req) {
        return {
            data: req.user,
            code: 200,
            message: 'success',
        }
    }

    /**
     *
     * @param createAdminDto
     * @returns
     */
    @Post('admin/registry')
    async createAdmin(@Body() createAdminDto: any) {
        const newUser = await this.adminService.createAdmin(createAdminDto)
        return {
            data: newUser,
            code: 200,
            message: 'success',
        }
    }
}
