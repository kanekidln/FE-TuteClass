import { useState } from "react";
import {
  AlignLeft,
  Bold,
  CalendarDays,
  Clock3,
  CloudUpload,
  Eye,
  FileText,
  Italic,
  List,
  Megaphone,
  Pin,
  Save,
  Send,
  Underline,
  Users,
  X,
} from "lucide-react";
import { announcementTags } from "./data";
import { getTagClassName } from "./helper";
import type { AnnouncementTag, AttachedFile } from "./type";

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const [selectedTags, setSelectedTags] = useState<AnnouncementTag[]>(["Bài tập"]);
  const [isPinned, setIsPinned] = useState(true);
  const [sendMode, setSendMode] = useState<"now" | "scheduled">("now");
  const [pinUntilMode, setPinUntilMode] = useState<"forever" | "date">("forever");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([
    { name: "Huong-dan-bai-tap-chuong-2.pdf", size: "1.2 MB" },
  ]);

  const toggleTag = (tag: AnnouncementTag) => {
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  };

  return (
    <div className={`teacher-create-modal-layer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="teacher-create-modal-backdrop" onClick={onClose} type="button" aria-label="Đóng tạo thông báo" />
      <section className="teacher-create-modal" role="dialog" aria-modal="true" aria-label="Tạo thông báo chung">
        <div className="teacher-create-modal-paper">
          <button className="teacher-create-close" onClick={onClose} type="button" aria-label="Đóng">
            <X size={18} />
          </button>

          <header className="teacher-create-header">
            <span className="teacher-create-header-icon">
              <Megaphone size={26} />
            </span>
            <div>
              <h2>Tạo thông báo chung</h2>
              <p>Soạn thông báo gửi đến lớp và chọn cách hiển thị.</p>
            </div>
          </header>

          <div className="teacher-create-form">
            <label className="teacher-create-field teacher-create-field-title">
              <span>Tiêu đề thông báo <b>*</b></span>
              <div className="teacher-create-title-meta">
                {isPinned ? (
                  <span className="teacher-create-pin-preview" title="Thông báo được ghim">
                    <Pin size={13} />
                  </span>
                ) : null}
                {selectedTags.map((tag) => (
                  <span className={`teacher-create-title-tag ${getTagClassName(tag)}`} key={tag}>
                    {tag}
                    <button onClick={() => toggleTag(tag)} type="button" aria-label={`Xóa tag ${tag}`}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <input placeholder="Nhập tiêu đề ngắn gọn, rõ ràng..." maxLength={100} />
              <small>0/100</small>
            </label>

            <label className="teacher-create-field">
              <span>Nội dung thông báo <b>*</b></span>
              <div className="teacher-create-editor">
                <div className="teacher-create-toolbar" aria-label="Định dạng nội dung">
                  {[Bold, Italic, Underline, AlignLeft, List].map((Icon, index) => (
                    <button key={index} type="button">
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
                <textarea placeholder="Nhập nội dung thông báo..." maxLength={2000} />
                <small>0/2000</small>
              </div>
            </label>

            <section className="teacher-create-tags">
              <div className="teacher-create-section-label">Gắn tag <b>*</b></div>
              <div className="teacher-create-tag-grid">
                {announcementTags.map((tag) => (
                  <button
                    className={`${getTagClassName(tag)} ${selectedTags.includes(tag) ? "is-selected" : ""}`}
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    type="button"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p>Có thể chọn nhiều tag, tag sẽ hiển thị cạnh tiêu đề.</p>
            </section>

            <section className="teacher-create-options">
              <div className="teacher-create-pin-box">
                <div className="teacher-create-option-head">
                  <Pin size={18} />
                  <div>
                    <b>Ghim thông báo</b>
                    <p>Hiển thị ở mục Tin nhắn ghim.</p>
                  </div>
                  <button
                    className={`teacher-create-toggle ${isPinned ? "is-on" : ""}`}
                    onClick={() => setIsPinned((current) => !current)}
                    type="button"
                    aria-label="Bật ghim thông báo"
                    aria-pressed={isPinned}
                  >
                    <span />
                  </button>
                </div>

                {isPinned ? (
                  <div className="teacher-create-radio-stack">
                    <label>
                      <input checked={pinUntilMode === "forever"} name="pinUntil" onChange={() => setPinUntilMode("forever")} type="radio" />
                      Không giới hạn thời gian
                    </label>
                    <label>
                      <input checked={pinUntilMode === "date"} name="pinUntil" onChange={() => setPinUntilMode("date")} type="radio" />
                      Đến ngày
                      {pinUntilMode === "date" ? (
                        <span className="teacher-create-date"><CalendarDays size={14} /> 31/05/2024</span>
                      ) : null}
                    </label>
                  </div>
                ) : null}
              </div>
              <div className="teacher-create-send-card">
                <h3>Thời gian gửi</h3>
                <div className="teacher-create-send-choice">
                  <label>
                    <input checked={sendMode === "now"} name="sendTime" onChange={() => setSendMode("now")} type="radio" />
                    Gửi ngay
                  </label>
                  <label>
                    <input checked={sendMode === "scheduled"} name="sendTime" onChange={() => setSendMode("scheduled")} type="radio" />
                    Đặt lịch gửi
                  </label>
                </div>
                {sendMode === "scheduled" ? (
                  <div className="teacher-create-schedule-row">
                    <span><CalendarDays size={14} /> 22/05/2024</span>
                    <span><Clock3 size={14} /> 14:30</span>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="teacher-create-audience-card">
              <div className="teacher-create-audience-head">
                <Users size={18} />
                <h3>Đối tượng nhận</h3>
              </div>
              <div className="teacher-create-audience-options">
                <label><input defaultChecked name="audience" type="radio" /> Tất cả học sinh</label>
                <label><input name="audience" type="radio" /> Chọn nhóm/lớp</label>
                <label><input name="audience" type="radio" /> Chọn học sinh</label>
              </div>
            </section>

            <section className="teacher-create-upload-section">
              <div className="teacher-create-upload">
                {attachedFiles.length > 0 ? (
                  <div className="teacher-create-file-list">
                    <div className="teacher-create-upload-head">
                      <FileText size={20} />
                      <strong>File đã gắn</strong>
                      <span>{attachedFiles.length} file</span>
                    </div>
                    <div className="teacher-create-file-scroll">
                      {attachedFiles.map((file) => (
                        <div className="teacher-create-file-row" key={file.name}>
                          <FileText size={18} />
                          <span>
                            <b>{file.name}</b>
                            <small>{file.size}</small>
                          </span>
                          <button
                            onClick={() => setAttachedFiles((current) => current.filter((item) => item.name !== file.name))}
                            type="button"
                            aria-label={`Xóa file ${file.name}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="teacher-create-add-file" type="button">
                      <CloudUpload size={15} />
                      Thêm file
                    </button>
                  </div>
                ) : (
                  <>
                    <CloudUpload size={24} />
                    <strong>Kéo thả file hoặc chọn file</strong>
                    <span>PDF, DOC, PPT, XLS, PNG, JPG - tối đa 10MB</span>
                  </>
                )}
              </div>
            </section>

            <footer className="teacher-create-actions">
              <button className="teacher-create-draft" type="button">
                <Save size={16} />
                <span>Lưu nháp <small>Tự động lưu mỗi 30 giây</small></span>
              </button>
              <div>
                <button className="teacher-create-preview" type="button"><Eye size={16} /> Xem trước</button>
                <button className="teacher-create-submit" type="button"><Send size={16} /> Tạo thông báo</button>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}
