
/*
命名文件夹的时候，如果你在方括号内添加省略号，比如 [...folderName]，这表示捕获所有后面所有的路由片段
当你访问 /routerTypes/dynamicRouters/type2/a的时候，params 的值为 { slug: ['a'] }。
当你访问 /routerTypes/dynamicRouters/type2/a/b的时候，params 的值为 { slug: ['a', 'b'] }。
当你访问 /routerTypes/dynamicRouters/type2/a/b/c的时候，params 的值为 { slug: ['a', 'b', 'c'] }
*/
import Link from "next/link";
export default function Page({ params }) {
  return (
    <>
      <div>My Shop: {JSON.stringify(params)}</div>
      <div>
        <Link href="/">go back Home</Link>
      </div>
    </>
  );
}