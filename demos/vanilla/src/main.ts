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
    dsn: '/dsn-api/tracing/vanilla10_UBT',
})

// Promise错误
Promise.reject('error')

// 资源错误
const img = new Image()
img.src = ''

// 接口错误
fetch('https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png')
    .then(res => {
        console.log('res', res)
    })
    .catch(err => {
        console.log('err', err)
    })

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
