import { Transport } from './transport'

/**
 * 插件协议
 */
export interface IIntegration {
    init(transport: Transport): void
}

export class Integration implements IIntegration {
    transport: Transport | null = null

    init(transport: Transport): void {
        this.transport = transport
    }
}

/**
 * 监控相关配置
 */
export interface MonitoringOptions {
    dsn: string
    integrations: Integration[]
}