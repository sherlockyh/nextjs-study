/*
app/not-found.js ，它只能由两种情况触发：
 1.当组件抛出了 notFound 函数的时候
 2.当路由地址不匹配的时候

 app/not-found.js 可以修改默认 404 页面的样式。但是，如果 not-found.js放到了任何子文件夹下，它只能由 notFound函数手动触发

  // /dashboard/blog/page.js
  import { notFound } from 'next/navigation'
  export default function Page() {
    notFound()
    return <></>
  }
  
  执行 notFound 函数时，会由最近的 not-found.js 来处理。但如果直接访问不存在的路由，则都是由 app/not-found.js 来处理
*/

import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
