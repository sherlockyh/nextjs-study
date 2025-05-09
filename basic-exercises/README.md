## 开发环境

- Node.js 18.18.0 或更高版本
- npm 9.6.6 或更高版本

## 启动项目

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 常用示例：

```bash
# 使用特定示例创建项目
npx create-next-app --example with-redux your-app-name
```

- with-redux：Redux 集成示例
- with-typescript：TypeScript 集成示例
- with-tailwindcss：Tailwind CSS 集成示例
- api-routes-cors：API 路由 CORS 配置示例
- with-jest：Jest 测试集成示例

更多示例可以在 [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples) 查看。

## 常用命令

```bash
# 开发环境
npm run dev    # 启动开发服务器
npm run build  # 构建生产版本
npm run start  # 运行生产版本

# Next.js 构建命令
npx next build                # 创建项目的生产优化版本
npx next build --profile      # 开启 React 的生产性能分析（需要 Next.js v9.5+）
npx next build --debug        # 开启更详细的构建输出
```

构建输出说明：

- `Size`：导航到特定路由时需要下载的资源大小（仅包含该路由的依赖）
- `First Load JS`：首次加载页面时需要下载的资源总大小
- `First Load JS shared by all`：所有路由共享的 JS 文件大小
