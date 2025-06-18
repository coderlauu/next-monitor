import { getBrowserInfo } from '@next-monitor/monitor-sdk-browser-utils'

export class BrowserTransport {
    constructor(private dsn: string) {}

    send(data: Record<string, unknown>) {
        const browserInfo = getBrowserInfo()
        const payload = {
            ...data,
            browserInfo,
        }
        console.log('payload', payload)

        fetch(this.dsn, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).catch(err => console.error('Failed to send data', err))
    }
}
