import { createClient } from '@clickhouse/client'
import { DynamicModule, Global, Module } from '@nestjs/common'

@Global()
@Module({})
export class ClickhouseModule {
    static forRoot(options: { url: string; username: string; password: string }): DynamicModule {
        return {
            module: ClickhouseModule,
            providers: [
                {
                    provide: 'CLICKHOUSE_CLIENT',
                    useFactory() {
                        return createClient(options)
                    },
                },
            ],
            exports: ['CLICKHOUSE_CLIENT'],
        }
    }
}
