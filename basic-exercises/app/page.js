
/*
App Router模式  比如布局（layout.js）、页面（page.js）、模板（template.js）、加载状态（loading.js）、错误处理（error.js）、404（not-found.js）
同一文件夹下如果有 layout.js 和 page.js，page 会作为 children 参数传入 layout。换句话说，layout 会包裹同层级的 page。
布局是支持嵌套的，app/dashboard/settings/page.js会使用app/layout.js和app/dashboard/layout.js两个布局中的内容
*/

/*
app/page.js 对应路由 /
app/dashboard/page.js 对应路由 /dashboard
app/dashboard/settings/page.js 对应路由/dashboard/settings
*/



export default function Home() {
  return <h1>Hello, Next.js!</h1>
}
