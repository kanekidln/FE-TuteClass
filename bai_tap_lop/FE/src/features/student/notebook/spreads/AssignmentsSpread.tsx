import { useMemo, useState } from "react";
import type { AssignmentItem, AssignmentStatus, AssignmentsSpreadData } from "..";
import { SpreadHeader } from "./SpreadHeader";
import "./spreads.css";
import "./assignmentsSpread.css";

type AssignmentsSpreadProps = {
  data: AssignmentsSpreadData;
};

type AssignmentView = "list" | "result" | "work";
type AssignmentListTab = "list" | "scores";

const statusLabels: Record<AssignmentStatus, string> = {
  graded: "Đã chấm",
  "in-progress": "Đang làm",
  "not-started": "Chưa làm",
  submitted: "Đã nộp"
};

function getActionLabel(item: AssignmentItem) {
  if (item.status === "in-progress") {
    return "Tiếp tục";
  }

  if (item.status === "submitted" || item.status === "graded") {
    return "Xem kết quả";
  }

  return "Làm bài";
}

function getScoreBreakdown(item: AssignmentItem) {
  if (item.status === "graded") {
    return {
      essayComment: "Lời giải rõ ràng, trình bày sạch sẽ. Cần chú ý dấu ở bước biến đổi cuối.",
      essayScore: "3.0 / 3",
      quizCorrect: 9,
      quizScore: "6.0 / 7",
      totalScore: item.score ?? "9 / 10"
    };
  }

  return {
    essayComment: "Giáo viên đang chấm phần tự luận, điểm chi tiết sẽ được cập nhật sau.",
    essayScore: "Chờ chấm",
    quizCorrect: 17,
    quizScore: "6.5 / 7",
    totalScore: item.score ?? "Chờ chấm"
  };
}

function AssignmentNotes({ data, mode }: { data: AssignmentsSpreadData; mode: AssignmentView }) {
  if (mode === "result") {
    return (
      <aside className="assignments-side-column assignments-side-column--result">
        <section className="assignment-note assignment-note--yellow">
          <div className="assignment-note-pin" aria-hidden="true" />
          <h3>Tóm tắt kết quả</h3>
          <div className="assignment-result-side-score">8.5 / 10</div>
          <p>Bài tập đã hoàn thành và được lưu trong sổ để xem lại.</p>
        </section>
        <section className="assignment-note assignment-note--green">
          <div className="assignment-note-pin" aria-hidden="true" />
          <h3>Nhận xét giáo viên</h3>
          <ul className="assignment-note-checks">
            <li>Bài làm rõ ràng, trình bày sạch sẽ.</li>
            <li>Lời giải đầy đủ và 2 phần tốt.</li>
            <li>Cần chú ý dấu ở bước biến đổi cuối.</li>
          </ul>
          <span className="assignment-note-smile">:)</span>
        </section>
      </aside>
    );
  }

  if (mode === "work") {
    return (
      <aside className="assignments-side-column assignments-side-column--work">
        <section className="assignment-note assignment-note--yellow">
          <div className="assignment-note-pin" aria-hidden="true" />
          <h3>Thời gian còn lại</h3>
          <div className="assignment-timer">00:32:18</div>
          <p>Bài làm sẽ tự động nộp khi hết giờ.</p>
        </section>
        <section className="assignment-note assignment-note--yellow">
          <div className="assignment-note-pin" aria-hidden="true" />
          <h3>Tiến độ làm bài</h3>
          <div className="assignment-progress-count">
            <strong>5</strong>
            <span>/ 20 câu</span>
          </div>
          <div className="assignment-progress-track">
            <span style={{ width: "34%" }} />
          </div>
          <p>Bạn đã trả lời 5 câu hỏi.</p>
        </section>
        <section className="assignment-note assignment-note--green">
          <div className="assignment-note-pin" aria-hidden="true" />
          <h3>Lưu ý</h3>
          <ul className="assignment-note-checks">
            <li>Chọn 1 đáp án đúng nhất cho mỗi câu.</li>
            <li>Bạn có thể chuyển câu và quay lại.</li>
            <li>Phần tự luận có thể nhập trực tiếp hoặc đính kèm tệp.</li>
            <li>Kiểm tra kỹ trước khi nộp bài.</li>
          </ul>
          <span className="assignment-note-smile">:)</span>
        </section>
      </aside>
    );
  }

  return (
    <aside className="assignments-side-column">
      {data.notes.map((note) => (
        <section className={`assignment-note assignment-note--${note.tone}`} key={note.id}>
          <div className="assignment-note-pin" aria-hidden="true" />
          <h3>{note.title}</h3>
          {note.items ? (
            <ul className="assignment-note-list">
              {note.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {note.text ? <p>{note.text}</p> : null}
          {note.stats ? (
            <div className="assignment-stats">
              <div className="assignment-donut">
                <span>68%</span>
              </div>
              <div className="assignment-stat-list">
                {note.stats.map((stat) => (
                  <div className="assignment-stat-row" key={stat.id}>
                    <i className={`assignment-stat-dot assignment-stat-dot--${stat.color}`} />
                    <span>{stat.label}:</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {note.id === "completion" ? <button className="assignment-note-link" type="button">Xem chi tiết →</button> : null}
          {note.tone === "yellow" ? <span className="assignment-note-smile">:)</span> : null}
        </section>
      ))}
    </aside>
  );
}

export function AssignmentsSpread({ data }: AssignmentsSpreadProps) {
  const [view, setView] = useState<AssignmentView>("list");
  const [activeTab, setActiveTab] = useState<AssignmentListTab>("list");
  const [selectedId, setSelectedId] = useState(data.items[0]?.id ?? "");
  const [answers, setAnswers] = useState<Record<string, string>>({ q1: "a" });

  const selectedAssignment = useMemo(
    () => data.items.find((item) => item.id === selectedId) ?? data.items[0],
    [data.items, selectedId]
  );
  const scoredAssignments = useMemo(
    () => data.items.filter((item) => item.status === "submitted" || item.status === "graded"),
    [data.items]
  );

  const openAssignment = (item: AssignmentItem) => {
    setSelectedId(item.id);
    setView("work");
  };
  const openResult = (item: AssignmentItem) => {
    setSelectedId(item.id);
    setView("result");
  };

  const resultBreakdown = getScoreBreakdown(selectedAssignment);
  const title = view === "work" || view === "result" ? "Làm bài tập lớp" : data.heading;
  const subtitle =
    view === "work"
      ? "Làm bài trắc nghiệm, hoàn thành phần tự luận và nộp bài để giáo viên chấm."
      : view === "result"
        ? "Xem lại bài tập đã hoàn thành, điểm từng phần và nhận xét của giáo viên."
      : data.subtitle;

  return (
    <div className={`assignments-spread-shell assignments-spread-shell--${view}`}>
      <SpreadHeader accent={data.accent} subtitle={subtitle} title={title} />

      <div className="assignments-spread-layout">
        {view === "list" ? (
          <main className="assignments-main-panel notebook-section-card">
            <div className="assignment-tabs">
              <button className={`assignment-tab ${activeTab === "list" ? "is-active" : ""}`} onClick={() => setActiveTab("list")} type="button">
                Danh sách bài tập
              </button>
              <button className={`assignment-tab ${activeTab === "scores" ? "is-active" : ""}`} onClick={() => setActiveTab("scores")} type="button">
                Xem điểm
              </button>
            </div>
            {activeTab === "list" ? (
              <>
                <div className="assignment-filter-row">
                  <button className="assignment-filter is-active" type="button">Xem theo từng buổi</button>
                  <button className="assignment-filter" type="button">Bài trắc nghiệm</button>
                  <button className="assignment-filter" type="button">Bài tự luận</button>
                  <button className="assignment-filter" type="button">Đã nộp</button>
                  <button className="assignment-filter" type="button">Tất cả trạng thái</button>
                </div>

                <div className="assignment-table">
                  <div className="assignment-table-head">
                    <span>Tên bài tập</span>
                    <span>Buổi/Chủ đề</span>
                    <span>Hạn nộp</span>
                    <span>Thời lượng</span>
                    <span>Số câu</span>
                    <span>Trạng thái</span>
                    <span>Thao tác</span>
                  </div>
                  <div className="assignment-table-body">
                    {data.items.map((item) => (
                      <article className="assignment-row" key={item.id}>
                        <div className="assignment-title-cell">
                          <span className={`assignment-type-icon assignment-type-icon--${item.status}`}>{item.icon}</span>
                          <strong>{item.title}</strong>
                        </div>
                        <div>
                          <strong>{item.lesson}</strong>
                          <span>{item.topic}</span>
                        </div>
                        <div className="assignment-deadline">{item.deadline}</div>
                        <div>{item.duration}</div>
                        <div>{item.questionsCount}</div>
                        <div>
                          <span className={`assignment-status assignment-status--${item.status}`}>{statusLabels[item.status]}</span>
                        </div>
                        <div>
                          <button className="assignment-action" onClick={() => openAssignment(item)} type="button">
                            {getActionLabel(item)}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="assignment-score-summary">
                  <div>
                    <span>Bài đã nộp</span>
                    <strong>{scoredAssignments.length}</strong>
                  </div>
                  <div>
                    <span>Điểm trung bình</span>
                    <strong>8.7</strong>
                  </div>
                  <div>
                    <span>Nhận xét mới</span>
                    <strong>2</strong>
                  </div>
                </div>

                <div className="assignment-table assignment-score-table">
                  <div className="assignment-table-head assignment-score-head">
                    <span>Tên bài tập</span>
                    <span>Ngày nộp</span>
                    <span>Trạng thái</span>
                    <span>Điểm</span>
                    <span>Nhận xét</span>
                    <span>Thao tác</span>
                  </div>
                  <div className="assignment-table-body">
                    {scoredAssignments.map((item, index) => (
                      <article className="assignment-row assignment-score-row" key={item.id}>
                        <div className="assignment-title-cell">
                          <span className={`assignment-type-icon assignment-type-icon--${item.status}`}>{item.icon}</span>
                          <strong>{item.title}</strong>
                        </div>
                        <div>{index === 0 ? "22/05/2024 19:45" : "30/05/2024 20:10"}</div>
                        <div>
                          <span className={`assignment-status assignment-status--${item.status}`}>{statusLabels[item.status]}</span>
                        </div>
                        <div className="assignment-score-value">{item.score ?? "Chờ chấm"}</div>
                        <div>
                          <span>{item.status === "graded" ? "Lời giải rõ, trình bày tốt." : "Đang chờ giáo viên chấm."}</span>
                        </div>
                        <div>
                          <button className="assignment-action" onClick={() => openResult(item)} type="button">
                            Xem chi tiết
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <p className="assignment-helper">Xem lại điểm, trạng thái chấm bài và nhận xét của giáo viên cho các bài đã nộp.</p>
              </>
            )}
          </main>
        ) : view === "work" ? (
          <main className="assignments-main-panel assignments-work-panel notebook-section-card">
            <div className="assignment-work-tabs">
              <button className="assignment-tab" onClick={() => setView("list")} type="button">
                Danh sách bài tập
              </button>
              <button className="assignment-tab is-active" type="button">
                Làm bài trắc nghiệm
              </button>
              <button className="assignment-tab" onClick={() => setView("result")} type="button">
                Kết quả
              </button>
            </div>

            <section className="assignment-work-hero">
              <span className="assignment-type-icon assignment-type-icon--in-progress">{selectedAssignment.icon}</span>
              <div>
                <h2>{selectedAssignment.title}</h2>
                <div className="assignment-work-meta">
                  <span>Môn: {selectedAssignment.subject}</span>
                  <span>Hạn nộp: {selectedAssignment.deadline}</span>
                  <span>Thời gian: {selectedAssignment.duration}</span>
                  <strong>Đang làm</strong>
                </div>
              </div>
            </section>

            <div className="assignment-work-scroll">
              <section className="assignment-question-list">
                {data.questions.map((question, index) => (
                  <article className="assignment-question" key={question.id}>
                    <h3>Câu {index + 1}. <span>{question.prompt}</span></h3>
                    <div className="assignment-options">
                      {question.options.map((option) => (
                        <label className={`assignment-option ${answers[question.id] === option.id ? "is-selected" : ""}`} key={option.id}>
                          <input
                            checked={answers[question.id] === option.id}
                            name={question.id}
                            onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                            type="radio"
                          />
                          <strong>{option.label}.</strong>
                          <span>{option.text}</span>
                        </label>
                      ))}
                    </div>
                  </article>
                ))}
              </section>

              <section className="assignment-essay-box">
                <h3>Phần tự luận nộp kèm</h3>
                <p>Trình bày lời giải chi tiết hoặc tải file bài làm để giáo viên chấm.</p>
                <div className="assignment-prompt-card">
                  <div className="assignment-prompt-header">
                    <div>
                      <span>Đề bài giáo viên giao</span>
                      <h3>{data.assignmentPrompt.title}</h3>
                    </div>
                    <span className={`assignment-prompt-source assignment-prompt-source--${data.assignmentPrompt.source}`}>
                      {data.assignmentPrompt.source === "uploaded-file" ? "File giáo viên upload" : "Giáo viên nhập đề"}
                    </span>
                  </div>

                  {data.assignmentPrompt.file ? (
                    <div className="assignment-prompt-file">
                      <span className={`assignment-file-badge assignment-file-badge--${data.assignmentPrompt.file.type}`}>
                        {data.assignmentPrompt.file.type.toUpperCase()}
                      </span>
                      <strong>{data.assignmentPrompt.file.name}</strong>
                      <span>{data.assignmentPrompt.file.size}</span>
                    </div>
                  ) : null}

                  <div className="assignment-prompt-body">
                    {data.assignmentPrompt.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="assignment-submission-grid">
                  <div className="assignment-upload-zone">
                    <strong>Kéo thả tệp vào đây</strong>
                    <span>hoặc</span>
                    <button type="button">Chọn tệp</button>
                    <small>Hỗ trợ: PDF, DOCX, PPTX, JPG, PNG. Dung lượng tối đa: 20MB</small>
                  </div>
                  <div className="assignment-or">HOẶC</div>
                  <textarea placeholder="Nhập câu trả lời tự luận của bạn vào đây..." />
                </div>
                <div className="assignment-file-list">
                  {data.submissionFiles.map((file) => (
                    <div className="assignment-file-row" key={file.id}>
                      <span className={`assignment-file-badge assignment-file-badge--${file.type}`}>{file.type.toUpperCase()}</span>
                      <strong>{file.name}</strong>
                      <span>{file.size}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="assignment-work-actions">
              <button className="assignment-save" type="button">Lưu tạm</button>
              <button className="assignment-continue" type="button">Tiếp tục làm bài</button>
              <button className="assignment-submit" type="button">Nộp bài</button>
            </div>
          </main>
        ) : (
          <main className="assignments-main-panel assignments-result-panel notebook-section-card">
            <div className="assignment-work-tabs">
              <button className="assignment-tab" onClick={() => setView("list")} type="button">
                Danh sách bài tập
              </button>
              <button className="assignment-tab" onClick={() => setView("work")} type="button">
                Làm bài trắc nghiệm
              </button>
              <button className="assignment-tab is-active" type="button">
                Kết quả
              </button>
            </div>

            <section className="assignment-work-hero assignment-result-hero">
              <span className={`assignment-type-icon assignment-type-icon--${selectedAssignment.status}`}>{selectedAssignment.icon}</span>
              <div>
                <h2>{selectedAssignment.title}</h2>
                <div className="assignment-work-meta">
                  <span>Môn: {selectedAssignment.subject}</span>
                  <span>Ngày nộp: 22/05/2024 19:45</span>
                  <span>Trạng thái: {statusLabels[selectedAssignment.status]}</span>
                  <strong>Hoàn thành</strong>
                </div>
              </div>
            </section>

            <div className="assignment-result-grid">
              <section className="assignment-result-card assignment-result-card--score">
                <span>Điểm tổng</span>
                <strong>{resultBreakdown.totalScore}</strong>
                <p>Bài tập đã hoàn thành và được giáo viên ghi nhận.</p>
              </section>
              <section className="assignment-result-card">
                <span>Trắc nghiệm</span>
                <strong>{resultBreakdown.quizCorrect} / {selectedAssignment.questionsCount} câu đúng</strong>
                <p>Điểm phần trắc nghiệm: {resultBreakdown.quizScore}</p>
              </section>
              <section className="assignment-result-card">
                <span>Tự luận</span>
                <strong>{resultBreakdown.essayScore}</strong>
                <p>Điểm phần tự luận do giáo viên chấm.</p>
              </section>
            </div>

            <section className="assignment-result-feedback">
              <h3>Đánh giá của giáo viên</h3>
              <p>{resultBreakdown.essayComment}</p>
              <div className="assignment-result-review">
                <div>
                  <span>File bài nộp</span>
                  <strong>{data.submissionFiles[0]?.name}</strong>
                </div>
                <div>
                  <span>Trạng thái chấm</span>
                  <strong>{selectedAssignment.status === "graded" ? "Đã chấm xong" : "Đang chấm tự luận"}</strong>
                </div>
              </div>
            </section>

            <div className="assignment-result-actions">
              <button className="assignment-continue" onClick={() => setView("list")} type="button">Quay lại danh sách</button>
              <button className="assignment-submit" onClick={() => setView("work")} type="button">Xem bài làm</button>
            </div>
          </main>
        )}

        <AssignmentNotes data={data} mode={view} />
      </div>

      <footer className="assignments-footer">
        <span>{view === "list" ? data.footerLeft : view === "result" ? "Kết quả chi tiết gồm điểm tổng, trắc nghiệm đúng/tổng và điểm tự luận giáo viên chấm." : "Lưu ý: Bài làm sẽ tự động được lưu khi bạn chuyển câu hoặc thoát trang."}</span>
        <span>{data.footerRight}</span>
      </footer>
    </div>
  );
}
