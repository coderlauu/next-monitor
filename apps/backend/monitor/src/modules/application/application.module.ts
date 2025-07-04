import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicationEntity } from 'src/entities/application.entity'

import { ApplicationController } from './application.controller'
import { ApplicationService } from './application.service'

@Module({
    imports: [TypeOrmModule.forFeature([ApplicationEntity])],
    controllers: [ApplicationController],
    providers: [ApplicationService],
})
export class ApplicationModule {}
