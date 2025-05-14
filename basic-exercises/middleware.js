// middleware.js
//写中间件，你需要在项目的根目录定义一个名为 middleware.js的文件
//项目根目录指的是和 pages 或 app 同级。但如果项目用了 src目录，则放在 src下
/**
 * 使用 Middleware 的时候还要注意一点，那就是目前 Middleware 只支持 Edge runtime，并不支持 Node.js runtime。
 * 这意味着写 Middleware 的时候，尽可能使用 Web API，避免使用 Node.js API
 * 
*/
import { NextResponse } from 'next/server'

// 中间件可以是 async 函数，如果使用了 await

//通过 config.matcher设置中间件生效的路径，在 middleware函数中设置中间件的逻辑，
//作用是将 /about、/about/xxx、/about/xxx/xxx 这样的的地址统一重定向到 /home
export function middleware(request) {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 设置匹配路径
//1.使用matcher
export const config = {
  //matcher 不仅支持字符串形式，也支持数组形式，用于匹配多个路径
  //matcher 还可以判断查询参数、cookies、headers
  /**
   *  matcher: [
   *  {
   *    source: '/api/*',
   *    has: [
   *      { type: 'header', key: 'Authorization', value: 'Bearer Token' },
   *      { type: 'query', key: 'userId', value: '123' },
   *    ],
   *    missing: [{ type: 'cookie', key: 'session', value: 'active' }],
   *  },
   * ],
  */
  matcher: ['/about/:path*', '/contact/:path*'],
}
//2.使用条件语句
// import { NextResponse } from 'next/server'
// export function middleware(request) {
//   if (request.nextUrl.pathname.startsWith('/about')) {
//     return NextResponse.rewrite(new URL('/about-2', request.url))
//   }

//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }
// }


// 1.如何读取和设置 cookies？
//对于传入的请求，NextRequest 提供了 get、getAll、set和 delete方法处理 cookies，你也可以用 has检查 cookie 或者 clear删除所有的 cookies。
//对于返回的响应，NextResponse 同样提供了 get、getAll、set和 delete方法处理 cookies
// import { NextResponse } from 'next/server'
// export function middleware(request) {
//   // 假设传入的请求 header 里 "Cookie:nextjs=fast"
//   let cookie = request.cookies.get('nextjs')
//   console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
//   const allCookies = request.cookies.getAll()
//   console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

//   request.cookies.has('nextjs') // => true
//   request.cookies.delete('nextjs')
//   request.cookies.has('nextjs') // => false

//   // 设置 cookies
//   const response = NextResponse.next()
//   response.cookies.set('vercel', 'fast')
//   response.cookies.set({
//     name: 'vercel',
//     value: 'fast',
//     path: '/',
//   })
//   cookie = response.cookies.get('vercel')
//   console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }

//   // 响应 header 为 `Set-Cookie:vercel=fast;path=/test`
//   return response
// }


// 2.如何读取和设置 headers？
// import { NextResponse } from 'next/server'
// export function middleware(request) {
//   //  clone 请求标头
//   const requestHeaders = new Headers(request.headers)
//   requestHeaders.set('x-hello-from-middleware1', 'hello')

//   // 你也可以在 NextResponse.rewrite 中设置请求标头
//   const response = NextResponse.next({
//     request: {
//       // 设置新请求标头
//       headers: requestHeaders,
//     },
//   })

//   // 设置新响应标头 `x-hello-from-middleware2`
//   response.headers.set('x-hello-from-middleware2', 'hello')
//   return response
// }

// 3.如何直接响应 ?
// 使用 NextResponse 设置返回的 Response
// import { NextResponse } from 'next/server'
// import { isAuthenticated } from '@lib/auth'
// export const config = {
//   matcher: '/api/:function*',
// }
// export function middleware(request) {
//   // 鉴权判断
//   if (!isAuthenticated(request)) {
//     // 返回错误信息
//     return new NextResponse(
//       JSON.stringify({ success: false, message: 'authentication failed' }),
//       { status: 401, headers: { 'content-type': 'application/json' } }
//     )
//   }
// }


//中间件相关配置项(Next.js v13.1新增)
// 1.skipTrailingSlashRedirect
// skipTrailingSlashRedirect ：跳过尾部斜杠重定向，
// 当你设置 skipTrailingSlashRedirect为 true 后，假设再次访问 / about /，URL 依然会是 / about /

// 举例：除 /docs 和 /blog 作为前缀的路由之外，其他路由都自动添加上尾部斜杠
// // next.config.js
// module.exports = {
//   skipTrailingSlashRedirect: true,
// }
// // middleware.js
// const legacyPrefixes = ['/docs', '/blog']
// export default async function middleware(req) {
//   const { pathname } = req.nextUrl

//   if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
//     return NextResponse.next()
//   }

//   // 应用尾部斜杠
//   if (
//     !pathname.endsWith('/') &&
//     !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
//   ) {
//     req.nextUrl.pathname += '/'
//     return NextResponse.redirect(req.nextUrl)
//   }
// }

// 2.skipMiddlewareUrlNormalize
// 设置 skipMiddlewareUrlNormalize 为 true 后，可以获取路由原始的地址，常用于国际化场景中

// 举例：
// // next.config.js
// module.exports = {
//   skipMiddlewareUrlNormalize: true,
// }

// // middleware.js
// export default async function middleware(req) {
//   const { pathname } = req.nextUrl

//   // GET /_next/data/build-id/hello.json

//   console.log(pathname)
//   // 如果设置为 true，值为：/_next/data/build-id/hello.json
//   // 如果没有配置，值为： /hello
// }


