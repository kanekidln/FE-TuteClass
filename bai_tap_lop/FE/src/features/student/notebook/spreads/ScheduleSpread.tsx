import { useState } from "react";
import type { LessonAttachment, LessonDetailData, ScheduleEvent, ScheduleSpreadData, UpcomingSession } from "..";
import { MiniCalendar } from "../pages/SchedulePage/components/MiniCalendar";
import { LessonDetailPopup } from "../pages/SchedulePage/components/LessonDetailPopup";
import { ReminderNote } from "../pages/SchedulePage/components/ReminderNote";
import { ScheduleHeader } from "../pages/SchedulePage/components/ScheduleHeader";
import { TodayAgenda } from "../pages/SchedulePage/components/TodayAgenda";
import { UpcomingSessions } from "../pages/SchedulePage/components/UpcomingSessions";
import { WeeklySchedule } from "../pages/SchedulePage/components/WeeklySchedule";
import "../pages/SchedulePage/SchedulePage.css";

type ScheduleSpreadProps = {
  data: ScheduleSpreadData;
};

type LessonTemplate = {
  agenda: string[];
  assignmentSummary: string;
  attachments: LessonAttachment[];
  discussion: LessonDetailData["discussion"];
  notes: string[];
  topic: string;
};

const lessonTemplates: Array<{ match: RegExp; value: LessonTemplate }> = [
  {
    match: /toán/i,
    value: {
      topic: "Hàm số bậc nhất",
      agenda: [
        "Khởi động và ôn tập nhanh kiến thức liên quan.",
        "Định nghĩa hàm số bậc nhất và cách nhận biết.",
        "Phân tích hệ số a, b và ý nghĩa trên đồ thị.",
        "Vẽ đồ thị bằng hai điểm đặc trưng.",
        "Luyện tập dạng bài cơ bản và vận dụng.",
        "Giao bài tập về nhà và nhắc lỗi thường gặp."
      ],
      notes: [
        "Hàm số bậc nhất có dạng: y = ax + b với a khác 0.",
        "Nếu a > 0 thì hàm số đồng biến, nếu a < 0 thì hàm số nghịch biến.",
        "b là tung độ gốc, là giao điểm với trục Oy.",
        "Khi vẽ đồ thị nên xác định trước hai điểm rõ ràng để tránh nhầm dấu."
      ],
      attachments: [
        { id: "math-file-1", name: "1_ty_thuyet_ham_so_bac_nhat.pdf", size: "1.2 MB", type: "pdf" },
        { id: "math-file-2", name: "2_bai_giang_ham_so_bac_nhat.pdf", size: "4.6 MB", type: "pdf" },
        { id: "math-file-3", name: "3_phan_loai_bai_tap_T9A.docx", size: "386 KB", type: "doc" },
        { id: "math-file-4", name: "4_bai_giai_mau_T9A.pdf", size: "982 KB", type: "pdf" }
      ],
      assignmentSummary: "Hoàn thành bài tập áp dụng và chụp lại cách trình bày đồ thị trước 22:00 tối nay nhé.",
      discussion: [
        {
          id: "math-discuss-1",
          author: "Cô Lan",
          likes: 3,
          message: "Các em nhớ xem lại phần xác định hệ số góc ở trang slide cuối nhé.",
          role: "teacher",
          time: "17:40, 20/10"
        },
        {
          id: "math-discuss-2",
          author: "Minh Anh",
          likes: 2,
          message: "Dạ vâng ạ, em vẫn hơi bối rối ở bước tìm giao điểm với trục Oy.",
          role: "student",
          time: "16:05, 20/10"
        },
        {
          id: "math-discuss-3",
          author: "Gia Hân",
          likes: 1,
          message: "Cô ơi, bài 3 trong phiếu bài tập em chưa ra ý cuối, cô gợi ý thêm giúp em nhé?",
          role: "student",
          time: "16:55, 20/10"
        }
      ]
    }
  },
  {
    match: /anh|speaking/i,
    value: {
      topic: "Unit review và speaking practice",
      agenda: [
        "Warm-up với từ vựng và collocation của unit.",
        "Ôn nhanh cấu trúc ngữ pháp chính.",
        "Luyện phát âm theo cặp câu mẫu.",
        "Speaking task theo tình huống thực tế.",
        "Feedback lỗi phát âm và phản xạ.",
        "Giao worksheet củng cố sau buổi học."
      ],
      notes: [
        "Ưu tiên nói trọn ý trước, sửa phát âm sau.",
        "Dùng câu nối đơn giản để kéo dài câu trả lời.",
        "Lưu ý trọng âm từ khi trả lời speaking part.",
        "Tự ghi âm 1 phút sau buổi học để so sánh tiến độ."
      ],
      attachments: [
        { id: "eng-file-1", name: "unit_review_notes.pdf", size: "1.1 MB", type: "pdf" },
        { id: "eng-file-2", name: "speaking_prompts.pdf", size: "860 KB", type: "pdf" },
        { id: "eng-file-3", name: "vocabulary_checklist.docx", size: "214 KB", type: "doc" }
      ],
      assignmentSummary: "Hoàn thành worksheet unit hiện tại và nộp file ghi âm speaking 1 phút.",
      discussion: [
        {
          id: "eng-discuss-1",
          author: "Thầy Nam",
          likes: 4,
          message: "Nhớ đọc lại vocabulary list trước buổi tối nay để nói mượt hơn nhé.",
          role: "teacher",
          time: "17:10, 20/10"
        },
        {
          id: "eng-discuss-2",
          author: "Nhật Minh",
          likes: 1,
          message: "Thầy ơi phần follow-up question em nên trả lời ngắn hay dài ạ?",
          role: "student",
          time: "17:18, 20/10"
        }
      ]
    }
  },
  {
    match: /lý|thực hành/i,
    value: {
      topic: "Ôn công thức và thực hành thí nghiệm",
      agenda: [
        "Kiểm tra chuẩn bị dụng cụ và nền tảng công thức.",
        "Ôn nhanh các khái niệm trọng tâm của chương.",
        "Hướng dẫn thao tác thí nghiệm hoặc mô phỏng.",
        "Phân tích kết quả đo và sai số.",
        "Thảo luận hiện tượng thực tế liên quan.",
        "Chốt bài và giao nhiệm vụ tiếp nối."
      ],
      notes: [
        "Ghi lại kết quả đo theo bảng để dễ so sánh.",
        "Luôn kiểm tra đơn vị trước khi thay số.",
        "Sai số cần được giải thích bằng thao tác hoặc điều kiện đo.",
        "Ưu tiên hiểu bản chất hiện tượng trước khi thuộc công thức."
      ],
      attachments: [
        { id: "phy-file-1", name: "huong_dan_thi_nghiem.pdf", size: "1.9 MB", type: "pdf" },
        { id: "phy-file-2", name: "tong_hop_cong_thuc.docx", size: "320 KB", type: "doc" }
      ],
      assignmentSummary: "Chụp lại bảng kết quả và hoàn thành 3 câu hỏi phân tích hiện tượng sau buổi học.",
      discussion: [
        {
          id: "phy-discuss-1",
          author: "Thầy Minh",
          likes: 2,
          message: "Ai chưa vào được phòng lab online thì nhắn ngay để thầy gửi link dự phòng.",
          role: "teacher",
          time: "14:20, 20/10"
        }
      ]
    }
  },
  {
    match: /văn/i,
    value: {
      topic: "Đọc hiểu và luyện viết đoạn văn",
      agenda: [
        "Khởi động bằng câu hỏi gợi mở từ tác phẩm.",
        "Đọc hiểu chi tiết và xác định luận điểm.",
        "Phân tích dẫn chứng tiêu biểu.",
        "Luyện viết đoạn văn theo khung ý.",
        "Chữa lỗi diễn đạt, ngữ pháp và lập luận.",
        "Giao nhiệm vụ hoàn thiện đoạn viết."
      ],
      notes: [
        "Mỗi đoạn văn nên có câu chủ đề rõ ràng.",
        "Dẫn chứng cần ngắn gọn nhưng đúng ý phân tích.",
        "Tránh kể lại quá nhiều thay vì phân tích.",
        "Soát lỗi dấu câu trước khi nộp bài."
      ],
      attachments: [
        { id: "lit-file-1", name: "dan_y_phan_tich_tac_pham.pdf", size: "1.4 MB", type: "pdf" },
        { id: "lit-file-2", name: "mau_doan_van_nghi_luan.docx", size: "290 KB", type: "doc" }
      ],
      assignmentSummary: "Viết lại đoạn văn hoàn chỉnh và bổ sung ít nhất 2 dẫn chứng tiêu biểu.",
      discussion: [
        {
          id: "lit-discuss-1",
          author: "Cô Hoa",
          likes: 5,
          message: "Các em nhớ đọc lại trích đoạn trước khi vào lớp để thảo luận sâu hơn nhé.",
          role: "teacher",
          time: "13:05, 20/10"
        }
      ]
    }
  }
];

const fallbackTemplate: LessonTemplate = {
  topic: "Chuyên đề trọng tâm",
  agenda: [
    "Khởi động và chốt mục tiêu buổi học.",
    "Ôn nhanh kiến thức nền cần nhớ.",
    "Đi vào nội dung trọng tâm của buổi.",
    "Luyện tập trực tiếp trên ví dụ mẫu.",
    "Giải đáp các câu hỏi thường gặp.",
    "Giao nhiệm vụ tiếp nối sau giờ học."
  ],
  notes: [
    "Tập trung vào các ý chính được đánh dấu trong buổi học.",
    "Ghi lại những lỗi mình hay lặp lại để sửa nhanh hơn.",
    "Ưu tiên hiểu quy trình trước khi làm bài tương tự."
  ],
  attachments: [
    { id: "general-file-1", name: "lesson_notes.pdf", size: "1.0 MB", type: "pdf" }
  ],
  assignmentSummary: "Hoàn thành bài tập củng cố và rà lại ghi chú trước buổi học kế tiếp.",
  discussion: [
    {
      id: "general-discuss-1",
      author: "Giáo viên",
      likes: 1,
      message: "Nếu còn điểm nào chưa rõ, các em cứ để lại bình luận để được hỗ trợ thêm nhé.",
      role: "teacher",
      time: "Vừa xong"
    }
  ]
};

function extractDayIndex(leftExpression: string, fallbackIndex: number, totalDays: number): number {
  const match = leftExpression.match(/\*\s*(\d+)/);
  const parsedIndex = match ? Number(match[1]) : fallbackIndex % totalDays;

  return Math.min(Math.max(parsedIndex, 0), Math.max(totalDays - 1, 0));
}

function resolveLessonTemplate(subject: string): LessonTemplate {
  return lessonTemplates.find((entry) => entry.match.test(subject))?.value ?? fallbackTemplate;
}

function resolveLocation(subject: string, teacher: string): string {
  if (teacher.includes("Phòng") || teacher.includes("Zoom") || teacher.includes("Lab")) {
    const parts = teacher.split(" - ");

    return parts[parts.length - 1] ?? "Phòng online";
  }

  if (/anh|speaking/i.test(subject)) {
    return "Phòng online 1";
  }

  if (/lý|thực hành/i.test(subject)) {
    return "Phòng online 3";
  }

  if (/văn/i.test(subject)) {
    return "Phòng online 4";
  }

  return "Phòng online 2";
}

function buildLessonDetailFromEvent(event: ScheduleEvent, eventIndex: number, data: ScheduleSpreadData): LessonDetailData {
  const template = resolveLessonTemplate(event.subject);
  const dayIndex = extractDayIndex(event.left, eventIndex, data.days.length);
  const [dayLabel, dateLabel] = data.days[dayIndex] ?? ["Buổi học", "--/--"];

  return {
    agenda: template.agenda,
    assignmentSummary: template.assignmentSummary,
    attachments: template.attachments,
    dateLabel: `${dayLabel}, ${dateLabel}/2024`,
    discussion: template.discussion,
    lessonNotes: template.notes,
    location: resolveLocation(event.subject, event.teacher),
    teacher: event.teacher,
    time: event.time,
    title: event.subject,
    topic: template.topic
  };
}

function buildLessonDetailFromSession(session: UpcomingSession): LessonDetailData {
  const template = resolveLessonTemplate(session.subject);
  const [teacherName] = session.teacher.split(" - ");

  return {
    agenda: template.agenda,
    assignmentSummary: template.assignmentSummary,
    attachments: template.attachments,
    dateLabel: session.date,
    discussion: template.discussion,
    lessonNotes: template.notes,
    location: resolveLocation(session.subject, session.teacher),
    teacher: teacherName ?? session.teacher,
    time: session.time,
    title: session.subject,
    topic: template.topic
  };
}

export function ScheduleSpread({ data }: ScheduleSpreadProps) {
  const [selectedLesson, setSelectedLesson] = useState<LessonDetailData | null>(null);

  return (
    <>
      <ScheduleHeader accent={data.accent} heading={data.heading} subtitle={data.subtitle} />
      <div className="student-schedule-layout flex-1">
        <div className="student-schedule-main">
          <WeeklySchedule
            currentTimeTop={data.currentTimeTop}
            days={data.days}
            events={data.events}
            monthLabel={data.monthLabel}
            onSelectEvent={(event) => {
              const eventIndex = data.events.findIndex(
                (item) => item.subject === event.subject && item.teacher === event.teacher && item.time === event.time
              );

              setSelectedLesson(buildLessonDetailFromEvent(event, Math.max(eventIndex, 0), data));
            }}
            weekLabel={data.weekLabel}
          />
        </div>
        <div className="student-schedule-sidebar">
          <TodayAgenda items={data.todayAgenda} />
          <UpcomingSessions compact onSelectSession={(session) => setSelectedLesson(buildLessonDetailFromSession(session))} sessions={data.sessions} />
          <MiniCalendar dates={data.calendarDates} monthLabel={data.calendarMonthLabel} />
          <ReminderNote items={data.reminders} />
        </div>
      </div>
      <div className="mt-auto pt-4 -mb-4 flex items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          {data.footerLeft}
        </div>
        <div className="flex items-center gap-2 italic text-blue-700">{data.footerRight}</div>
      </div>
      <LessonDetailPopup lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
    </>
  );
}
