import { useState } from "react";
import { CreateModal } from "../components/general/CreateModal";
import { announcements, pinnedAnnouncements } from "../components/general/data";
import { DetailDrawer } from "../components/general/DetailDrawer";
import { FilterSidebar } from "../components/general/FilterSidebar";
import { NoticeList } from "../components/general/NoticeList";
import { PageHeader } from "../components/general/PageHeader";
import { PinnedList } from "../components/general/PinnedList";
import type { Announcement } from "../components/general/type";
import "./DiscussionGeneralPage.css";

export default function ClassAnnouncementsPage() {
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <main className="teacher-discussion-page font-sans text-[#14294f]">
      <div className="teacher-discussion-layout grid grid-cols-[230px_minmax(0,1fr)] gap-3">
        <FilterSidebar />

        <section className="teacher-discussion-panel teacher-discussion-main rounded-md border border-[#eadcc6] bg-[#fffaf0]/95 shadow-sm">
          <PageHeader onCreate={() => setIsCreateOpen(true)} />

          <div className="teacher-discussion-main-body p-4">
            <PinnedList items={pinnedAnnouncements} onSelect={setSelectedNotice} />
            <NoticeList items={announcements} onSelect={setSelectedNotice} />
          </div>
        </section>
      </div>

      <DetailDrawer notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      <CreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </main>
  );
}
