import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Clock3,
  Edit3,
  FileText,
  Heart,
  MessageCircle,
  MoreVertical,
  PenLine,
  Plus,
  Send,
  Smile,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { createTeacherOverviewHash } from "../../../overview/utils/teacherOverviewRoute";
import { createTeacherDocumentsHash } from "../../../documents/utils/teacherDocumentsRoute";
import "./LessonDetailModal.css";

export interface LessonInfo {
  className: string;
  attendance: string;
  studyDate: string;
  studyTime: string;
}

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
}

export interface Exam {
  id: number;
  title: string;
  description: string;
}

export interface CommentItem {
  id: number;
  avatar: string;
  name: string;
  time: string;
  content: string;
  variant: "purple" | "green" | "teacher";
  replies?: CommentItem[];
}

export interface LessonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const lessonInfo: LessonInfo = {
  className: "Web Foundation K12",
  attendance: "29/30 học sinh",
  studyDate: "Thứ 5, 16/05/2024",
  studyTime: "19:00 - 20:30",
};

const initialAssignments: Assignment[] = [
  { id: 1, title: "Tạo trang giới thiệu cá nhân", dueDate: "Hạn nộp: 22:00, 18/05/2024" },
  { id: 2, title: "Thiết kế card khóa học", dueDate: "Hạn nộp: 22:00, 20/05/2024" },
  { id: 3, title: "Xây dựng form đăng ký", dueDate: "Hạn nộp: 22:00, 22/05/2024" },
];

const initialExams: Exam[] = [
  { id: 1, title: "HTML cơ bản", description: "Trắc nghiệm - 15 phút" },
  { id: 2, title: "CSS cơ bản", description: "Trắc nghiệm - 15 phút" },
  { id: 3, title: "Bố cục trang web", description: "Tự luận - 30 phút" },
];

const initialComments: CommentItem[] = [
  {
    id: 1,
    avatar: "NA",
    name: "Nguyễn Văn A",
    time: "19:45, 16/05",
    content: "OOP là gì ?",
    variant: "purple",
    replies: [
      {
        id: 11,
        avatar: "GV",
        name: "Giáo viên",
        time: "19:50, 16/05",
        content:
          "OOP là lập trình hướng đối tượng. 4 tính chất chính là: đóng gói, kế thừa, đa hình và trừu tượng.",
        variant: "teacher",
      },
    ],
  },
  {
    id: 2,
    avatar: "VC",
    name: "Văn C",
    time: "20:10, 16/05",
    content: "Bài này có mấy chương vậy ạ ?",
    variant: "green",
    replies: [
      {
        id: 21,
        avatar: "GV",
        name: "Giáo viên",
        time: "20:15, 16/05",
        content: "Bài này gồm 4 chương chính nhé, và mình sẽ học lần lượt qua các buổi.",
        variant: "teacher",
      },
    ],
  },
];

const descriptionParagraphs = [
  "Buổi học tập trung vào việc giới thiệu cấu trúc cơ bản của một trang web, cách sử dụng HTML để xây dựng nội dung và CSS để định dạng giao diện.",
  "Giáo viên sẽ hướng dẫn học viên phân tích bố cục trang web, tạo các thành phần như header, card, button, form nhập liệu và popup ghi chú.",
  "Sau buổi học, học viên có thể tự xây dựng một giao diện đơn giản, biết cách tổ chức file, đặt tên class hợp lý và áp dụng màu sắc phù hợp với mục đích sử dụng.",
];

const tags = ["HTML", "CSS", "Responsive", "UI Note Style"];

function LessonDetailModal({ isOpen, onClose }: LessonDetailModalProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const addAssignment = () => {
    setAssignments((items) => [
      ...items,
      {
        id: Date.now(),
        title: "Bài tập mẫu mới",
        dueDate: "Hạn nộp: 22:00, 24/05/2024",
      },
    ]);
  };

  const addExam = () => {
    setExams((items) => [
      ...items,
      {
        id: Date.now(),
        title: "Bài kiểm tra mẫu",
        description: "Trắc nghiệm - 10 phút",
      },
    ]);
  };

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = commentValue.trim();

    if (!content) {
      return;
    }

    setComments((items) => [
      ...items,
      {
        id: Date.now(),
        avatar: "ME",
        name: "Bạn",
        time: "Vừa xong",
        content,
        variant: "purple",
      },
    ]);
    setCommentValue("");
  };

  const openClassOverview = () => {
    window.history.replaceState({ returnToLessonDetail: true }, "", "#teacher");
    window.history.pushState(null, "", createTeacherOverviewHash(lessonInfo.className));
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const openSessionDocuments = () => {
    window.history.replaceState({ returnToLessonDetail: true }, "", "#teacher");
    window.history.pushState(null, "", createTeacherDocumentsHash(lessonInfo.className, "sessions"));
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lesson-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.section
            className="lesson-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-detail-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <div className="lesson-paper-tab lesson-paper-tab-left" />
            <div className="lesson-paper-tab lesson-paper-tab-right" />

            <button className="lesson-close-button" type="button" onClick={onClose} aria-label="Đóng">
              <X size={44} strokeWidth={1.9} />
            </button>

            <h2 id="lesson-detail-title">Chi tiết buổi học - Lập trình Web cơ bản</h2>

            <div className="lesson-info-row">
              <InfoCard icon={<Users size={36} />} accent="green" label="Lớp:" value={lessonInfo.className} onClick={openClassOverview} />
              <InfoCard icon={<PenLine size={35} />} accent="purple" label="Điểm danh:" value={lessonInfo.attendance} />
              <InfoCard
                icon={<CalendarDays size={35} />}
                accent="blue"
                label="Ngày học:"
                value={lessonInfo.studyDate}
                actionIcon={<Edit3 size={23} />}
              />
              <InfoCard icon={<Clock3 size={36} />} accent="orange" label="Giờ học:" value={lessonInfo.studyTime} />
            </div>

            <div className="lesson-main-grid">
              <article className="lesson-panel lesson-description-card">
                <PanelTitle icon={<ClipboardList size={38} />} title="Mô tả chi tiết buổi học" />

                <div className="lesson-description-text">
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="lesson-tags" aria-label="Chủ đề buổi học">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>

              <section className="lesson-side-grid">
                <ListPanel
                  title="Bài tập"
                  tone="purple"
                  icon={<BookOpen size={39} />}
                  onAdd={addAssignment}
                  items={assignments}
                  renderItem={(assignment) => (
                    <TaskItem
                      key={assignment.id}
                      iconTone="mint"
                      title={assignment.title}
                      subtitle={assignment.dueDate}
                      onDelete={() => setAssignments((items) => items.filter((item) => item.id !== assignment.id))}
                    />
                  )}
                />

                <ListPanel
                  title="Kiểm tra"
                  tone="red"
                  icon={<CheckSquare size={39} />}
                  onAdd={addExam}
                  items={exams}
                  renderItem={(exam) => (
                    <TaskItem
                      key={exam.id}
                      iconTone="rose"
                      title={exam.title}
                      subtitle={exam.description}
                      onDelete={() => setExams((items) => items.filter((item) => item.id !== exam.id))}
                    />
                  )}
                />
              </section>
            </div>

            <button className="lesson-document-bar" type="button" onClick={openSessionDocuments}>
              <FileText size={36} />
              <strong>Tài liệu</strong>
              <span>12 tài liệu</span>
              <ChevronRight size={42} />
            </button>

            <section className="lesson-panel lesson-comments-card">
              <PanelTitle icon={<MessageCircle size={38} />} title="Bình luận của buổi học" tone="violet" />

              <div className="lesson-comments-list">
                {comments.map((comment) => (
                  <CommentThread key={comment.id} comment={comment} />
                ))}
              </div>

              <form className="lesson-comment-form" onSubmit={submitComment}>
                <div className="lesson-input-wrap">
                  <Smile size={34} />
                  <input
                    value={commentValue}
                    onChange={(event) => setCommentValue(event.target.value)}
                    placeholder="Viết bình luận cho buổi học..."
                  />
                </div>
                <button type="submit">
                  <Send size={27} />
                  Gửi
                </button>
              </form>
            </section>

            <footer className="lesson-footer">
              <span className="footer-doodle footer-doodle-left" />
              <Heart size={25} />
              <strong>Học tập đều đặn - Ghi chú rõ ràng - Quản lý lớp học hiệu quả</strong>
              <Heart size={25} />
              <span className="footer-doodle footer-doodle-right" />
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

interface InfoCardProps {
  icon: ReactNode;
  accent: "green" | "purple" | "blue" | "orange";
  label: string;
  value: string;
  actionIcon?: ReactNode;
  onClick?: () => void;
}

function InfoCard({ icon, accent, label, value, actionIcon, onClick }: InfoCardProps) {
  const content = (
    <>
      <span className="lesson-info-icon">{icon}</span>
      <span>{label}</span>
      <strong>{value}</strong>
      {actionIcon && (
        <button type="button" className="lesson-mini-edit" aria-label="Sá»­a ngÃ y há»c">
          {actionIcon}
        </button>
      )}
    </>
  );

  if (onClick) {
    return (
      <motion.button
        className={`lesson-info-card lesson-info-card-button ${accent}`}
        type="button"
        onClick={onClick}
        whileHover={{ y: -3 }}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.article className={`lesson-info-card ${accent}`} whileHover={{ y: -3 }}>
      <span className="lesson-info-icon">{icon}</span>
      <span>{label}</span>
      <strong>{value}</strong>
      {actionIcon && (
        <button type="button" className="lesson-mini-edit" aria-label="Sửa ngày học">
          {actionIcon}
        </button>
      )}
    </motion.article>
  );
}

interface PanelTitleProps {
  icon: ReactNode;
  title: string;
  tone?: "violet";
}

function PanelTitle({ icon, title, tone }: PanelTitleProps) {
  return (
    <div className={`lesson-panel-title ${tone ?? ""}`}>
      <span>{icon}</span>
      <h3>{title}</h3>
    </div>
  );
}

interface ListPanelProps<T> {
  title: string;
  tone: "purple" | "red";
  icon: ReactNode;
  onAdd: () => void;
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function ListPanel<T>({ title, tone, icon, onAdd, items, renderItem }: ListPanelProps<T>) {
  return (
    <article className="lesson-panel lesson-list-panel">
      <div className={`lesson-panel-title lesson-list-title ${tone}`}>
        <div>
          <span>{icon}</span>
          <h3>{title}</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="lesson-add-button"
          type="button"
          onClick={onAdd}
          aria-label={`Thêm ${title.toLowerCase()}`}
        >
          <Plus size={31} />
        </motion.button>
      </div>

      <div className="lesson-task-list">{items.map(renderItem)}</div>
    </article>
  );
}

interface TaskItemProps {
  iconTone: "mint" | "rose";
  title: string;
  subtitle: string;
  onDelete: () => void;
}

function TaskItem({ iconTone, title, subtitle, onDelete }: TaskItemProps) {
  return (
    <motion.article className="lesson-task-item" whileHover={{ x: 3, y: -2 }}>
      <FileText className={`lesson-task-doc ${iconTone}`} size={42} strokeWidth={2.25} />
      <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      <button type="button" onClick={onDelete} aria-label={`Xóa ${title}`}>
        <Trash2 size={25} />
      </button>
    </motion.article>
  );
}

interface CommentThreadProps {
  comment: CommentItem;
}

function CommentThread({ comment }: CommentThreadProps) {
  return (
    <article className="lesson-comment">
      <Avatar label={comment.avatar} variant={comment.variant} />
      <div className="lesson-comment-content">
        <CommentText comment={comment} />

        {comment.replies?.map((reply) => (
          <article className="lesson-reply" key={reply.id}>
            <Avatar label={reply.avatar} variant={reply.variant} />
            <div>
              <CommentText comment={reply} hideReply />
            </div>
            <button className="lesson-more-button" type="button" aria-label="Tùy chọn trả lời">
              <MoreVertical size={29} />
            </button>
          </article>
        ))}
      </div>
      <button className="lesson-more-button" type="button" aria-label="Tùy chọn bình luận">
        <MoreVertical size={29} />
      </button>
    </article>
  );
}

interface AvatarProps {
  label: string;
  variant: CommentItem["variant"];
}

function Avatar({ label, variant }: AvatarProps) {
  return <div className={`lesson-avatar ${variant}`}>{label}</div>;
}

interface CommentTextProps {
  comment: CommentItem;
  hideReply?: boolean;
}

function CommentText({ comment, hideReply }: CommentTextProps) {
  return (
    <>
      <div className="lesson-comment-meta">
        <strong>{comment.name}</strong>
        <span>{comment.time}</span>
      </div>
      <p>{comment.content}</p>
      {!hideReply && (
        <button className="lesson-reply-link" type="button">
          Trả lời
        </button>
      )}
    </>
  );
}

export default LessonDetailModal;
