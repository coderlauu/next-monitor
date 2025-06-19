import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from 'src/entities/admin.entity'

import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService], // 导出 AdminService 供其他模块使用
})
export class AdminModule {}
