//如何让完整路由缓存失效?
//重新验证数据：重新验证数据缓存将使完整路由缓存失效，毕竟渲染输出依赖于数据
//重新部署：数据缓存是可以跨部署的，但完整路由缓存会在重新部署中被清除
//服务端使用
//通过 revalidatePath 或 revalidateTag 重新验证数据
//使用 cookies.set 或者 cookies.delete 会使路由缓存失效
//客户端使用
//调用 router.refresh 会使路由缓存失效并发起一个重新获取当前路由的请求

/**
 * Server Actions
 * 从 formData 中获取提交的数据
 *使用 zod 进行数据校验
 *使用 revalidate 更新数据缓存
 *返回合适的信息
 */
"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function saveNote(prevState, formData) {
  // 获取 noteId
  const noteId = formData.get("noteId");
  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  // 模拟请求时间
  await sleep(2000);

  // 更新数据库
  if (noteId) {
    await updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
  } else {
    await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
  }

  return { message: `Add Success!` };
}

export async function deleteNote(prevState, formData) {
  const noteId = formData.get("noteId");
  delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
