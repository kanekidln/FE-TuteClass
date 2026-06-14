import type { ClassKey, ClassProfile, MiniCalendarDate } from "../domain/types";

export const scheduleDays: Array<[string, string]> = [
  ["Thứ 2", "13/05"],
  ["Thứ 3", "14/05"],
  ["Thứ 4", "15/05"],
  ["Thứ 5", "16/05"],
  ["Thứ 6", "17/05"],
  ["Thứ 7", "18/05"],
  ["Chủ nhật", "19/05"]
];

export const calendarDates: MiniCalendarDate[] = [
  { value: "29", state: "muted" },
  { value: "30", state: "muted" },
  { value: "1", state: "" },
  { value: "2", state: "" },
  { value: "3", state: "" },
  { value: "4", state: "" },
  { value: "5", state: "sun" },
  { value: "6", state: "" },
  { value: "7", state: "" },
  { value: "8", state: "" },
  { value: "9", state: "" },
  { value: "10", state: "" },
  { value: "11", state: "" },
  { value: "12", state: "sun" },
  { value: "13", state: "" },
  { value: "14", state: "" },
  { value: "15", state: "" },
  { value: "16", state: "" },
  { value: "17", state: "active" },
  { value: "18", state: "" },
  { value: "19", state: "sun" },
  { value: "20", state: "" },
  { value: "21", state: "" },
  { value: "22", state: "" },
  { value: "23", state: "" },
  { value: "24", state: "" },
  { value: "25", state: "" },
  { value: "26", state: "sun" },
  { value: "27", state: "" },
  { value: "28", state: "" },
  { value: "29", state: "" },
  { value: "30", state: "" },
  { value: "31", state: "" },
  { value: "1", state: "muted" },
  { value: "2", state: "sun-muted" }
];

export const classProfiles: Record<ClassKey, ClassProfile> = {
  math: {
    className: "Toán 9A",
    teacher: "Cô Lan",
    scheduleEvents: [
      { left: "calc(12.5%*6 + 60px)", top: 432, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "09:00 - 10:30" },
      { left: "calc(12.5%*0 + 60px)", top: 912, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "19:00 - 20:30" },
      { left: "calc(12.5%*2 + 60px)", top: 912, className: "bg-blue-50 border-blue-200", subject: "Tiếng Anh 9A", teacher: "Thầy Nam", time: "19:00 - 20:30" },
      { left: "calc(12.5%*4 + 60px)", top: 912, className: "bg-green-50 border-green-200", subject: "Toán 9A", teacher: "Cô Lan", time: "19:00 - 20:30" }
    ],
    upcoming: [
      { id: "math-session-1", date: "Vào ngày mai (Thứ 4)", dateClass: "text-red-500", subject: "Toán 9A", teacher: "Cô Lan - Phòng online 2", time: "19:00 - 20:30" },
      { id: "math-session-2", date: "Thứ 6, 17/05", dateClass: "text-gray-500", subject: "Toán 9A", teacher: "Cô Lan - Phòng online 2", time: "19:00 - 20:30" }
    ],
    todayAgenda: [
      { id: "math-today-1", time: "07:30 - 09:00", subject: "Toán 9A", detail: "Cô Lan - Phòng online 2" },
      { id: "math-today-2", time: "15:30 - 17:00", subject: "Tự học Toán", detail: "Tự học" }
    ],
    reminders: [
      { id: "math-reminder-1", text: "Đến lớp đúng giờ nhé!" },
      { id: "math-reminder-2", text: "Chuẩn bị sách vở và dụng cụ học tập." },
      { id: "math-reminder-3", text: "Xem bài tập trước khi vào lớp." }
    ],
    discussionClassFeed: [
      {
        id: "math-msg-1",
        author: "Cô Lan",
        likes: 0,
        message: "Chào cả lớp! Hôm nay chúng ta học bài “Phương trình bậc hai”. Các em xem trước lý thuyết trong SGK trang 45-47 và làm bài tập 1, 2 trước khi học nhé!",
        role: "teacher",
        time: "08:05"
      },
      {
        id: "math-msg-2",
        author: "Lớp trưởng",
        likes: 6,
        message: "Dạ vâng ạ! Lớp trưởng xin nhắc các bạn nộp bài tập đúng hạn nhé.",
        role: "monitor",
        time: "08:07"
      },
      {
        id: "math-msg-3",
        author: "Minh Anh",
        likes: 0,
        message: "Cô ơi, bài 2 ý b em chưa hiểu cách xác định a, b, c ạ. Cô giải thích thêm giúp em được không ạ?",
        role: "student",
        time: "09:12"
      },
      {
        id: "math-msg-4",
        author: "Cô Lan",
        likes: 6,
        message: "Minh Anh xem ví dụ 2 trong trang 46 nhé. Nếu vẫn chưa rõ, chiều nay lên lớp cô sẽ hướng dẫn kỹ hơn.",
        role: "teacher",
        time: "09:18"
      },
      {
        id: "math-msg-5",
        author: "Tuấn",
        likes: 2,
        message: "Bạn Minh Anh tham khảo thêm bài giảng cô đã chia sẻ ở Tài liệu nha. Có ví dụ mẫu rất dễ hiểu!",
        role: "student",
        time: "09:22"
      },
      {
        id: "math-msg-6",
        author: "Minh Anh",
        likes: 1,
        message: "Cảm ơn cô và bạn Tuấn nhiều ạ! Minh hiểu rồi ạ!",
        role: "student",
        time: "09:25"
      }
    ],
    discussionTeacherFeed: [
      {
        id: "math-teacher-1",
        author: "Cô Lan",
        likes: 0,
        message: "Cô sẽ ghim thêm một note giáo viên riêng cho lớp vào mỗi đầu tuần để các bạn theo dõi mục tiêu và mốc cần nhớ.",
        role: "teacher",
        time: "07:50"
      },
      {
        id: "math-teacher-2",
        author: "Cô Lan",
        likes: 4,
        message: "Nếu bạn nào còn vướng phần hệ số a, b, c thì cứ nhắn riêng tại đây, cô sẽ phản hồi trước giờ học tối nay.",
        role: "teacher",
        time: "08:30"
      },
      {
        id: "math-teacher-3",
        author: "Cô Lan",
        likes: 3,
        message: "Bài tập tuần này ưu tiên cách trình bày, nên các em nhớ chụp rõ từng bước giải khi nộp nhé.",
        role: "teacher",
        time: "09:05"
      }
    ],
    discussionPinnedItems: [
      { id: "math-pin-1", text: "Nộp bài tập trước 21:00 thứ Sáu hằng tuần." },
      { id: "math-pin-2", text: "Kiểm tra 15 phút vào đầu mỗi buổi học." },
      { id: "math-pin-3", text: "Thắc mắc của các bạn sẽ được giải đáp trong giờ học hoặc ngay tại đây." }
    ],
    discussionSharedFiles: [
      { id: "math-file-1", name: "Bài giảng Phương trình bậc hai.pdf", meta: "Cô Lan • 03/05/2024", type: "pdf" },
      { id: "math-file-2", name: "Bài tập luyện tập (Tuần 25).docx", meta: "Cô Lan • 01/05/2024", type: "doc" },
      { id: "math-file-3", name: "Đáp án bài tập Tuần 24.xlsx", meta: "Cô Lan • 26/04/2024", type: "xls" }
    ]
  },
  english: {
    className: "Tiếng Anh 9A",
    teacher: "Thầy Nam",
    scheduleEvents: [
      { left: "calc(12.5%*1 + 60px)", top: 384, className: "bg-blue-50 border-blue-200", subject: "Tiếng Anh 9A", teacher: "Thầy Nam", time: "08:00 - 09:30" },
      { left: "calc(12.5%*2 + 60px)", top: 864, className: "bg-blue-50 border-blue-200", subject: "Tiếng Anh 9A", teacher: "Thầy Nam", time: "18:00 - 19:30" },
      { left: "calc(12.5%*4 + 60px)", top: 912, className: "bg-indigo-50 border-indigo-200", subject: "Speaking Lab", teacher: "Thầy Nam", time: "19:00 - 20:30" }
    ],
    upcoming: [
      { id: "english-session-1", date: "Vào ngày mai (Thứ 4)", dateClass: "text-red-500", subject: "Tiếng Anh 9A", teacher: "Thầy Nam - Phòng online 1", time: "18:00 - 19:30" },
      { id: "english-session-2", date: "Thứ 6, 17/05", dateClass: "text-gray-500", subject: "Speaking Lab", teacher: "Thầy Nam - Zoom breakout", time: "19:00 - 20:30" }
    ],
    todayAgenda: [
      { id: "english-today-1", time: "08:00 - 09:30", subject: "Tiếng Anh 9A", detail: "Thầy Nam - Phòng online 1" },
      { id: "english-today-2", time: "19:00 - 19:30", subject: "Ôn speaking", detail: "Zoom breakout" }
    ],
    reminders: [
      { id: "english-reminder-1", text: "Ôn từ vựng trước buổi tối nay." },
      { id: "english-reminder-2", text: "Chuẩn bị tai nghe và mic trước khi vào lớp." },
      { id: "english-reminder-3", text: "Xem trước worksheet của unit hiện tại." }
    ],
    discussionClassFeed: [
      { id: "eng-msg-1", author: "Thầy Nam", likes: 0, message: "Tối nay lớp mình sẽ luyện speaking theo chủ đề school life. Các em chuẩn bị trước 3 ý chính để nói nhé.", role: "teacher", time: "07:40" },
      { id: "eng-msg-2", author: "Lan Chi", likes: 2, message: "Thầy ơi, phần follow-up question có cần trả lời dài không ạ?", role: "student", time: "07:55" },
      { id: "eng-msg-3", author: "Thầy Nam", likes: 5, message: "Không cần quá dài, quan trọng là trả lời rõ ý và có thêm ví dụ nhỏ là rất tốt rồi.", role: "teacher", time: "08:02" }
    ],
    discussionTeacherFeed: [
      { id: "eng-teacher-1", author: "Thầy Nam", likes: 3, message: "Thầy sẽ cập nhật list từ vựng cần học vào đầu mỗi tuần để các bạn ôn theo đúng trọng tâm.", role: "teacher", time: "08:10" },
      { id: "eng-teacher-2", author: "Thầy Nam", likes: 1, message: "Bạn nào cần feedback riêng phần phát âm cứ nhắn trong note giáo viên này nhé.", role: "teacher", time: "08:24" }
    ],
    discussionPinnedItems: [
      { id: "eng-pin-1", text: "Gửi file ghi âm speaking trước 22:00 Chủ nhật." },
      { id: "eng-pin-2", text: "Có mặt trước 5 phút để test mic và camera." },
      { id: "eng-pin-3", text: "Nếu mất kết nối, quay lại phòng học bằng link cũ." }
    ],
    discussionSharedFiles: [
      { id: "eng-file-1", name: "Speaking prompts tuần này.pdf", meta: "Thầy Nam • 04/05/2024", type: "pdf" },
      { id: "eng-file-2", name: "Vocabulary checklist.docx", meta: "Thầy Nam • 02/05/2024", type: "doc" },
      { id: "eng-file-3", name: "Listening score sheet.xlsx", meta: "Thầy Nam • 28/04/2024", type: "xls" }
    ]
  },
  physics: {
    className: "Vật lý 9A",
    teacher: "Thầy Minh",
    scheduleEvents: [
      { left: "calc(12.5%*0 + 60px)", top: 480, className: "bg-emerald-50 border-emerald-200", subject: "Vật lý 9A", teacher: "Thầy Minh", time: "10:00 - 11:30" },
      { left: "calc(12.5%*3 + 60px)", top: 816, className: "bg-cyan-50 border-cyan-200", subject: "Thực hành", teacher: "Thầy Minh", time: "17:00 - 18:30" },
      { left: "calc(12.5%*5 + 60px)", top: 912, className: "bg-emerald-50 border-emerald-200", subject: "Vật lý 9A", teacher: "Thầy Minh", time: "19:00 - 20:30" }
    ],
    upcoming: [
      { id: "physics-session-1", date: "Thứ 5, 16/05", dateClass: "text-red-500", subject: "Thực hành", teacher: "Thầy Minh - Lab 03", time: "17:00 - 18:30" },
      { id: "physics-session-2", date: "Thứ 7, 18/05", dateClass: "text-gray-500", subject: "Vật lý 9A", teacher: "Thầy Minh - Phòng online 3", time: "19:00 - 20:30" }
    ],
    todayAgenda: [
      { id: "physics-today-1", time: "10:00 - 11:30", subject: "Vật lý 9A", detail: "Thầy Minh - Phòng online 3" },
      { id: "physics-today-2", time: "17:00 - 18:30", subject: "Thực hành", detail: "Lab 03" }
    ],
    reminders: [
      { id: "physics-reminder-1", text: "Mang theo sổ ghi chép và công thức nhanh." },
      { id: "physics-reminder-2", text: "Kiểm tra lại link phòng lab trước giờ học." },
      { id: "physics-reminder-3", text: "Xem trước bài thực hành hôm nay." }
    ],
    discussionClassFeed: [
      { id: "phy-msg-1", author: "Thầy Minh", likes: 0, message: "Nhắc lớp chuẩn bị bảng công thức chương Điện học trước buổi tối nay nhé.", role: "teacher", time: "07:30" },
      { id: "phy-msg-2", author: "Bảo Nam", likes: 1, message: "Thầy ơi, mình có cần in phiếu thí nghiệm không ạ?", role: "student", time: "07:48" },
      { id: "phy-msg-3", author: "Thầy Minh", likes: 4, message: "Không cần in, các em có thể chép bảng kết quả vào vở rồi chụp lại nộp sau buổi học.", role: "teacher", time: "07:55" }
    ],
    discussionTeacherFeed: [
      { id: "phy-teacher-1", author: "Thầy Minh", likes: 2, message: "Phần note giáo viên sẽ ưu tiên nhắc các lỗi thao tác thực hành để lớp tránh lặp lại.", role: "teacher", time: "08:14" },
      { id: "phy-teacher-2", author: "Thầy Minh", likes: 1, message: "Ai cần link lab dự phòng thì nhắn riêng tại đây trước giờ học 15 phút.", role: "teacher", time: "08:33" }
    ],
    discussionPinnedItems: [
      { id: "phy-pin-1", text: "Nộp ảnh bảng kết quả ngay sau giờ thực hành." },
      { id: "phy-pin-2", text: "Luôn ghi rõ đơn vị khi báo kết quả đo." },
      { id: "phy-pin-3", text: "Nếu gặp lỗi kết nối lab, báo ngay trong note lớp." }
    ],
    discussionSharedFiles: [
      { id: "phy-file-1", name: "Phiếu thực hành chương Điện.pdf", meta: "Thầy Minh • 05/05/2024", type: "pdf" },
      { id: "phy-file-2", name: "Bảng công thức nhanh.docx", meta: "Thầy Minh • 02/05/2024", type: "doc" },
      { id: "phy-file-3", name: "Kết quả mẫu.xlsx", meta: "Thầy Minh • 27/04/2024", type: "xls" }
    ]
  },
  literature: {
    className: "Ngữ văn 9A",
    teacher: "Cô Hoa",
    scheduleEvents: [
      { left: "calc(12.5%*1 + 60px)", top: 528, className: "bg-violet-50 border-violet-200", subject: "Ngữ văn 9A", teacher: "Cô Hoa", time: "11:00 - 12:30" },
      { left: "calc(12.5%*3 + 60px)", top: 864, className: "bg-pink-50 border-pink-200", subject: "Tập làm văn", teacher: "Cô Hoa", time: "18:00 - 19:30" },
      { left: "calc(12.5%*6 + 60px)", top: 960, className: "bg-violet-50 border-violet-200", subject: "Ngữ văn 9A", teacher: "Cô Hoa", time: "20:00 - 21:00" }
    ],
    upcoming: [
      { id: "literature-session-1", date: "Thứ 5, 16/05", dateClass: "text-red-500", subject: "Tập làm văn", teacher: "Cô Hoa - Phòng online 4", time: "18:00 - 19:30" },
      { id: "literature-session-2", date: "Chủ nhật, 19/05", dateClass: "text-gray-500", subject: "Ngữ văn 9A", teacher: "Cô Hoa - Phòng online 4", time: "20:00 - 21:00" }
    ],
    todayAgenda: [
      { id: "literature-today-1", time: "11:00 - 12:30", subject: "Ngữ văn 9A", detail: "Cô Hoa - Phòng online 4" },
      { id: "literature-today-2", time: "18:00 - 19:30", subject: "Tập làm văn", detail: "Chuẩn bị dàn ý" }
    ],
    reminders: [
      { id: "literature-reminder-1", text: "Đọc trước tác phẩm được giao." },
      { id: "literature-reminder-2", text: "Mang theo sổ tay ghi dẫn chứng hay." },
      { id: "literature-reminder-3", text: "Chuẩn bị câu hỏi để trao đổi trong lớp." }
    ],
    discussionClassFeed: [
      { id: "lit-msg-1", author: "Cô Hoa", likes: 0, message: "Lớp đọc lại đoạn trích và thử ghi ra 2 luận điểm chính trước buổi tối nay nhé.", role: "teacher", time: "08:00" },
      { id: "lit-msg-2", author: "Gia Hân", likes: 2, message: "Cô ơi, phần dẫn chứng em nên lấy ngắn thôi hay trích dài ạ?", role: "student", time: "08:12" },
      { id: "lit-msg-3", author: "Cô Hoa", likes: 4, message: "Các em nên chọn dẫn chứng ngắn, đúng ý và dành nhiều hơn cho phần phân tích nhé.", role: "teacher", time: "08:20" }
    ],
    discussionTeacherFeed: [
      { id: "lit-teacher-1", author: "Cô Hoa", likes: 2, message: "Cô sẽ ghim mẫu dàn ý tốt để cả lớp tham khảo trước khi viết đoạn văn.", role: "teacher", time: "08:36" },
      { id: "lit-teacher-2", author: "Cô Hoa", likes: 1, message: "Bạn nào cần góp ý riêng cho bài viết có thể để lại tin nhắn trong note giáo viên.", role: "teacher", time: "08:50" }
    ],
    discussionPinnedItems: [
      { id: "lit-pin-1", text: "Nộp đoạn văn hoàn chỉnh trước 20:30 tối Chủ nhật." },
      { id: "lit-pin-2", text: "Ưu tiên viết đúng luận điểm trước khi mở rộng." },
      { id: "lit-pin-3", text: "Nếu chưa rõ dàn ý, đặt câu hỏi ngay trong note lớp." }
    ],
    discussionSharedFiles: [
      { id: "lit-file-1", name: "Mẫu dàn ý phân tích.pdf", meta: "Cô Hoa • 04/05/2024", type: "pdf" },
      { id: "lit-file-2", name: "Checklist đoạn văn.docx", meta: "Cô Hoa • 02/05/2024", type: "doc" },
      { id: "lit-file-3", name: "Thang điểm bài viết.xlsx", meta: "Cô Hoa • 28/04/2024", type: "xls" }
    ]
  }
};
