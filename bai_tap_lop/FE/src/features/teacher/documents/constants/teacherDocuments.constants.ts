import type { ClassDocumentItem, SessionDocumentItem, TeacherDocumentTab, TeacherDocumentTypeTab } from "../types/teacherDocuments.types";

export const teacherDocumentTabs: TeacherDocumentTab[] = [
  { id: "class", label: "Theo lớp" },
  { id: "sessions", label: "Theo buổi" },
];

export const teacherDocumentTypeTabs: TeacherDocumentTypeTab[] = [
  { id: "link", label: "Link" },
  { id: "file", label: "File" },
  { id: "image", label: "Ảnh" },
];

export const sessionDocuments: SessionDocumentItem[] = [
  { id: "session-01", sessionLabel: "Buổi 01", title: "Phương trình bậc nhất", linkCount: 3, fileCount: 2, imageCount: 4, tone: "purple" },
  { id: "session-02", sessionLabel: "Buổi 02", title: "Hệ thức lượng", linkCount: 2, fileCount: 1, imageCount: 3, tone: "green" },
  { id: "session-03", sessionLabel: "Buổi 03", title: "Ôn tập chương 1", linkCount: 4, fileCount: 2, imageCount: 2, tone: "orange" },
  { id: "session-04", sessionLabel: "Buổi 04", title: "Tổng kết học kỳ I", linkCount: 1, fileCount: 1, imageCount: 5, tone: "blue" },
  { id: "session-05", sessionLabel: "Buổi 05", title: "Bất phương trình bậc nhất", linkCount: 3, fileCount: 2, imageCount: 3, tone: "purple" },
  { id: "session-06", sessionLabel: "Buổi 06", title: "Hàm số bậc nhất", linkCount: 2, fileCount: 2, imageCount: 4, tone: "green" },
];

export const linkDocuments: ClassDocumentItem[] = [
  { id: "link-review-1", title: "Link ôn tập chương 1", type: "link" },
  { id: "link-video", title: "Video bài giảng", type: "link" },
  { id: "link-homework-form", title: "Form bài tập về nhà", type: "link" },
  { id: "link-reference", title: "Website tài liệu tham khảo", type: "link" },
  { id: "link-kahoot", title: "Kahoot! ôn tập trắc nghiệm", type: "link" },
  { id: "link-padlet", title: "Padlet thảo luận nhóm", type: "link" },
  { id: "link-extra", title: "Link bài tập bổ sung", type: "link" },
  { id: "link-library", title: "Kho bài giảng online", type: "link" },
];

export const fileDocuments: ClassDocumentItem[] = [
  { id: "file-outline", title: "Đề cương ôn tập chương 1.pdf", type: "file", fileKind: "pdf" },
  { id: "file-linear", title: "Bài tập phương trình bậc nhất.docx", type: "file", fileKind: "doc" },
  { id: "file-worksheet", title: "Phiếu học tập buổi 03.pdf", type: "file", fileKind: "pdf" },
  { id: "file-answer", title: "Đáp án tham khảo.pdf", type: "file", fileKind: "pdf" },
  { id: "file-slides", title: "Slide bài giảng hệ thức lượng.pptx", type: "file", fileKind: "ppt" },
  { id: "file-rubric", title: "Bảng tiêu chí đánh giá.xlsx", type: "file", fileKind: "sheet" },
  { id: "file-project", title: "Hướng dẫn dự án nhóm.docx", type: "file", fileKind: "doc" },
];

export const imageDocuments: ClassDocumentItem[] = [
  { id: "image-board-01", title: "Ảnh bảng buổi 01", type: "image", thumbnailTone: "mindmap" },
  { id: "image-mindmap", title: "Sơ đồ tư duy chương 1", type: "image", thumbnailTone: "board" },
  { id: "image-illustration", title: "Hình minh họa bài tập", type: "image", thumbnailTone: "notebook" },
  { id: "image-student-work", title: "Bài làm mẫu của học sinh", type: "image", thumbnailTone: "group" },
  { id: "image-formulas", title: "Ảnh công thức cần nhớ", type: "image", thumbnailTone: "poster" },
  { id: "image-project", title: "Sản phẩm học sinh", type: "image", thumbnailTone: "model" },
];

export const classDocumentsByType = {
  link: linkDocuments,
  file: fileDocuments,
  image: imageDocuments,
} satisfies Record<string, ClassDocumentItem[]>;
