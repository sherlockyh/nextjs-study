/*
Next.js App Router 路由说明
----------------------------
1. 文件约定：
   - layout.js：布局文件
   - page.js：页面文件
   - template.js：模板文件
   - loading.js：加载状态
   - error.js：错误处理
   - not-found.js：404页面

2. 路由规则：
   - app/page.js → '/'
   - app/dashboard/page.js → '/dashboard'
   - app/dashboard/settings/page.js → '/dashboard/settings'

3. 布局嵌套：
   - 同文件夹下的page.js会作为children传入layout.js
   - 支持多层级布局嵌套
*/

/*
路由导航方式
-----------
1. <Link> 组件：适用于声明式导航
2. useRouter Hook：适用于客户端编程式导航
3. redirect 函数：适用于服务端重定向
4. History API：适用于高度自定义的导航需求
*/
'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Home() {
   const router = useRouter()
   return (
      <div className="h-full  flex flex-col items-center justify-center p-4">
         <h1 className="text-4xl font-bold text-gray-800 mb-8">Hello, Next.js!</h1>
         <div className="space-y-4 w-full max-w-md">
            {/* 跳转方式1：使用Link组件 */}
            <Link
               href="/dashboard"
               className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
               go to Dashboard（基础）
            </Link>

            {/* 跳转方式2：使用useRouter */}
            <button
               type="button"
               onClick={() => router.push('/routerTypes/parallelRoutes/mainPage')}
               className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
               go to MainPage(平行路由)
            </button>

            <Link
               href="/routerTypes/dynamicRouters/type1/a"
               className="block w-full text-center py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
               go to type1(动态路由)
            </Link>

            <Link
               href="/routerTypes/interceptingRoutes"
               className="block w-full text-center py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
               go to interceptingRoutes(拦截路由)
            </Link>
         </div>
      </div>
   )
}
/*
Link示例代码
支持路由链接动态渲染
可以使用 usePathname() ，它会读取当前 URL 的路径名（pathname）
*/
// 'use client'
// import { usePathname } from 'next/navigation'
// import Link from 'next/link'

// export function Navigation({ navLinks }) {
//   const pathname = usePathname()

//   return (
//     <>
//       {navLinks.map((link) => {
//         const isActive = pathname === link.href

//         return (
//           <Link
//             className={isActive ? 'text-blue' : 'text-black'}
//             href={link.href}
//             key={link.name}
//           >
//             {link.name}
//           </Link>
//         )
//       })}
//     </>
//   )
// }

/*
客户端 使用 redirect 函数
*/
// import { redirect } from 'next/navigation'
// async function fetchTeam(id) {
//   const res = await fetch('https://...')
//   if (!res.ok) return undefined
//   return res.json()
// }
// export default async function Profile({ params }) {
//   const team = await fetchTeam(params.id)
//   if (!team) {
//     redirect('/login')
//   }

//   // ...
// }

/*
使用浏览器原生 History API，通常与 usePathname（获取路径名的 hook） 和 useSearchParams（获取页面参数的 hook） 一起使用

replaceState 会替换浏览器历史堆栈的当前条目，替换后用户无法后退
*/
// 'use client'

// import { useSearchParams } from 'next/navigation'

// export default function SortProducts() {
//   const searchParams = useSearchParams()

//   function updateSorting(sortOrder) {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set('sort', sortOrder)
//     window.history.pushState(null, '', `?${params.toString()}`)
//   }

//   return (
//     <>
//       <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
//       <button onClick={() => updateSorting('desc')}>Sort Descending</button>
//     </>
//   )
// }

/*
补充说明
-------
1. 滚动行为：
   - 默认滚动到页面顶部
   - 可通过scroll={false}保持滚动位置
   
2. 路由参数：
   - usePathname()：获取当前路径
   - useSearchParams()：获取URL参数
   
3. 导航选项：
   - router.push()：普通导航
   - router.replace()：替换当前历史记录
   - window.history：原生History API操作
*/

