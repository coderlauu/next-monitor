### pg、typeorm的安装

```json
  "@nestjs/typeorm": "11.0.0",
  "typeorm": "0.3.24",
  "pg": "8.16.0"
```

### 鉴权的安装

```json
  "@nestjs/passport": "11.0.5",
  "passport": "0.7.0",
  "passport-local": "1.0.0",
  "passport-jwt": "4.0.1",
  "@nestjs/jwt": "11.0.0"
```

## local.strategy.ts和jwt.strategy.ts的区别

### LocalStrategy (本地策略)

#### 用途

用于用户登录时的身份验证

#### 使用场景

- 首次身份验证
- 获取JWT token

#### 示例

```typescript
// auth.controller.ts
@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard) // 使用 LocalStrategy
    @Post('login')
    async login(@Request() req) {
        // req.user 是 LocalStrategy 验证后返回的用户信息
        return this.authService.login(req.user)
    }
}
```

### JwtStrategy (JWT 策略)

#### 用途

用于保护需要认证的接口，验证 JWT token 的有效性。

#### 流程

请求头获取jwt -> 验证Jwt有效性 -> 解析Jwt payload -> 验证payload有效性

#### 使用场景

- 保护需要登录才能访问的接口

#### 示例

```typescript
// app.controller.ts
@Controller()
export class AppController {
    @UseGuards(JwtAuthGuard) // 使用 JwtStrategy
    @Get('profile')
    getProfile(@Request() req) {
        // req.user 是 JwtStrategy 验证后返回的用户信息
        return req.user
    }
}
```

#### 执行 `/auth/login` 接口之后的流程：

1. POST /auth/login
   ↓
2. LocalAuthGuard 拦截
   ↓
3. LocalStrategy.validate()
   ↓
4. AdminService.validateUser()
   ↓
5. 验证成功，用户信息存入 req.user
   ↓
6. AuthController.login() 执行
   ↓
7. AuthService.login() 生成 JWT
   ↓
8. 返回 JWT token 给客户端

#### 执行 `/admin/profile` 接口之后的流程：
