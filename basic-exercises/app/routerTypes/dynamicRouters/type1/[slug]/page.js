/*
动态路由
使用动态路由，你需要将文件夹的名字用方括号括住，比如 [id]、[slug]。这个路由的名字会作为 params prop 传给布局、 页面、 路由处理程序 以及 generateMetadata 函数
app/blog 目录下新建一个名为 [slug] 的文件夹
当你访问 /routerTypes/dynamicRouters/type1/a的时候，params 的值为 { slug: 'a' }。
当你访问 /routerTypes/dynamicRouters/type1/b的时候，params 的值为 { slug: 'b' }
*/
import Link from "next/link";
export default function Page({ params }) {
  return (
    <>
      <div>My Post: {params.slug}</div>
      <div>
        <Link href="/">go back Home</Link>
      </div>
    </>
  );
}
