/*
“API 接口”在 Next.js 中有个更为正式的称呼，就是路由处理程序
路由处理程序是指使用 Web Request 和 Response API 对于给定的路由自定义处理逻辑
写路由处理程序，你需要定义一个名为 route.js的特殊文件。（注意是 route 不是 router）
该文件必须在 app目录下，可以在 app 嵌套的文件夹下，但是要注意 page.js和 route.js不能在同一层级同时存在

我们将接口写在了 app/routingHandler/api 文件夹下，
并不是因为接口一定要放在名为 api 文件夹下（与 Pages Router 不同）。
如果你代码写在 app/routingHandler/api/posts/route.js，
对应的接口地址就是 /routingHandler/api/posts。
*/
import Link from 'next/link'
export default function RoutingHandler() {
  return (
    <>
      <div>RoutingHandler</div>
      <div>
        <Link href="/">go back home</Link>
      </div>

    </>
  );
}

