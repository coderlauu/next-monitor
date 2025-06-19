import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AdminEntity } from 'src/entities/admin.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async createAdmin(body: any) {
        const adminIsExist = await this.adminRepository.findOne({
            where: {
                username: body.username,
            },
        })
        if (adminIsExist) {
            throw new HttpException({ message: '用户已存在', error: 'user is existed' }, 400)
        }
        // create() 只是创建了一个实体对象实例，还在内存中
        const admin = await this.adminRepository.create(body)
        /**
         * ...可以对密码进行加密存储、可以定义用户角色...
         */

        // save() 将对象持久化到数据库
        await this.adminRepository.save(admin)
        return admin
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validateUser(username: string, _password: string) {
        const user = await this.adminRepository.findOne({
            where: { username },
        })

        // 暂不校验密码准确性
        if (user) {
            // 剔除密码
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: userPassword, ...rest } = user
            return rest
        }
        return null
    }

    async findById(id: number) {
        const user = await this.adminRepository.findOne({ where: { id } })

        if (!user) {
            return null
        }

        // 剔除密码
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user
        return rest
    }
}
