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
    ]
  }
};
