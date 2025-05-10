/*
根布局注意事项
1.app 目录必须包含根布局，也就是 app/layout.js 这个文件是必需的。
2.根布局必须包含 html 和 body标签，其他布局不能包含这些标签。如果你要更改这些标签，不推荐直接修改
3.默认根布局是服务端组件，且不能设置为客户端组件
4.你可以使用'路由组'创建多个根布局    
5.最顶层的布局我们称之为根布局（Root Layout），也就是 app/layout.js。它会应用于所有的路由
*/

/*
 路由组：对路由进行逻辑分组和组织，通过将文件夹用括号包裹来创建，例如 (marketing) 或 (shop)

 1.最终的 URL 中省略了带括号的文件夹,比如(marketing)下的aaa文件夹，最终的URL为/aaa
 2.借助路由组，即便在同一层级，也可以创建不同的布局
 3.创建多个根布局，你需要删除掉 app/layout.js 文件，然后在每组都创建一个 layout.js文件。创建的时候要注意，因为是根布局，所以要有 <html> 和 <body> 标签
 4.注意不要解析为相同的 URL 路径。举个例子，因为路由组不影响 URL 路径，所以 (marketing)/about/page.js和 (shop)/about/page.js都会解析为 /about，这会导致报错
 5.创建多个根布局的时候，因为删除了顶层的 app/layout.js文件，访问 /会报错，所以app/page.js需要定义在其中一个路由组中
 6.跨根布局导航会导致页面完全重新加载，就比如使用 app/(shop)/layout.js根布局的 /cart 跳转到使用 app/(marketing)/layout.js根布局的 /blog 会导致页面重新加载
 7.当定义多个根布局的时候，使用 app/not-found.js会出现问题，可以参考该文章https://juejin.cn/post/7351321244125265930
*/

/*
特殊文件的层级关系
layout.js ->template.js ->error.js->loading.js->not-found.js->page.js
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error/>}>
      <Suspense fallback={<Loading/>}>
        <ErrorBoundary fallback={<NotFound/>}>
          <Page/>
        </ErrorBoundary>
      </Suspense>
    </Template>
  </Layout>
*/
import './globals.css'

export const metadata = {
  title: '我的Next.js应用',
  description: '使用Next.js创建的基础练习应用',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen w-full flex flex-col">
        <nav className="p-4 bg-gray-100 w-full">
          <div className="container mx-auto">
            app layout
          </div>
        </nav>
        <main className="flex-grow container mx-auto p-4 w-full h-full">
          {children}
        </main>
        <footer className="p-4 bg-gray-100 w-full">
          <div className="container mx-auto text-center">
            © 我的应用
          </div>
        </footer>
      </body>
    </html>
  );
}
