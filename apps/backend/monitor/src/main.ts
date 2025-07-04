import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // 添加全局前缀
    app.setGlobalPrefix('api')

    await app.listen(process.env.PORT ?? 8001)
}
bootstrap()
