import { ClickHouseClient } from '@clickhouse/client'
import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SpanService {
    constructor(@Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: ClickHouseClient) {}

    async trancing(app_id: string, body: { event_type: string; message: string }) {
        const { event_type, message, ...rest } = body
        const values = {
            app_id,
            event_type,
            message,
            info: rest,
        }
        const res = await this.clickhouseClient.insert({
            table: 'base_monitor_storage',
            values,
            columns: ['app_id', 'event_type', 'message', 'info'],
            format: 'JSONEachRow',
        })
        Logger.log('Query result', JSON.stringify(res.summary))
    }

    async getSpan() {
        const query = `
            SELECT * FROM base_monitor_view;
        `

        const res = await this.clickhouseClient.query({
            query,
        })

        const queryResult = await res.json()
        // Logger.log('Query result', queryResult)

        return queryResult.data
    }

    async bugs() {
        const query = `
            SELECT * FROM base_monitor_view WHERE event_type = 'error';
        `

        const res = await this.clickhouseClient.query({
            query,
        })

        const queryResult = await res.json()
        Logger.log('Query result', queryResult)

        return queryResult.data
    }

    async performance() {
        const query = `
            SELECT * FROM base_monitor_view WHERE event_type = 'performance';
        `

        const res = await this.clickhouseClient.query({
            query,
        })

        const queryResult = await res.json()
        Logger.log('Query result', groupData(queryResult.data))

        return groupData(queryResult.data)
    }
}

function groupData(data) {
    return data.reduce((acc, curr) => {
        const { app_id, info } = curr
        const { path } = info

        // 初始化 app_id 组
        if (!acc[app_id]) {
            acc[app_id] = {}
        }

        // 初始化 path 组
        if (!acc[app_id][path]) {
            acc[app_id][path] = []
        }

        // 将当前数据添加到对应的分组
        acc[app_id][path].push(curr)

        return acc
    }, {})
}
