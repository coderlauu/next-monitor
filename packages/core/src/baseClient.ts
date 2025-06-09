import { Transport } from "./transport";
import { MonitoringOptions } from "./types";


export class Monitoring {
    private transport: Transport | null = null

    constructor(private options: MonitoringOptions) {}

    init(transport: Transport) {
        this.transport = transport
        // getTransport = () => transport
        // 插件的消费
        for (const integration of this.options.integrations ?? []) {
            integration.init(transport)
        }
    }
}