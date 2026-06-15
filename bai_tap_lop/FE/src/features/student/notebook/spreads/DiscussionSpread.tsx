import { useMemo, useState } from "react";
import type { DiscussionMessage, DiscussionSpreadData } from "..";
import { SpreadHeader } from "./SpreadHeader";
import "./spreads.css";
import "./discussionSpread.css";

type DiscussionSpreadProps = {
  data: DiscussionSpreadData;
};

type DiscussionTabKey = "class" | "teacher";

function getFileToneClass(type: string) {
  if (type === "pdf") {
    return "discussion-file-icon--pdf";
  }

  if (type === "doc") {
    return "discussion-file-icon--doc";
  }

  return "discussion-file-icon--xls";
}

export function DiscussionSpread({ data }: DiscussionSpreadProps) {
  const [activeTab, setActiveTab] = useState<DiscussionTabKey>("class");
  const [classFeed, setClassFeed] = useState<DiscussionMessage[]>(data.classFeed);
  const [teacherFeed, setTeacherFeed] = useState<DiscussionMessage[]>(data.teacherFeed);
  const [draft, setDraft] = useState("");

  const activeFeed = useMemo(
    () => (activeTab === "class" ? classFeed : teacherFeed),
    [activeTab, classFeed, teacherFeed]
  );

  const handleSend = () => {
    const message = draft.trim();

    if (!message) {
      return;
    }

    const newItem: DiscussionMessage = {
      id: `discussion-${Date.now()}`,
      author: "Minh Anh",
      likes: 0,
      message,
      role: "student",
      time: "Vừa xong"
    };

    if (activeTab === "class") {
      setClassFeed((items) => [...items, newItem]);
    } else {
      setTeacherFeed((items) => [...items, newItem]);
    }

    setDraft("");
  };

  return (
    <div className="discussion-spread-shell">
      <SpreadHeader accent={data.accent} subtitle={data.subtitle} title={data.heading} />

      <div className="discussion-spread-layout">
        <div className="discussion-main-column">
          <div className="discussion-tabs-shell" aria-label="Loại ghi chú">
            <button
              className={`discussion-tab discussion-tab--class ${activeTab === "class" ? "is-active" : ""}`}
              onClick={() => setActiveTab("class")}
              type="button"
            >
              <span>{data.classTabLabel}</span>
            </button>
            <button
              className={`discussion-tab discussion-tab--teacher ${activeTab === "teacher" ? "is-active" : ""}`}
              onClick={() => setActiveTab("teacher")}
              type="button"
            >
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M15 19a4 4 0 1 0-8 0m8 0H7m8 0h4m-4 0a4 4 0 0 1 4-4m-8-7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <span>{data.teacherTabLabel}</span>
            </button>
          </div>

          <section className="discussion-chat-panel notebook-section-card">
            <div className="discussion-chat-feed">
              {activeFeed.map((item) => (
                <article className={`discussion-message discussion-message--${item.role}`} key={item.id}>
                  <div className={`discussion-avatar discussion-avatar--${item.role}`}>{item.author.slice(0, 2).toUpperCase()}</div>
                  <div className="discussion-message-body">
                    <div className="discussion-message-meta">
                      <strong>{item.author}</strong>
                      <span>{item.time}</span>
                    </div>
                    <div className={`discussion-bubble discussion-bubble--${item.role}`}>
                      <p>{item.message}</p>
                      {item.likes > 0 ? <span className="discussion-bubble-likes">👍 {item.likes}</span> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="discussion-input-row">
              <input onChange={(event) => setDraft(event.target.value)} placeholder="Nhập tin nhắn..." value={draft} />
              <button aria-label="Đính kèm tệp" className="discussion-input-icon" type="button">
                <svg fill="none" viewBox="0 0 24 24">
                  <path d="m8 12 5.2-5.2a3 3 0 1 1 4.2 4.2L9.6 18.8a5 5 0 1 1-7.1-7.1l8.5-8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </button>
              <button aria-label="Biểu cảm" className="discussion-input-icon" type="button">
                <svg fill="none" viewBox="0 0 24 24">
                  <path d="M8 14s1.5 2 4 2 4-2 4-2m-6-5h.01M14 9h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </button>
              <button aria-label="Gửi tin nhắn" className="discussion-send-button" onClick={handleSend} type="button">
                <svg fill="none" viewBox="0 0 24 24">
                  <path d="m3 20 18-8L3 4l3 8-3 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </button>
            </div>
          </section>
        </div>

        <aside className="discussion-side-column">
          <section className="discussion-side-note discussion-side-note--pin">
            <div className="discussion-side-pin" aria-hidden="true" />
            <div className="discussion-side-title discussion-side-title--teal">
              <span>{data.pinnedTitle}</span>
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M8 4h8m-2 0v6l4 4-2 2-4-4H8l-2 2 4 4-2 2-4-4-2 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </div>
            <div className="discussion-pinned-list">
              {data.pinnedItems.map((item) => (
                <div className="discussion-pinned-item" key={item.id}>
                  <span className="discussion-pinned-check" aria-hidden="true" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="discussion-note-smile" aria-hidden="true">
              :)
            </div>
          </section>

          <section className="discussion-side-note discussion-side-note--files">
            <div className="discussion-side-pin" aria-hidden="true" />
            <div className="discussion-side-title discussion-side-title--violet">
              <span>Tệp đã chia sẻ</span>
              <svg fill="none" viewBox="0 0 24 24">
                <path d="m8 12 5.2-5.2a3 3 0 1 1 4.2 4.2L9.6 18.8a5 5 0 1 1-7.1-7.1l8.5-8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </div>
            <div className="discussion-files-list">
              {data.sharedFiles.map((file) => (
                <div className="discussion-file-row" key={file.id}>
                  <div className={`discussion-file-icon ${getFileToneClass(file.type)}`}>{file.type.toUpperCase()}</div>
                  <div className="discussion-file-copy">
                    <strong>{file.name}</strong>
                    <span>{file.meta}</span>
                  </div>
                  <button aria-label={`Tải ${file.name}`} className="discussion-file-download" type="button">
                    <svg fill="none" viewBox="0 0 24 24">
                      <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button className="discussion-view-all" type="button">
              Xem tất cả tệp
              <svg fill="none" viewBox="0 0 24 24">
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
