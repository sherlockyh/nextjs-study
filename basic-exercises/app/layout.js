
/*
根布局注意事项
1.app 目录必须包含根布局，也就是 app/layout.js 这个文件是必需的。
2.根布局必须包含 html 和 body标签，其他布局不能包含这些标签。如果你要更改这些标签，不推荐直接修改
3.默认根布局是服务端组件，且不能设置为客户端组件
4.你可以使用'路由组'创建多个根布局     路由组：对路由进行逻辑分组和组织，通过将文件夹用括号包裹来创建，例如 (marketing) 或 (shop)
5.最顶层的布局我们称之为根布局（Root Layout），也就是 app/layout.js。它会应用于所有的路由
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
export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <nav>app nav</nav>
        {children}
      </body>
    </html>
  );
}
