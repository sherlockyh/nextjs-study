import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import { getAllNotes } from "@/lib/redis";

export default async function NoteList() {
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
