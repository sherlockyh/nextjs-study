import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import { unstable_noStore as noStore } from "next/cache";
import { getAllNotes } from "@/lib/strapi";

export default async function NoteList() {
  noStore();
  console.log("[SidebarNoteList] getAllNotes called");
  const notes = await getAllNotes();
  const noteItems = Object.entries(notes).map(([noteId, note]) => ({
    noteId,
    note: JSON.parse(note),
  }));

  if (noteItems.length === 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return <SidebarNoteListFilter notes={noteItems} />;
}
