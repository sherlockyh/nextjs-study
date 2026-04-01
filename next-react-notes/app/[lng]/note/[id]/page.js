import Note from "@/components/Note";
import { getNote } from "@/lib/strapi";

export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  // const noteId = params.id;
  // 在 Next.js 15+ 中， params （以及 searchParams ）已经变成了 Promise ，而不再是直接的对象，所以需要await
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  // 为了让 Suspense 的效果更明显
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // await sleep(2000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}
