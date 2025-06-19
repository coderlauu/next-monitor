import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApplicationEntity } from 'src/entities/application.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(ApplicationEntity)
        private readonly applicationRepository: Repository<ApplicationEntity>
    ) {}

    async getApplications(param: { userId: number }) {
        const [applications, count] = await this.applicationRepository.findAndCount({
            // 关联查询出user信息
            // relations: ['user'],
            // 通过用户id查找
            where: {
                user: {
                    id: param.userId,
                },
            },
        })
        return {
            applications,
            count,
        }
    }

    async createApplication(application: ApplicationEntity) {
        await this.applicationRepository.save(application)
        return application
    }

    async updateApplication(id: number, application: ApplicationEntity) {
        await this.applicationRepository.update(id, application)
        return application
    }

    async deleteApplication(payload: { appId: string; userId: number }) {
        const res = await this.applicationRepository.delete({
            appId: payload.appId,
            user: {
                id: payload.userId,
            },
        })

        if (res.affected === 0) {
            throw new NotFoundException('应用不存在')
        }

        return res.raw[0]
    }
}
