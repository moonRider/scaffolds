# scaffolds

基于 [makes](https://makes.js.org/) 的项目模板。

## 使用方式

从 GitHub 模板仓库生成项目：

```bash
pnpm dlx makes moonRider/scaffolds my-app
```

也可以使用其他包管理器：

```bash
npx makes moonRider/scaffolds my-app
yarn dlx makes moonRider/scaffolds my-app
bunx makes moonRider/scaffolds my-app
```

本地开发模板时，可以在当前模板仓库外执行：

```bash
pnpm dlx makes /path/to/scaffolds my-app
```

也可以使用其他包管理器：

```bash
npx makes /path/to/scaffolds my-app
yarn dlx makes /path/to/scaffolds my-app
bunx makes /path/to/scaffolds my-app
```

## 交互问题

模板会询问：

1. 项目类型，目前支持 `Nextjs`。
2. 包管理器，可选 `pnpm`、`yarn`、`bun`、`npm`。
3. 生成完成后是否立即使用前面选择的包管理器安装依赖。

## 生成后流程

`after.js` 会在文件写入完成后自动执行：

1. `git init -b main`
2. `chmod +x .husky/pre-commit .husky/commit-msg`
3. 如果选择安装依赖，执行对应的 `<package-manager> install`
4. 输出项目启动步骤

## Silent Mode

可以通过 makes 的 `-s` 参数跳过交互问题：

```bash
pnpm dlx makes /path/to/scaffolds my-app -s nextjs,pnpm
```

Silent mode 下不会询问是否立即安装依赖。生成完成后按提示手动安装依赖并启动：

```bash
cd my-app
pnpm install
pnpm run dev
```

## 模板结构

- `common/`：所有项目都会合并的通用文件。
- `nextjs/`：Next.js 项目模板。
- `questions.js`：makes 交互问题。
- `after.js`：项目生成后的初始化脚本。
