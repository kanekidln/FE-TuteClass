import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { LessonDetailData, LessonDiscussionItem } from "../../..";

type LessonDetailPopupProps = {
  lesson: LessonDetailData | null;
  onClose: () => void;
};

export function LessonDetailPopup({ lesson, onClose }: LessonDetailPopupProps) {
  const [commentValue, setCommentValue] = useState("");
  const [discussionItems, setDiscussionItems] = useState<LessonDiscussionItem[]>([]);

  useEffect(() => {
    if (!lesson) {
      return;
    }

    setDiscussionItems(lesson.discussion);
  }, [lesson]);

  useEffect(() => {
    if (!lesson) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lesson, onClose]);

  if (!lesson) {
    return null;
  }

  const handleSubmitComment = () => {
    const trimmed = commentValue.trim();

    if (!trimmed) {
      return;
    }

    setDiscussionItems((items) => [
      ...items,
      {
        id: `comment-${Date.now()}`,
        author: "Bạn",
        likes: 0,
        message: trimmed,
        role: "student",
        time: "Vừa xong"
      }
    ]);
    setCommentValue("");
  };

  const modal = (
    <div className="student-lesson-popup-backdrop" onClick={onClose} role="presentation">
      <section
        aria-labelledby="student-lesson-popup-title"
        aria-modal="true"
        className="student-lesson-popup"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Đóng chi tiết buổi học" className="student-lesson-popup-close" onClick={onClose} type="button">
          <svg fill="none" viewBox="0 0 24 24">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        <header className="student-lesson-popup-header">
          <h2 id="student-lesson-popup-title">
            Buổi học {lesson.title} - {lesson.topic}
          </h2>

          <div className="student-lesson-popup-meta">
            <div className="student-lesson-popup-meta-item">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M15 19a4 4 0 1 0-8 0m8 0H7m8 0h4m-4 0a4 4 0 0 1 4-4m-8-7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <span>{lesson.teacher}</span>
            </div>
            <div className="student-lesson-popup-meta-item">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <span>
                {lesson.time} , {lesson.dateLabel}
              </span>
            </div>
            <div className="student-lesson-popup-meta-item">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M3 5h18M5 5h14v10H5zM8 19h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <span>{lesson.location}</span>
            </div>
          </div>
        </header>

        <div className="student-lesson-popup-grid">
          <article className="student-lesson-panel">
            <div className="student-lesson-panel-title student-lesson-panel-title--teal">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M8 4h8m-8 4h8m-8 4h8m-8 4h5M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <h3>Nội dung buổi học</h3>
            </div>
            <ol className="student-lesson-agenda">
              {lesson.agenda.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </article>

          <article className="student-lesson-panel">
            <div className="student-lesson-panel-title student-lesson-panel-title--violet">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="m4 20 4.5-1 9-9a2.1 2.1 0 1 0-3-3l-9 9L4 20Zm0 0h4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <h3>Ghi chú bài học</h3>
            </div>
            <ul className="student-lesson-notes">
              {lesson.lessonNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="student-lesson-popup-grid student-lesson-popup-grid--bottom">
          <article className="student-lesson-panel">
            <div className="student-lesson-panel-title student-lesson-panel-title--indigo">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M8 12h8m-8 4h6M8 8h8m-9 12h10a2 2 0 0 0 2-2V6.8a2 2 0 0 0-.6-1.4l-2.8-2.8A2 2 0 0 0 14.2 2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <h3>Tài liệu đính kèm</h3>
            </div>

            <div className="student-lesson-files">
              {lesson.attachments.map((file) => (
                <div className="student-lesson-file" key={file.id}>
                  <div className={`student-lesson-file-icon student-lesson-file-icon--${file.type}`}>{file.type.toUpperCase()}</div>
                  <div className="student-lesson-file-copy">
                    <strong>{file.name}</strong>
                    <span>{file.size}</span>
                  </div>
                  <button className="student-lesson-file-action" type="button">
                    <svg fill="none" viewBox="0 0 24 24">
                      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className="student-lesson-panel student-lesson-panel--compact">
            <div className="student-lesson-panel-title student-lesson-panel-title--blue">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 7H20M6.5 7A2.5 2.5 0 0 0 4 9.5v10m2.5-12H20v12H6.5A2.5 2.5 0 0 1 4 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <h3>Bài tập liên quan</h3>
            </div>
            <p className="student-lesson-assignment-text">{lesson.assignmentSummary}</p>
            <button className="student-note-button student-note-button--violet student-lesson-cta" type="button">
              Đi tới trang bài tập
            </button>
          </article>

          <article className="student-lesson-panel student-lesson-discussion">
            <div className="student-lesson-panel-title student-lesson-panel-title--coral">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M7 9h10M7 13h7m-9 7 2.5-3H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
              <h3>Trao đổi của buổi học</h3>
            </div>

            <div className="student-lesson-discussion-list">
              {discussionItems.map((item) => (
                <article className="student-lesson-comment" key={item.id}>
                  <div className={`student-lesson-avatar student-lesson-avatar--${item.role}`}>{item.author.slice(0, 2).toUpperCase()}</div>
                  <div className="student-lesson-comment-copy">
                    <div className="student-lesson-comment-meta">
                      <strong>{item.author}</strong>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.message}</p>
                  </div>
                  <div className="student-lesson-comment-like">♡ {item.likes}</div>
                </article>
              ))}
            </div>

            <div className="student-lesson-comment-form">
              <input
                onChange={(event) => setCommentValue(event.target.value)}
                placeholder="Viết bình luận..."
                value={commentValue}
              />
              <button onClick={handleSubmitComment} type="button">
                <svg fill="none" viewBox="0 0 24 24">
                  <path d="m3 20 18-8L3 4l3 8-3 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );

  return createPortal(modal, document.body);
}
