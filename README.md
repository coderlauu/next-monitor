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
