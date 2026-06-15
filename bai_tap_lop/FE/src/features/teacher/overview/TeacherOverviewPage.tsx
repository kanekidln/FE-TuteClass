import { ArrowLeft, CircleCheck, UserRound } from "lucide-react";
import clsx from "clsx";
import StatStickyNote from "./components/StatStickyNote";
import PaperCard from "./components/PaperCard";
import PushPin from "./components/PushPin";
import Tape from "./components/Tape";
import PaperClip from "./components/PaperClip";
import NotebookHoles from "./components/NotebookHoles";
import DoodleIcon from "./components/DoodleIcon";
import {
  additionalNotes,
  classroomStatuses,
  teacherNotes,
  teacherOverviewStats,
  weeklyTodos,
} from "./constants/teacherOverview.constants";
import type { TeacherOverviewPageProps } from "./types/teacherOverview.types";
import "./teacherOverview.css";

function TeacherOverviewPage({ classId, className }: TeacherOverviewPageProps) {
  const goBackToLessonDetail = () => {
    window.history.back();
  };

  return (
    <main className="teacher-overview-page" data-class-id={classId}>
      <nav className="overview-breadcrumb" aria-label="Breadcrumb">
        <span>Quản lý lớp học</span>
        <b>&gt;</b>
        <span>{className}</span>
        <b>&gt;</b>
        <span>Tổng quan lớp</span>
      </nav>

      <button className="overview-back-button" type="button" onClick={goBackToLessonDetail}>
        <ArrowLeft size={22} />
        Quay lại buổi học
      </button>

      <section className="overview-stat-grid" aria-label="Thống kê lớp">
        {teacherOverviewStats.map((stat) => (
          <StatStickyNote key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="overview-main-grid">
        <PaperCard className="teacher-notes-card" variant="lined">
          <Tape className="notes-corner-tape" />
          <PushPin className="notes-pin" />
          <DoodleIcon name="lightbulb" className="notes-bulb" />
          <h2>3. Ghi chú của giáo viên</h2>
          <ul>
            {teacherNotes.map((note) => (
              <li key={note.id}>{note.content}</li>
            ))}
          </ul>
        </PaperCard>

        <PaperCard className="classroom-status-card" variant="notebook">
          <NotebookHoles />
          <PaperClip className="status-clip" />
          <h2>2. Tình trạng lớp học</h2>
          <div className="status-card-grid">
            {classroomStatuses.map((item) => (
              <section className={clsx("status-mini-note", `status-${item.tone}`)} key={item.id}>
                <h3>{item.title}</h3>
                {item.tone === "yellow" ? <UserRound aria-hidden="true" /> : <CircleCheck aria-hidden="true" />}
                <strong>{item.value}</strong>
                <span>{item.percent}</span>
              </section>
            ))}
          </div>
        </PaperCard>

        <PaperCard className="todo-card" variant="notebook">
          <span className="overview-binder-clip" aria-hidden="true">
            <i />
          </span>
          <DoodleIcon name="pencil" className="todo-pencil" />
          <h2>4. Todo tuần này</h2>
          <ul className="todo-list">
            {weeklyTodos.map((todo) => (
              <li className={clsx(todo.completed && "is-complete")} key={todo.id}>
                <span aria-hidden="true" />
                {todo.label}
              </li>
            ))}
          </ul>
        </PaperCard>
      </section>

      <section className="overview-bottom-grid" aria-label="Ghi chú thêm">
        <PaperCard className="additional-note-card extra-note-left" variant="lined">
          <PushPin className="extra-pin" />
          <DoodleIcon name="pencil" className="extra-pencil" />
          <DoodleIcon name="leaf" className="extra-leaf" />
          <h2>{additionalNotes[0].content}</h2>
        </PaperCard>

        <PaperCard className="additional-note-card extra-note-right" variant="rough">
          <Tape variant="stripe" className="extra-stripe-tape" />
          <Tape variant="kraft" className="extra-kraft-tape" />
          <PaperClip color="gold" className="extra-clip" />
          <DoodleIcon name="leaf" className="blank-leaf" />
          <span className="blank-note-copy">{additionalNotes[1].content}</span>
        </PaperCard>
      </section>
    </main>
  );
}

export default TeacherOverviewPage;
