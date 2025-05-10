import Link from "next/link";

/*
1.平行路由可以使你在同一个布局中同时或者有条件的渲染一个或者多个页面（类似于 Vue 的插槽功能）
2.平行路由的使用方式是将文件夹以@作为开头进行命名
3.team, analytics除了让它们同时展示，也可以根据条件判断展示
4.平行路由可以让你为每个路由定义独立的错误处理和加载界面，即在@team, @analytics文件夹中分别创建error.js和loading.js文件
5.它们也能像正常的页面一样，添加子页面，比如我们在 @analytics 下添加子页面  /visitors
  平行路由跟路由组一样，不会影响 URL，
  /@analytics/visitors/page.js 对应的地址是 /visitors
  当导航至这些子页面的时候，子页面的内容会取代 /@analytics/page.js 以 props 的形式注入到布局中
*/

export default function MainPageLayout({ children, team, analytics }) {

  return (
    <div className="p-6">
      <div className="p-10 mb-6 bg-sky-600 text-white rounded-xl ">
        Parallel Routes Examples
      </div>
      <nav className="flex items-center justify-center gap-10 text-blue-600 mb-6">
        <Link href="/">Home</Link>
        <Link href="/routerTypes/parallelRoutes/mainPage">Main Page</Link>
        <Link href="/routerTypes/parallelRoutes/mainPage/page-view">Page Views</Link>
        <Link href="/routerTypes/parallelRoutes/mainPage/visitors">Visitors</Link>
      </nav>
      <div className="flex gap-6">
        {team}
        {analytics}
      </div>
      {children}
    </div>
  )
}


