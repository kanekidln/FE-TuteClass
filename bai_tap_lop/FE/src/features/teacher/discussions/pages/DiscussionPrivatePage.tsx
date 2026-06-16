import { useState } from "react";
import { ChatPanel } from "../components/private/ChatPanel";
import { PrivateHeader } from "../components/private/PrivateHeader";
import { PrivateSidebar } from "../components/private/PrivateSidebar";
import { SupportPanel } from "../components/private/SupportPanel";
import type { SupportTab } from "../components/private/type";
import "./DiscussionGeneralPage.css";

export default function TeacherPrivateDiscussionPage() {
  const [activeTab, setActiveTab] = useState<SupportTab>("info");
  const [needsFollowUp, setNeedsFollowUp] = useState(true);
  const activeConversationStatus = needsFollowUp ? "Cần theo dõi" : "Hoàn tất";

  return (
    <main className="teacher-discussion-page font-sans text-[#14294f]">
      <div className="teacher-private-layout teacher-discussion-layout grid grid-cols-[280px_minmax(0,1fr)] gap-2">
        <PrivateSidebar activeConversationStatus={activeConversationStatus} />

        <section className="teacher-discussion-panel teacher-discussion-main rounded-md border border-[#eadcc6] bg-[#fffaf0]/95 shadow-sm">
          <PrivateHeader />

          <div className="teacher-private-chat-body grid min-h-0 flex-1 grid-cols-[minmax(390px,1fr)_275px] gap-2 p-3">
            <ChatPanel needsFollowUp={needsFollowUp} onToggleFollowUp={() => setNeedsFollowUp((current) => !current)} />
            <SupportPanel activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>
        </section>
      </div>
    </main>
  );
}
