import { Transport } from '@next-monitor/monitor-sdk-core'

import { onCLS, onFCP, onLCP, onTTFB } from '../metrics'

export class Metrics {
    transport: Transport
    constructor(transport: Transport) {
        this.transport = transport
    }

    init() {
        ;[onCLS, onFCP, onLCP, onTTFB].forEach(metricFn => {
            console.log('metricFn', metricFn)

            metricFn(metric => {
                this.transport.send({
                    event_type: 'performance',
                    type: 'webVital',
                    name: metric.name,
                    value: metric.value,
                    path: window.location.pathname,
                })
            })
        })
    }
}
