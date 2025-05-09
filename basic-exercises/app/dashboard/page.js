
// async function getData() {
//   await new Promise((resolve) => setTimeout(resolve, 3000))
//   return {
//     message: 'Hello, Dashboard!',
//   }
// }

// //关键在于 page.js导出了一个 async 函数,使loading.js生效
// export default async function DashboardPage(props) {
//   const { message } = await getData()
//   return <h1>{message}</h1>
// }


//使用use,dashboard文件夹下的所有路由也能触发loading.js
//如果想针对某个路由单独实现一个loading效果，那就在该路由目录下再写一个loading.js即可
// import { use } from 'react'

// async function getData() {
//   await new Promise((resolve) => setTimeout(resolve, 3000))
//   return {
//     message: 'Hello, Dashboard!',
//   }
// }
// export default function DashboardPage() {
//   const { message } = use(getData())
//   return <h1>{message}</h1>
// }


//触发error.js
"use client";
import React from "react";

export default function Page() {
  const [error, setError] = React.useState(false);

  const handleGetError = () => {
    setError(true);
  };

  return (
    <>{error ? Error() : <button onClick={handleGetError}>Get Error</button>}</>
  );
}
