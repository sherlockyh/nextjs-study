'use client'
/*global-error.js会包裹整个应用，而且当它触发的时候，它会替换掉根布局的内容。所以，global-error.js 中也要定义 <html> 和 <body> 标签*/

//app文件夹下也是需要error.js的，注意区别

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
