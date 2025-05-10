import Link from "next/link";

/*
在命名文件夹的时候，如果你在双方括号内添加省略号，比如 [[...folderName]]，这表示可选的捕获所有后面所有的路由片段
与单方括号的区别就是不带参数的路由也会被匹配（就比如 /routerTypes/dynamicRouters/）
当你访问 /routerTypes/dynamicRouters/type3/的时候，params 的值为 {}。
当你访问 /routerTypes/dynamicRouters/type3/a的时候，params 的值为 { slug: ['a'] }。
当你访问 /routerTypes/dynamicRouters/type3/a/b的时候，params 的值为 { slug: ['a', 'b'] }。
当你访问 /routerTypes/dynamicRouters/type3/a/b/c的时候，params 的值为 { slug: ['a', 'b', 'c'] }
*/
export default function Page({ params }) {
  return (
    <>
      <div>My Shop: {JSON.stringify(params)}</div>{" "}
      <div>
        <Link href="/">go back Home</Link>
      </div>
    </>
  );
}
