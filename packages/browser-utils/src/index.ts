/**
 * 获取浏览器的基本信息
 */
export function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        referrer: document.referrer,
        path: location.pathname,
    }
}

export { Metrics } from './integrations/metrics'
