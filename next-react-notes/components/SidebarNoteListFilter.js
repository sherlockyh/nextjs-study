"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItem from "@/components/SidebarNoteItem";

export default function SidebarNoteListFilter({ notes }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note } = noteItem;
        const title = String(note?.title ?? "").toLowerCase();
        const matchesSearch =
          !searchText || title.includes(searchText.toLowerCase());

        if (!matchesSearch) {
          return null;
        }

        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={note} />
          </li>
        );
      })}
    </ul>
  );
}
