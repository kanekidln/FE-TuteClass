import { classTabs, sectionMarkers } from "../config/navigation";
import { calendarDates, classProfiles, scheduleDays } from "../content/classProfiles";
import { buildChecklist, buildInsightCards, buildNoteCards, buildStandardSubtitle, standardSectionCopy } from "../content/standardSpreadContent";
import type { AssignmentsSpreadData, ClassKey, DiscussionSpreadData, NotebookPage, ResourcesSpreadData, ScheduleSpreadData, SectionKey, StandardSpreadData } from "../domain/types";

function buildScheduleData(classKey: ClassKey): ScheduleSpreadData {
  const profile = classProfiles[classKey];

  return {
    heading: "Lịch học lớp",
    accent: profile.className,
    subtitle: `Xem thời khóa biểu theo tuần và các buổi học của lớp ${profile.className}.`,
    weekLabel: "Thời khóa biểu tuần này",
    monthLabel: "Tháng 5, 2024",
    days: scheduleDays,
    events: profile.scheduleEvents.map((event) => ({ ...event })),
    sessions: profile.upcoming.map((session) => ({ ...session })),
    todayAgenda: profile.todayAgenda.map((item) => ({ ...item })),
    reminders: profile.reminders.map((item) => ({ ...item })),
    footerLeft: "Lịch học có thể thay đổi. Thầy/Cô sẽ thông báo trên lớp học khi có cập nhật nhé!",
    footerRight: "Học tập đều - Tiến bộ nhiều mỗi ngày!",
    currentTimeTop: 492,
    calendarMonthLabel: "Tháng 5, 2024",
    calendarDates
  };
}

function buildDiscussionData(classKey: ClassKey): DiscussionSpreadData {
  const profile = classProfiles[classKey];

  return {
    heading: "Trao đổi lớp",
    accent: profile.className,
    subtitle: `Bạn có thể trao đổi cùng cả lớp hoặc nhắn tin riêng với ${profile.teacher}.`,
    classFeed: profile.discussionClassFeed.map((item) => ({ ...item })),
    classTabLabel: "Note lớp",
    footerLeft: `Trao đổi của ${profile.className} luôn được giữ trong cuốn sổ để xem lại nhanh các thông báo và phản hồi quan trọng.`,
    footerRight: `${profile.teacher} sẽ cập nhật ghi chú mới ngay trong trang này khi có thay đổi.`,
    pinnedItems: profile.discussionPinnedItems.map((item) => ({ ...item })),
    pinnedTitle: "Ghim thông báo",
    sharedFiles: profile.discussionSharedFiles.map((item) => ({ ...item })),
    teacherFeed: profile.discussionTeacherFeed.map((item) => ({ ...item })),
    teacherTabLabel: "Note giáo viên"
  };
}

function buildResourcesData(classKey: ClassKey): ResourcesSpreadData {
  const profile = classProfiles[classKey];

  return {
    heading: "Tài liệu lớp",
    accent: profile.className,
    subtitle: "Xem tài liệu toàn môn, tài liệu theo buổi học, link học tập và video được chia sẻ.",
    filters: [
      { id: "all", label: "Tất cả" },
      { id: "pdf", label: "PDF", type: "pdf" },
      { id: "doc", label: "Word", type: "doc" },
      { id: "video", label: "Video", type: "video" },
      { id: "link", label: "Link", type: "link" },
      { id: "image", label: "Ảnh", type: "image" }
    ],
    items: [
      {
        id: `${classKey}-resource-1`,
        action: "view",
        date: "25/05/2024 21:00",
        lesson: "Buổi 15",
        name: `Tóm tắt chương 2 - ${profile.className}`,
        owner: profile.teacher,
        topic: "Hàm số bậc nhất",
        type: "pdf"
      },
      {
        id: `${classKey}-resource-2`,
        action: "download",
        date: "05/06/2024 21:00",
        lesson: "Buổi 18",
        name: "Phiếu bài tập ôn tập giữa kỳ",
        owner: profile.teacher,
        topic: "Ôn tập giữa kỳ",
        type: "doc"
      },
      {
        id: `${classKey}-resource-3`,
        action: "view",
        date: "25/05/2024 19:30",
        lesson: "Buổi 15",
        name: "Video hướng dẫn bài 15",
        owner: profile.teacher,
        topic: "Hàm số bậc nhất",
        type: "video"
      },
      {
        id: `${classKey}-resource-4`,
        action: "open",
        date: "27/05/2024 08:45",
        lesson: "Chủ đề",
        name: "Link luyện tập thêm",
        owner: profile.teacher,
        topic: "Hàm số bậc nhất",
        type: "link"
      },
      {
        id: `${classKey}-resource-5`,
        action: "view",
        date: "28/05/2024 17:10",
        lesson: "Chủ đề",
        name: "Sơ đồ công thức đại số",
        owner: profile.teacher,
        topic: "Đại số",
        type: "image"
      },
      {
        id: `${classKey}-resource-6`,
        action: "download",
        date: "15/06/2024 21:00",
        lesson: "Buổi 21",
        name: "Bộ đề ôn tập cuối tuần",
        owner: profile.teacher,
        topic: "Tổng hợp",
        type: "pdf"
      }
    ],
    notes: [
      {
        id: "latest",
        title: "Tài liệu mới",
        tone: "purple",
        items: ["Tóm tắt chương 2 - Hàm số bậc nhất", "Video hướng dẫn bài 15", "Phiếu bài tập ôn tập giữa kỳ", "Link luyện tập thêm"]
      },
      {
        id: "teacher-tip",
        title: "Gợi ý từ giáo viên",
        tone: "yellow",
        text: `${profile.teacher} gợi ý xem video bài 15 và làm phiếu ôn tập trước, sau đó luyện thêm qua link được chia sẻ nhé!`
      },
      {
        id: "stats",
        title: "Thống kê tài liệu",
        tone: "green",
        stats: [
          { id: "total", label: "Tổng số tài liệu", type: "total", value: "48" },
          { id: "pdf", label: "PDF", type: "pdf", value: "20" },
          { id: "video", label: "Video", type: "video", value: "8" },
          { id: "link", label: "Link", type: "link", value: "12" },
          { id: "image", label: "Ảnh", type: "image", value: "8" }
        ]
      }
    ],
    footerLeft: `Tài liệu của ${profile.className} được lưu theo từng buổi học để bạn xem lại nhanh khi cần.`,
    footerRight: `${profile.teacher} sẽ bổ sung tài liệu mới sau mỗi buổi học.`
  };
}

function buildAssignmentsData(classKey: ClassKey): AssignmentsSpreadData {
  const profile = classProfiles[classKey];

  return {
    heading: "Bài tập lớp",
    accent: profile.className,
    subtitle: "Theo dõi bài tập được giao, nộp bài và xem kết quả của bạn.",
    items: [
      {
        id: `${classKey}-assignment-1`,
        attemptsLabel: "Chưa làm",
        deadline: "25/05/2024 21:00",
        duration: "45 phút",
        icon: "π",
        lesson: "Buổi 15",
        questionsCount: 20,
        status: "not-started",
        subject: profile.className,
        title: "Bài tập chương 2: Hàm số bậc nhất",
        topic: "Hàm số bậc nhất",
        type: "mixed"
      },
      {
        id: `${classKey}-assignment-2`,
        attemptsLabel: "Đang làm",
        deadline: "28/05/2024 21:00",
        duration: "30 phút",
        icon: "√x",
        lesson: "Buổi 16",
        questionsCount: 20,
        status: "in-progress",
        subject: profile.className,
        title: "Trắc nghiệm chương 3",
        topic: "Hàm số bậc hai",
        type: "quiz"
      },
      {
        id: `${classKey}-assignment-3`,
        attemptsLabel: "Đã nộp",
        deadline: "05/06/2024 21:00",
        duration: "45 phút",
        icon: "Σ",
        lesson: "Buổi 18",
        questionsCount: 30,
        score: "8.5 / 10",
        status: "submitted",
        subject: profile.className,
        title: "Ôn tập giữa kỳ",
        topic: "Ôn tập",
        type: "mixed"
      },
      {
        id: `${classKey}-assignment-4`,
        attemptsLabel: "Đã chấm",
        deadline: "01/06/2024 08:00",
        duration: "15 phút",
        icon: "%",
        lesson: "Buổi 17",
        questionsCount: 10,
        score: "9 / 10",
        status: "graded",
        subject: profile.className,
        title: "Kiểm tra 15 phút - Hàm số bậc nhất",
        topic: "Ôn tập nhanh",
        type: "quiz"
      },
      {
        id: `${classKey}-assignment-5`,
        attemptsLabel: "Chưa làm",
        deadline: "08/06/2024 21:00",
        duration: "40 phút",
        icon: "△",
        lesson: "Buổi 19",
        questionsCount: 25,
        status: "not-started",
        subject: profile.className,
        title: "Bài trắc nghiệm hình học",
        topic: "Hình học",
        type: "quiz"
      }
    ],
    notes: [
      {
        id: "deadlines",
        title: "Hạn nộp sắp tới",
        tone: "purple",
        items: ["25/05 - Bài tập chương 2: Hàm số bậc nhất", "28/05 - Bài tập chương 2: Hàm số bậc hai", "01/06 - Bài tập: Hệ thức lượng trong tam giác vuông"]
      },
      {
        id: "teacher-feedback",
        title: "Nhận xét giáo viên",
        tone: "yellow",
        text: "Bạn cần chú ý trình bày bài rõ ràng hơn và kiểm tra lại các bước tính toán nhé!"
      },
      {
        id: "completion",
        title: "Tỷ lệ hoàn thành",
        tone: "green",
        stats: [
          { id: "submitted", color: "green", label: "Đã nộp", value: "10" },
          { id: "graded", color: "blue", label: "Đã chấm", value: "4" },
          { id: "missing", color: "red", label: "Chưa nộp", value: "5" }
        ]
      }
    ],
    questions: [
      {
        id: "q1",
        prompt: "Hàm số bậc nhất có dạng tổng quát là:",
        options: [
          { id: "a", label: "A", text: "y = ax + b (a ≠ 0)" },
          { id: "b", label: "B", text: "y = ax² + bx + c" },
          { id: "c", label: "C", text: "y = a/x + b" },
          { id: "d", label: "D", text: "y = a(x + b) (a ≠ 0)" }
        ]
      },
      {
        id: "q2",
        prompt: "Đồ thị của hàm số y = 2x - 3 là:",
        options: [
          { id: "a", label: "A", text: "Một đường thẳng đi qua gốc tọa độ." },
          { id: "b", label: "B", text: "Một đường thẳng song song với trục hoành." },
          { id: "c", label: "C", text: "Một đường thẳng cắt trục tung tại điểm (0; -3)." },
          { id: "d", label: "D", text: "Một đường thẳng vuông góc với trục tung." }
        ]
      },
      {
        id: "q3",
        prompt: "Một cửa hàng bán 1 chiếc bút với giá 10.000 đồng. Nếu mua trên 10 chiếc thì từ chiếc thứ 11 trở đi, mỗi chiếc bút được giảm giá 500 đồng. Hàm số biểu thị y theo x là:",
        options: [
          { id: "a", label: "A", text: "y = 10.000x" },
          { id: "b", label: "B", text: "y = 9.500x + 5.000 (với x ≥ 11)" },
          { id: "c", label: "C", text: "y = 10.000x - 500(x - 10) (với x ≥ 11)" },
          { id: "d", label: "D", text: "y = 10.000x - 500x (với x ≥ 11)" }
        ]
      }
    ],
    assignmentPrompt: {
      title: "Đề bài tổng hợp: Hàm số bậc nhất trong bài toán thực tế",
      source: "uploaded-file",
      file: {
        name: "De_bai_ham_so_bac_nhat.pdf",
        size: "420 KB",
        type: "pdf"
      },
      body: [
        "Giáo viên giao một bài tập kết hợp gồm phần trắc nghiệm kiểm tra kiến thức nhanh và phần tự luận yêu cầu trình bày lời giải chi tiết.",
        "Bối cảnh chung: Một cửa hàng bán vở với giá 12.000 đồng/quyển. Khi mua từ 10 quyển trở lên, mỗi quyển được giảm 1.000 đồng.",
        "Phần trắc nghiệm: Chọn đáp án đúng nhất cho các câu hỏi về dạng tổng quát, đồ thị và mô hình hàm số bậc nhất.",
        "Phần tự luận: Lập hàm số biểu diễn số tiền y phải trả theo số quyển vở x, tính tiền khi mua 8 quyển và 15 quyển, sau đó giải thích vì sao bài toán có thể mô hình bằng hàm số bậc nhất từng phần."
      ]
    },
    submissionFiles: [
      { id: "submit-1", name: `Bai_lam_${profile.className.replace(/\s+/g, "_")}.pdf`, size: "1.24 MB", type: "pdf" },
      { id: "submit-2", name: "Loi_giai_chi_tiet.docx", size: "856 KB", type: "doc" }
    ],
    footerLeft: "Nhấn vào Làm bài để bắt đầu hoặc Tiếp tục để quay lại bài đang làm.",
    footerRight: `${profile.teacher} sẽ chấm phần tự luận và cập nhật nhận xét trong sổ.`
  };
}

function buildStandardData(classKey: ClassKey, sectionKey: Exclude<SectionKey, "schedule" | "discussion" | "resources" | "assignments">): StandardSpreadData {
  const profile = classProfiles[classKey];
  const sectionCopy = standardSectionCopy[sectionKey];

  return {
    heading: sectionCopy.title,
    accent: profile.className,
    subtitle: buildStandardSubtitle(sectionKey, profile),
    panelTitle: sectionCopy.panelTitle,
    panelSubtitle: sectionCopy.panelSubtitle,
    cards: buildInsightCards(sectionKey, profile),
    checklist: buildChecklist(sectionKey),
    noteCards: buildNoteCards(sectionKey, profile),
    footerLeft: `${sectionCopy.title} của ${profile.className} được giữ cùng shell notebook để không tách rời trải nghiệm.`,
    footerRight: `${profile.teacher} luôn có thể cập nhật nhanh ở đúng section này.`
  };
}

export function buildNotebookPages(): NotebookPage[] {
  return classTabs.flatMap((classItem) =>
    sectionMarkers.map((marker) => {
      if (marker.key === "schedule") {
        return {
          key: `${classItem.key}-${marker.key}`,
          classKey: classItem.key,
          className: classItem.name,
          teacher: classItem.teacher,
          sectionKey: marker.key,
          navLabel: marker.label,
          spreadType: "schedule" as const,
          data: buildScheduleData(classItem.key)
        };
      }

      if (marker.key === "discussion") {
        return {
          key: `${classItem.key}-${marker.key}`,
          classKey: classItem.key,
          className: classItem.name,
          teacher: classItem.teacher,
          sectionKey: marker.key,
          navLabel: marker.label,
          spreadType: "discussion" as const,
          data: buildDiscussionData(classItem.key)
        };
      }

      if (marker.key === "resources") {
        return {
          key: `${classItem.key}-${marker.key}`,
          classKey: classItem.key,
          className: classItem.name,
          teacher: classItem.teacher,
          sectionKey: marker.key,
          navLabel: marker.label,
          spreadType: "resources" as const,
          data: buildResourcesData(classItem.key)
        };
      }

      if (marker.key === "assignments") {
        return {
          key: `${classItem.key}-${marker.key}`,
          classKey: classItem.key,
          className: classItem.name,
          teacher: classItem.teacher,
          sectionKey: marker.key,
          navLabel: marker.label,
          spreadType: "assignments" as const,
          data: buildAssignmentsData(classItem.key)
        };
      }

      return {
        key: `${classItem.key}-${marker.key}`,
        classKey: classItem.key,
        className: classItem.name,
        teacher: classItem.teacher,
        sectionKey: marker.key,
        navLabel: marker.label,
        spreadType: "standard" as const,
        data: buildStandardData(classItem.key, marker.key)
      };
    })
  );
}

export const notebookPages = buildNotebookPages();
