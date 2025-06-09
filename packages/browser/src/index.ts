/**
 * @description 实现性能监控、异常捕获、点击事件采集，以及浏览器专用的Transport
 */
import { Monitoring } from "@next-monitor/monitor-sdk-core"
import { Errors } from "./tracing/errorsIntegration"
import { BrowserTransport } from "./transport"

interface InitOptions {
    dsn: string
    integrations: any[]
}

// class Monitoring {
//     dsn: string
//     integrations: any[]
//     constructor(options: InitOptions) {
//         this.dsn = options.dsn
//         this.integrations = options.integrations
//     }

//     init(transport: Transport) {
//         transport.send
//     }
// }


// 有多种传输数据的方式；抽象出Transport接口
// 1. 使用Image对象
// 2. 使用Fetch API
// 3. 使用XMLHttpRequest
// 4. sendBeacon
// type Transport = BrowserTransport /** | NodeTransport | ImageTransport | FetchTransport | SendBeaconTransport */

// class BrowserTransport {
//     send(data: any) {
//         console.log('send')
//     }
// }

export const init = (options: InitOptions) => {
    // 1. 实例化Monitor
    const monitoring = new Monitoring({
        dsn: options.dsn,
        // 2. 插件注册和消费
        integrations: options.integrations
    })
    // 定义上报逻辑方法
    const transport = new BrowserTransport(options.dsn)
    monitoring.init(transport)
    // 3. 上报协议定义与初始化
    // 错误采集
    new Errors(transport).init()
    // 性能采集
    // new Metrics(transport).init()

    return monitoring
}
