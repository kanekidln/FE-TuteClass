import type { ClassProfile, InsightCard, SectionKey, SpreadNoteCard } from "../domain/types";

const standardTones = {
  overview: ["orange", "blue", "green"] as const,
  assignments: ["purple", "orange", "blue"] as const,
  resources: ["blue", "green", "orange"] as const,
  discussion: ["green", "purple", "orange"] as const
};

export const standardSectionCopy = {
  overview: {
    title: "Tổng quan lớp",
    panelTitle: "Tình hình lớp học tuần này",
    panelSubtitle: "Nhìn nhanh các mục cần ưu tiên và tiến độ chung của cả lớp."
  },
  assignments: {
    title: "Bài tập được giao",
    panelTitle: "Bảng theo dõi bài tập",
    panelSubtitle: "Nhóm bài theo mức ưu tiên để theo dõi nhanh trong sổ tay."
  },
  resources: {
    title: "Tài liệu học tập",
    panelTitle: "Thư mục tài liệu đang dùng",
    panelSubtitle: "Những tài liệu xuất hiện nhiều nhất trong tuần học này."
  },
  discussion: {
    title: "Trao đổi lớp học",
    panelTitle: "Các chủ đề đang trao đổi",
    panelSubtitle: "Các dòng trao đổi nổi bật giữa giáo viên và học sinh."
  }
} as const;

const checklistMap: Record<Exclude<SectionKey, "schedule">, string[]> = {
  overview: [
    "Cập nhật chỉ số tiến độ theo tuần",
    "Ghim một ghi chú quan trọng cho buổi tới",
    "Nhắc nhóm học sinh cần theo sát"
  ],
  assignments: [
    "Phân nhóm bài theo hạn nộp",
    "Đánh dấu bài đã nhận feedback",
    "Ưu tiên bài cần nhắc trong buổi tối"
  ],
  resources: [
    "Sắp xếp tài liệu theo buổi học",
    "Tách ghi chú, worksheet và đáp án",
    "Gắn nhãn file cần xem lại nhiều lần"
  ],
  discussion: [
    "Gom câu hỏi theo từng chủ đề",
    "Lưu feedback ngắn của giáo viên",
    "Đưa thông báo quan trọng lên đầu danh sách"
  ]
};

export function buildStandardSubtitle(sectionKey: Exclude<SectionKey, "schedule">, profile: ClassProfile) {
  const subtitles = {
    overview: `Tổng hợp nhanh tiến độ, mục tiêu và các điểm nhấn của ${profile.className}.`,
    assignments: `Theo dõi danh sách bài tập, deadline và mức độ hoàn thành của ${profile.className}.`,
    resources: `Sắp xếp ghi chú, file học tập và tài liệu tham khảo của ${profile.className}.`,
    discussion: `Lưu các câu hỏi, phản hồi và trao đổi quan trọng của ${profile.className}.`
  } satisfies Record<Exclude<SectionKey, "schedule">, string>;

  return subtitles[sectionKey];
}

export function buildInsightCards(sectionKey: Exclude<SectionKey, "schedule">, profile: ClassProfile): InsightCard[] {
  if (sectionKey === "overview") {
    return [
      { eyebrow: "Tiến độ", title: "82% mục tiêu tuần", body: `Lớp ${profile.className} đã hoàn thành phần lớn đầu việc trong tuần.`, tone: standardTones.overview[0] },
      { eyebrow: "Điểm nhấn", title: "Buổi cần tập trung", body: `Nhắc lại nội dung quan trọng trước buổi học chính với ${profile.teacher}.`, tone: standardTones.overview[1] },
      { eyebrow: "Nhắc nhanh", title: "2 việc cần xử lý", body: "Cập nhật sổ đầu bài và chốt nhóm học sinh cần theo sát hơn.", tone: standardTones.overview[2] }
    ];
  }

  if (sectionKey === "assignments") {
    return [
      { eyebrow: "Deadline gần", title: "3 bài cần nộp", body: `Các bài của ${profile.className} đang được nhóm theo hạn gần nhất.`, tone: standardTones.assignments[0] },
      { eyebrow: "Đã hoàn thành", title: "11 bài đã chấm", body: "Giáo viên đã cập nhật feedback để học sinh xem lại trong sổ.", tone: standardTones.assignments[1] },
      { eyebrow: "Cần nhắc", title: "4 bài chậm tiến độ", body: "Ưu tiên nhắc ở đầu buổi để tránh dồn việc cuối tuần.", tone: standardTones.assignments[2] }
    ];
  }

  if (sectionKey === "resources") {
    return [
      { eyebrow: "Mới cập nhật", title: "Slide và ghi chú", body: `Tài liệu của ${profile.className} được gom theo buổi học và chương.`, tone: standardTones.resources[0] },
      { eyebrow: "Luyện thêm", title: "Bộ đề tham khảo", body: "Giữ các tài liệu nâng cao trong cùng hệ shell để học sinh dễ tìm.", tone: standardTones.resources[1] },
      { eyebrow: "Nổi bật", title: "Tệp dùng nhiều nhất", body: "Bài giảng tuần này, worksheet và bản đáp án nhanh.", tone: standardTones.resources[2] }
    ];
  }

  return [
    { eyebrow: "Q&A", title: "Câu hỏi cần trả lời", body: `Những thắc mắc nổi bật của ${profile.className} được gom tại đây.`, tone: standardTones.discussion[0] },
    { eyebrow: "Feedback", title: "Góp ý từ giáo viên", body: "Nhận xét theo nhóm học sinh và theo chủ đề đang học.", tone: standardTones.discussion[1] },
    { eyebrow: "Thông báo", title: "Nội dung cần ghim", body: "Các mốc quan trọng, thay đổi lịch hoặc tài liệu cần đọc trước.", tone: standardTones.discussion[2] }
  ];
}

export function buildNoteCards(sectionKey: Exclude<SectionKey, "schedule">, profile: ClassProfile): SpreadNoteCard[] {
  const noteCardsMap: Record<Exclude<SectionKey, "schedule">, SpreadNoteCard[]> = {
    overview: [
      { title: "Mốc lớp học", items: ["Cập nhật điểm nhấn đầu tuần", "Theo dõi 3 buổi gần nhất", `Giữ nhịp học của ${profile.className}`], tone: "orange" },
      { title: "Ghi chú của giáo viên", text: `${profile.teacher} muốn dashboard này luôn là trang mở đầu để xem nhanh trạng thái lớp học.`, tone: "indigo" }
    ],
    assignments: [
      { title: "Nhóm bài chính", items: ["Bài trên lớp", "Bài về nhà", "Bài cần nộp gấp"], tone: "indigo" },
      { title: "Nhắc triển khai", text: `Phần bài tập của ${profile.className} nên nhìn được ngay số lượng bài đã chấm và bài còn thiếu.`, tone: "orange" }
    ],
    resources: [
      { title: "Nguồn tài liệu", items: ["Slide bài giảng", "Worksheet", "Đề tham khảo"], tone: "blue" },
      { title: "Mẹo tổ chức", text: "Giữ cùng visual system của cuốn sổ để học sinh thấy đây vẫn là một notebook thống nhất.", tone: "green" }
    ],
    discussion: [
      { title: "Luồng trao đổi", items: ["Hỏi đáp", "Thông báo", "Feedback cá nhân"], tone: "green" },
      { title: "Cách dùng", text: `Trang trao đổi của ${profile.className} nên đóng vai trò bảng tin và nơi để lại phản hồi ngắn.`, tone: "indigo" }
    ]
  };

  return noteCardsMap[sectionKey].map((noteCard) => ({
    ...noteCard,
    items: noteCard.items ? [...noteCard.items] : undefined
  }));
}

export function buildChecklist(sectionKey: Exclude<SectionKey, "schedule">) {
  return [...checklistMap[sectionKey]];
}
