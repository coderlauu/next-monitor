import './style.css'

/**
 * 引入 SDK
 */
import { init } from '@next-monitor/monitor-sdk-browser'

import viteLogo from '/vite.svg'

import { setupCounter } from './counter.ts'
import typescriptLogo from './typescript.svg'

// 初始化 SDK
init({
    dsn: 'http://localhost:8000/api/v1/events',
})
// mainfn()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
