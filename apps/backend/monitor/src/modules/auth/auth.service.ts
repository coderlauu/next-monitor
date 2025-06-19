import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AdminService } from '../admin/admin.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService
    ) {}

    async login(user: any): Promise<any> {
        const payload = {
            sub: user.id,
            username: user.username,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.adminService.validateUser(username, password)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
