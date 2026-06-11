import type { ClassKey } from "../domain/types";

export type OverviewQuickCard = {
  actionLabel?: string;
  detail: string;
  icon: "chart" | "wallet" | "assignment" | "calendar";
  meta: string;
  tone: "teal" | "orange" | "violet" | "blue";
  title: string;
  value: string;
};

export type OverviewListItem = {
  label: string;
  meta?: string;
};

export type OverviewDashboardContent = {
  attendanceDetail: string;
  attendanceTitle: string;
  attendanceValue: string;
  footerLeft: string;
  footerRight: string;
  planItems: string[];
  quickCards: OverviewQuickCard[];
  taskItems: OverviewListItem[];
  taskTitle: string;
};

export const overviewDashboardContent: Record<ClassKey, OverviewDashboardContent> = {
  math: {
    attendanceDetail: "Đã đi học 18 trên tổng 20 buổi của lớp.",
    attendanceTitle: "Tổng kết điểm danh",
    attendanceValue: "18/20 buổi",
    footerLeft: "Hãy giữ vững tiến độ và hoàn thành mục tiêu học tập của bạn!",
    footerRight: "Học tập hôm nay, thành công ngày mai!",
    planItems: [
      "Học trước bài mới vào đầu tuần",
      "Ôn tập 2 dạng bài trong chương hiện tại",
      "Luyện thêm 3 bài nâng cao trước cuối tuần",
      "Ghi chú các lỗi sai để hỏi Cô Lan",
      "Giữ mục tiêu điểm 9+ nhé!"
    ],
    quickCards: [
      {
        detail: "Cập nhật: 12/05/2024",
        icon: "chart",
        meta: "Trung bình chung",
        title: "Điểm hiện tại",
        tone: "teal",
        value: "8.7"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "Đến ngày 30/09/2024",
        icon: "wallet",
        meta: "Đã thanh toán",
        title: "Thông báo học phí",
        tone: "orange",
        value: "Kỳ thu 1"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "17:00, Thứ 6 (17/05)",
        icon: "assignment",
        meta: "Bài tập chương 3",
        title: "Hạn nộp bài sắp tới",
        tone: "violet",
        value: "Cần nộp"
      },
      {
        actionLabel: "Xem lịch học",
        detail: "Phòng online 2",
        icon: "calendar",
        meta: "Toán 9A",
        title: "Lịch học hôm nay",
        tone: "blue",
        value: "18:30 - 20:00"
      }
    ],
    taskItems: [
      { label: "Bài tập Toán - Chương 3", meta: "Hạn: 17/05" },
      { label: "Bài văn nghị luận xã hội", meta: "Hạn: 18/05" },
      { label: "Bài tập Tiếng Anh - Unit 5", meta: "Hạn: 19/05" },
      { label: "Thí nghiệm Vật lý - Bài 14", meta: "Hạn: 20/05" },
      { label: "Worksheet Hóa học - Bài 2", meta: "Hạn: 21/05" }
    ],
    taskTitle: "Các bài tập sắp nộp"
  },
  english: {
    attendanceDetail: "Đã tham gia 17 trên tổng 20 buổi học của lớp.",
    attendanceTitle: "Tổng kết điểm danh",
    attendanceValue: "17/20 buổi",
    footerLeft: "Giữ nhịp luyện nghe nói mỗi ngày để tiến bộ nhanh hơn!",
    footerRight: "Every lesson counts, keep the momentum!",
    planItems: [
      "Đọc trước từ vựng của bài mới",
      "Ôn tập grammar points trong notebook",
      "Luyện nói 15 phút trước buổi speaking",
      "Đánh dấu câu hỏi cần hỏi Thầy Nam",
      "Mục tiêu: giao tiếp tự tin hơn mỗi tuần"
    ],
    quickCards: [
      {
        detail: "Cập nhật: 12/05/2024",
        icon: "chart",
        meta: "Trung bình kỹ năng",
        title: "Điểm hiện tại",
        tone: "teal",
        value: "8.5"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "Đến ngày 30/09/2024",
        icon: "wallet",
        meta: "Đã thanh toán",
        title: "Thông báo học phí",
        tone: "orange",
        value: "Kỳ thu 1"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "21:00, Thứ 5 (16/05)",
        icon: "assignment",
        meta: "Writing task unit 5",
        title: "Hạn nộp bài sắp tới",
        tone: "violet",
        value: "Cần nộp"
      },
      {
        actionLabel: "Xem lịch học",
        detail: "Phòng online 1",
        icon: "calendar",
        meta: "Tiếng Anh 9A",
        title: "Lịch học hôm nay",
        tone: "blue",
        value: "18:00 - 19:30"
      }
    ],
    taskItems: [
      { label: "Worksheet Unit 5", meta: "Hạn: 16/05" },
      { label: "Vocabulary revision set", meta: "Hạn: 17/05" },
      { label: "Listening checkpoint", meta: "Hạn: 18/05" },
      { label: "Speaking reflection", meta: "Hạn: 19/05" },
      { label: "Grammar drill - Tenses", meta: "Hạn: 20/05" }
    ],
    taskTitle: "Assignments sắp tới"
  },
  physics: {
    attendanceDetail: "Đã đi học 16 trên tổng 18 buổi thực hành và lý thuyết.",
    attendanceTitle: "Tổng kết điểm danh",
    attendanceValue: "16/18 buổi",
    footerLeft: "Nhớ xem lại kết quả thực hành và ghi chú hiện tượng quan trọng.",
    footerRight: "Học chắc lý thuyết, làm tốt thực hành!",
    planItems: [
      "Ôn lại công thức chính trước buổi tối",
      "Soạn sẵn phản hồi cho bài thí nghiệm",
      "Kiểm tra lại ghi chú trong notebook",
      "Làm thêm 2 bài vận dụng",
      "Đặt mục tiêu hiểu bản chất hiện tượng"
    ],
    quickCards: [
      {
        detail: "Cập nhật: 11/05/2024",
        icon: "chart",
        meta: "Trung bình học kỳ",
        title: "Điểm hiện tại",
        tone: "teal",
        value: "8.3"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "Đến ngày 30/09/2024",
        icon: "wallet",
        meta: "Đã thanh toán",
        title: "Thông báo học phí",
        tone: "orange",
        value: "Kỳ thu 1"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "16:30, Thứ 5 (16/05)",
        icon: "assignment",
        meta: "Báo cáo thí nghiệm",
        title: "Hạn nộp bài sắp tới",
        tone: "violet",
        value: "Cần nộp"
      },
      {
        actionLabel: "Xem lịch học",
        detail: "Lab 03",
        icon: "calendar",
        meta: "Thực hành Vật lý",
        title: "Lịch học hôm nay",
        tone: "blue",
        value: "17:00 - 18:30"
      }
    ],
    taskItems: [
      { label: "Báo cáo thí nghiệm bài 14", meta: "Hạn: 16/05" },
      { label: "Bài tập động học", meta: "Hạn: 18/05" },
      { label: "Tóm tắt công thức chương 4", meta: "Hạn: 19/05" },
      { label: "Câu hỏi vận dụng nâng cao", meta: "Hạn: 20/05" },
      { label: "Worksheet thực hành", meta: "Hạn: 21/05" }
    ],
    taskTitle: "Công việc cần hoàn thành"
  },
  literature: {
    attendanceDetail: "Đã tham gia 19 trên tổng 20 buổi học và chuyên đề.",
    attendanceTitle: "Tổng kết điểm danh",
    attendanceValue: "19/20 buổi",
    footerLeft: "Đánh dấu các ý tưởng hay và giữ nhịp đọc - viết đều mỗi tuần.",
    footerRight: "Viết nhiều hơn mỗi ngày, tiến bộ rõ ràng hơn!",
    planItems: [
      "Đọc trước tác phẩm của buổi tiếp theo",
      "Ghi 3 ý chính cho bài viết lớn",
      "Lưu feedback của Cô Hoa để sửa bài",
      "Ôn tập thao tác lập luận",
      "Mục tiêu: diễn đạt mạch lạc và giàu cảm xúc"
    ],
    quickCards: [
      {
        detail: "Cập nhật: 12/05/2024",
        icon: "chart",
        meta: "Trung bình bài viết",
        title: "Điểm hiện tại",
        tone: "teal",
        value: "8.9"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "Đến ngày 30/09/2024",
        icon: "wallet",
        meta: "Đã thanh toán",
        title: "Thông báo học phí",
        tone: "orange",
        value: "Kỳ thu 1"
      },
      {
        actionLabel: "Xem chi tiết",
        detail: "20:30, Chủ nhật (19/05)",
        icon: "assignment",
        meta: "Dàn ý bài văn nghị luận",
        title: "Hạn nộp bài sắp tới",
        tone: "violet",
        value: "Cần nộp"
      },
      {
        actionLabel: "Xem lịch học",
        detail: "Phòng online 4",
        icon: "calendar",
        meta: "Ngữ văn 9A",
        title: "Lịch học hôm nay",
        tone: "blue",
        value: "20:00 - 21:00"
      }
    ],
    taskItems: [
      { label: "Dàn ý bài văn nghị luận", meta: "Hạn: 19/05" },
      { label: "Đọc tác phẩm tuần này", meta: "Hạn: 20/05" },
      { label: "Tổng hợp dẫn chứng tiêu biểu", meta: "Hạn: 21/05" },
      { label: "Luyện viết mở bài - kết bài", meta: "Hạn: 22/05" },
      { label: "Phiếu tự học văn học", meta: "Hạn: 23/05" }
    ],
    taskTitle: "Bài viết và đọc sắp tới"
  }
};
