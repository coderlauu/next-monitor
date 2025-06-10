# next-monitor

## 工程化规范

### ESLint 配置

-   依赖包

```ts
"@types/node": "22.7.5",                            // 整个开发环境对于node脚本的ts支持
"eslint": "9.12.0",
"@eslint/js": "9.12.0",                             // 用于js的标准规则和全局变量支持
"globals": "15.10.0",                               // 同上
"typescript": "5.5.3",
"typescript-eslint": "8.8.1",                       // ts支持和类型检查，确保更强的类型约束
"eslint-plugin-react-refresh": "0.4.12",            // 确保react hooks 使用规范
"eslint-plugin-react-hooks": "^5.1.0-rc.0",         // 支持react快速刷新功能
"eslint-plugin-prettier": "5.2.1",                  // 将Prettier集成到ESLint中，提供代码格式化
"eslint-plugin-simple-import-sort": "12.1.1"        // 用于自动排序导入语句，提升可读性
```

-   eslint.config.js 配置(见对应文件)

-   增加脚本命令：

```json
"scripts": {
    "lint:ts": "eslint"
}
```

### Prettier 配置

-   参照 `.prettierignore` 和 `.prettierrc` 文件配置

### cspell 拼写检查

-   依赖包

```json
"cspell": "8.14.4",
```

-   cspell.json 配置(见对应文件)

-   根目录新建.cspell/custom-words.txt 文件，用于加入白名单的字典

-   增加脚本命令：

```json
"scripts": {
    "spellcheck": "cspell lint --dot --gitignore --color --cache --show-suggestions \"(packages|apps)/**/*.@(html|js|cjs|mjs|ts|tsx|css|scss|md)\""
}
```

### commit 信息规范

-   依赖包

```json
"@commitlint/cli": "19.5.0",
"@commitlint/config-conventional": "19.5.0",
"commitizen": "4.3.1",
"cz-git": "1.10.1"
```

-   commitlint.config.js 配置（见对应文件）

    -   https://cz-git.qbb.sh/ 也可以在这里找自己喜欢的模板

-   增加脚本命令：

```json
"scripts": {
    "commit": "git-cz"
},
// 【重要⚠️】：一定要这样配置哦
"config": {
    "commitizen": {
        "path": "node_modules/cz-git"
    }
},
```

-   预览看看效果

```sh
git add .
# 选择对应type（feat/fix）-> SCOPE选择`project` -> 输入提交信息 -> 一直回车敲到尾
pnpm commit
```

<b>Anywhere! 此时提交并没有被拦截

### Husky 配置

-   依赖包

```json
"husky": "9.1.6",
```

-   初始化 husky

```sh
npx husky init
```

此时可以在 `.husky/pre-commit` 定义 commit 前的配置
我们可以这个文件加入以下代码测试一下：

```sh
#!/usr/bin/env sh

pnpm test
```

然后执行提交 git，此时会发现 commit 拦截生效了

```sh
git add .
# 选择对应type（feat/fix）-> SCOPE选择`project` -> 输入提交信息 -> 一直回车敲到尾
pnpm commit
```

-   修改 `.husky/pre-commit` 配置

```sh
#!/usr/bin/env sh

pnpm lint:ts && pnpm spellcheck
```

### `.vscode/settings.json` 统一本项目的配置

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    },
    "editor.formatOnSave": true,
    "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

### ts 相关配置

`tsconfig.json` -- 基础、公用配置  
`tsconfig.server.json` -- 服务端配置  
`tsconfig.client.json` -- 客户端配置

### tsup？使用？解决了什么问题？

#### tsup 使用示例

```json
"scripts": {
    // 通过watch监听子包有变化时，本项目的引入方（demos/vanilla/src/index.ts）会自动同步最新的变化
    "build:watch": "pnpm run build:watch:transpile & pnpm run build:watch:types",
    "build:watch:transpile": "tsup --watch",
    "build:watch:types": "tsc -p tsconfig.types.json --watch",
    "build": "pnpm run build:transpile && pnpm run build:types",
    "build:transpile": "tsup",
    "build:types": "tsc -p tsconfig.types.json"
},
```

#### 子包产物及子包产物向外暴露的规范

```json
# package.json
    "main": "build/cjs/index.js",       // 入口文件对应为commonjs的产物
    "module": "build/esm/index.mjs",    // 对应es module的产物
    "types": "build/types/index.d.ts",  // 对应types的产物
    "exports": {
        "./package.json": "./package.json",
        ".": {  // 主入口点（当 import 'package-name' 时）
            "import": {   // ES6 模块导入 (import/export)
                "types": "./build/types/index.d.ts",  // TypeScript 类型定义
                "default": "./build/esm/index.mjs"    // ES6 模块文件
            },
            "require": {  // CommonJS 导入 (require())
                "types": "./build/types/index.d.ts",    // TypeScript 类型定义
                "default": "./build/cjs/index.js"       // CommonJS 模块文件
            }
        }
    },
```

#### 示例场景

1. ES6 模块导入

```js
import { something } from 'package-name'
// 会使用 ./build/esm/index.mjs
```

2. CommonJS 导入

```js
const { something } = require('package-name')
// 会使用 ./build/cjs/index.js
```

3. TypeScript 支持
   无论哪种导入方式，TypeScript 都会使用 ./build/types/index.d.ts 获取类型信息。

#### 优势

1. 双格式支持 - 同时支持 ES6 和 CommonJS
2. 条件导出 - 根据导入方式自动选择合适的文件
3. TypeScript 友好 - 提供完整的类型支持
4. 现代标准 - 符合 Node.js 模块解析规范

## 指标采集、埋点设计实践与数据上报机制实现

### SDK 数据采集上报核心实现思路

#### 核心模块

1. 性能指标 `/packages/browser-utils/src/metrics` 用的是 web-vitals 这个库的源码
    - FP
    - FCP
    - CLS
    - FID
    - INP
2. 异常指标
    - js 执行异常
    - 资源加载异常
    - promise reject 异常
3. 事件
    - 点击事件 click
    - 进入、离开，pv、uv
    - 只要是能够监听的事件都可以统计上报
4. 浏览器宿主环境信息
    - IP
    - 机型
    - 系统
    - 浏览器版本
5. 数据传输协议
    - xhr
    - 图片
    - sendbacon
    - fetch ✅

#### 原生 js 环境下测试

-   在`demos/`下，创建一个 vanilla 项目用于调试原生 js 环境

```sh
pnpm create vite vanilla --template vanilla-ts
```

## 实现 SDK 开发

1. 产物如何构建

-   通过 tsup

2. 产物构建的内容如何被其他子包使用
    1. 非构建方式
    2. 构建方式 ✅

#### 针对 packages 下的多个子包同时构建并监听

在根目录的 package.json 中，添加 build 命令

```json
"scripts": {
    // ...
    "build": "pnpm --filter @next-monitor/* build",
    "build:watch": "pnpm --filter @next-monitor/* build --watch"
},
```
