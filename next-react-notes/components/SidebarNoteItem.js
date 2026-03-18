import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

export default function SidebarNoteItem({ noteId, note }) {
  const { title = "", content = "", updateTime } = note ?? {};
  const safeContent = typeof content === "string" ? content : "";

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {safeContent.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
