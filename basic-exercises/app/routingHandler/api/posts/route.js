/*
export 一个名为 GET 的 async 函数来定义 GET 请求处理，注意是 export 而不是 export default
我们使用 next/server 的 NextResponse 对象用于设置响应内容(推荐使用)，
但这里不一定非要用 NextResponse，直接使用 Response 也是可以的
Next.js 支持 GET、POST、PUT、PATCH、DELETE、HEAD 和 OPTIONS 这些 HTTP 请求方法。
如果传入了不支持的请求方法，Next.js 会返回 405 Method Not Allowed
*/

//每个请求方法的处理函数会被传入两个参数，一个 request，一个 context 。两个参数都是可选的
//request 对象是一个 NextRequest 对象，它是基于 Web Request API 的扩展。使用 request ，你可以快捷读取 cookies 和处理 URL
/**
 * context 只有一个值就是 params，它是一个包含当前动态路由参数的对象
 * 比如:
 * app/dashboard/[team]/route.js	/dashboard/1	{ team: '1' }
 * app/shop/[tag]/[item]/route.js	/shop/1/2	{ tag: '1', item: '2' }
 * app/blog/[...slug]/route.js	/blog/1/2	{ slug: ['1', '2'] }
 */

//参数使用
// export async function GET(request, context) {

//   //  访问 /home, pathname 的值为 /home
//   const pathname = request.nextUrl.pathname
//   // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
//   const searchParams = request.nextUrl.searchParams
//   const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//   const data = await res.json()

//   return NextResponse.json({ data })
// }

//默认缓存
//开发模式下，并不会被缓存，每次刷新时间都会改变，生产模式下，时间不会改变
//打包是被预渲染为静态的内容，换言之，/api/posts 的返回结果其实在构建的时候就已经确定了，而不是在第一次请求的时候才确定
// export async function GET() {
//   console.log('GET /api/time')
//   return Response.json({ data: new Date().toLocaleTimeString() })
// }

//退出缓存，下面方法可以退出缓存
//1.GET 请求使用 Request 对象
// export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams
//   return Response.json({ data: new Date().toLocaleTimeString(), params: searchParams.toString() })
// }
//2.添加其他 HTTP 方法，比如 POST
// export async function POST() {
//   console.log('POST /api/time')
//   return Response.json({ data: new Date().toLocaleTimeString() })
// }
//3.使用像 cookies、headers 这样的动态函数
// export async function GET(request) {
//   const token = request.cookies.get('token')
//   return Response.json({ data: new Date().toLocaleTimeString() })
// }
//4. 路由段配置项手动声明为动态模式
// export const dynamic = 'force-dynamic'
// export async function GET() {
//   return Response.json({ data: new Date().toLocaleTimeString() })
// }

//设置缓存时效
//1. 使用路由段配置项
//超过 revalidate 设置时间的首次访问会触发缓存更新，如果更新成功，后续的返回就都是新的内容，直到下一次触发缓存更新
// export const revalidate = 10
// export async function GET() {
//   return Response.json({ data: new Date().toLocaleTimeString() })
// }
//2.使用 next.revalidate 设置 fetch 请求的重新验证时间

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    next: { revalidate: 5 }, //  每 5 秒重新验证
  });
  const data = await res.json();
  console.log(data);
  return Response.json(data);
}

export async function HEAD(request) { }

export async function POST(request) {
  const article = await request.json();

  return NextResponse.json(
    {
      id: Math.random().toString(36).slice(-8),
      data: article,
    },
    { status: 201 }
  );
}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

// 如果 `OPTIONS` 没有定义, Next.js 会自动实现 `OPTIONS`
export async function OPTIONS(request) { }

/**
 * 常见问题
 * 1. 如何获取网址参数？
 * app/api/search/route.js
 *访问 /api/search?query=hello
 *  export function GET(request) {
 *    const searchParams = request.nextUrl.searchParams
 *    const query = searchParams.get('query') // query
 *  }
 * 
 * 2.  如何处理 Cookie？
 * （1）通过 NextRequest对象
 *  export async function GET(request) {  
 *    const token = request.cookies.get('token')
 *    request.cookies.set(`token2`, 123)
 *  }
 * （2）通过next/headers包提供的 cookies方法
 * import { cookies } from 'next/headers'
 * export async function GET(request) {
 *   const cookieStore = cookies()
 *   const token = cookieStore.get('token')
 *
 *  return new Response('Hello, Next.js!', {
 *    status: 200,
 *    headers: { 'Set-Cookie': `token=${token}` },
 *  })
}
 * 
 * 
 * 3. 如何处理 Headers ？
 * （1）通过 NextRequest对象
 *  export async function POST(request) {
 *     const headersList = new Headers(request.headers)
 *     const referer = headersList.get('referer')
 *  }
 * （2）通过next/headers包提供的 headers方法
 *  import { headers } from 'next/headers'
 *  export async function GET(request) {
 *    const headersList = headers()
 *    const referer = headersList.get('referer')
 * 
 *    return new Response('Hello, Next.js!', {
 *      status: 200,
 *      headers: { referer: referer },
 *    }
 * 
 * 4. 如何重定向？
 * 使用 next/navigation 提供的 redirect 方法
 * import { redirect } from 'next/navigation'
 *  export async function GET(request) {
 *    redirect('https://nextjs.org/')
 *  }
 * 
 * 5. 如何获取请求体内容？
 * 使用 next/error 提供的 error 方法
 * import { NextResponse } from 'next/server'
 * export async function POST(request) {
 *   const res = await request.json()
 *   return NextResponse.json({ res })
 * }
 * 如果请求正文是 FormData 类型
 * import { NextResponse } from 'next/server'
 * export async function POST(request) {
 *   const formData = await request.formData()
 *   const name = formData.get('name')
 *   const email = formData.get('email')
 *   return NextResponse.json({ name, email })
 * }
 * 
 * 6. 如何设置 CORS？
 * 使用 next/headers 包提供的 headers 方法
 * import { headers } from 'next/headers'
 * export async function GET(request) {
 *   return new Response('Hello, Next.js!', {
 *     status: 200,
 *     headers: {
 *       'Access-Control-Allow-Origin': '*',
 *       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
 *       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
 *     },
 *   })
 * }
 * 
 * 7. 如何响应无 UI 内容？
 * 可以返回无 UI 的内容。在这个例子中，访问 /rss.xml的时候，会返回 XML 结构的内容
 * // app/rss.xml/route.ts
 * export async function GET() {
 *   return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
 * <rss version="2.0">
 * <channel>
 *   <title>Next.js Documentation</title>
 *   <link>https://nextjs.org/docs</link>
 *   <description>The React Framework for the Web</description>
 * </channel>
 * </rss>`)
 * }
 * 
 * 8. Streaming(流式传输)
 * 使用 next/server 包提供的 iteratorToStream 方法
 * function iteratorToStream(iterator) {
 *   return new ReadableStream({
 *     async pull(controller) {
 *       const { value, done } = await iterator.next()
 * 
 *       if (done) {
 *         controller.close()
 *       } else {
 *         controller.enqueue(value)
 *       }
 *     },
 *  })
 * }
 * 
 * function sleep(time) {
 *   return new Promise((resolve) => {
 *     setTimeout(resolve, time)
 *   })
 * }
 
 * const encoder = new TextEncoder()
 * async function* makeIterator() {
 *   yield encoder.encode('<p>One</p>')
 *   await sleep(200)
 *   yield encoder.encode('<p>Two</p>')
 *   await sleep(200)
 *   yield encoder.encode('<p>Three</p>')
}
 
* export async function GET() {
*   const iterator = makeIterator()
*   const stream = iteratorToStream(iterator)
*   return new Response(stream)
* }
 */
