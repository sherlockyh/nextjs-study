
/*
export 一个名为 GET 的 async 函数来定义 GET 请求处理，注意是 export 而不是 export default
我们使用 next/server 的 NextResponse 对象用于设置响应内容(推荐使用)，
但这里不一定非要用 NextResponse，直接使用 Response 也是可以的
Next.js 支持 GET、POST、PUT、PATCH、DELETE、HEAD 和 OPTIONS 这些 HTTP 请求方法。
如果传入了不支持的请求方法，Next.js 会返回 405 Method Not Allowed
*/
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  const data = await res.json()

  return NextResponse.json({ data })
}



export async function HEAD(request) { }

export async function POST(request) {
  const article = await request.json()

  return NextResponse.json({
    id: Math.random().toString(36).slice(-8),
    data: article
  }, { status: 201 })
}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

// 如果 `OPTIONS` 没有定义, Next.js 会自动实现 `OPTIONS`
export async function OPTIONS(request) { }