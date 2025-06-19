import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common'
import { nanoid } from 'nanoid'
import { AdminEntity } from 'src/entities/admin.entity'
import { ApplicationEntity } from 'src/entities/application.entity'
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe'

import { CreateApplicationDto, createApplicationSchema, DeleteApplicationDto, deleteApplicationSchema } from './application.dto'
import { ApplicationService } from './application.service'

@Controller('application')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get()
    async getApplications(@Request() req) {
        const list = await this.applicationService.getApplications({ userId: req.user.id })
        return {
            data: list,
            success: true,
            message: '获取项目列表成功',
        }
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createApplicationSchema))
    async createApplication(@Body() createApplicationDto: CreateApplicationDto, @Request() req) {
        const admin = new AdminEntity()
        admin.id = req.user.id
        const application = new ApplicationEntity(createApplicationDto)
        Reflect.set<ApplicationEntity, 'appId'>(application, 'appId', application.type + nanoid(6))

        const newUser = await this.applicationService.createApplication({ ...application, user: admin })
        return {
            data: newUser,
            success: true,
            message: '创建应用成功',
        }
    }

    @Put(':id')
    async updateApplication(@Param('id') id: string, @Body() updateApplicationDto: any) {
        return this.applicationService.updateApplication(Number(id), updateApplicationDto)
    }

    @Delete()
    @UsePipes(new ZodValidationPipe(deleteApplicationSchema))
    async deleteApplication(@Body() deleteApplicationDto: DeleteApplicationDto, @Request() req) {
        const res = await this.applicationService.deleteApplication({ appId: deleteApplicationDto.appId, userId: req.user.id })
        return {
            data: res,
            success: true,
            message: '删除应用成功',
        }
    }
}
