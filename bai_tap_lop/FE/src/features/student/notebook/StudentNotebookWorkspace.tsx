import { useEffect, useState } from "react";
import { FlipBook } from "./components/FlipBook";
import { NotebookLayout } from "./layouts/NotebookLayout";
import { classTabs, DEFAULT_NOTEBOOK_LOCATION, notebookPages, sectionMarkers, useNotebookController } from "./index";
import "./StudentNotebookWorkspace.css";

export function StudentNotebookWorkspace() {
  const navigation = useNotebookController(notebookPages, DEFAULT_NOTEBOOK_LOCATION);
  const currentPage = notebookPages[navigation.currentIndex];
  const [isJoinClassOpen, setIsJoinClassOpen] = useState(false);

  useEffect(() => {
    document.title = `Tuteclass - ${currentPage.navLabel} lớp ${currentPage.className}`;
  }, [currentPage]);

  return (
    <>
      <button
        aria-label="Tham gia lớp học"
        className="student-floating-join-note"
        onClick={() => setIsJoinClassOpen(true)}
        type="button"
      >
        +
      </button>

      <NotebookLayout
        activeClassKey={currentPage.classKey}
        activeSectionKey={currentPage.sectionKey}
        classItems={classTabs}
        isFlipping={Boolean(navigation.transition)}
        isSpiralHidden={navigation.spiralHidden}
        markerItems={sectionMarkers}
        onClassChange={navigation.goToClass}
        onNextClass={navigation.goToNextClass}
        onPreviousClass={navigation.goToPreviousClass}
        onSectionChange={navigation.goToSection}
      >
        <FlipBook
          accelerateTransition={navigation.accelerateTransition}
          currentIndex={navigation.currentIndex}
          faceBackOnly={navigation.faceBackOnly}
          onRequestNext={navigation.goNext}
          onRequestPrevious={navigation.goPrevious}
          onTransitionComplete={navigation.completeTransition}
          pages={notebookPages}
          transition={navigation.transition}
        />
      </NotebookLayout>

      {isJoinClassOpen ? (
        <div className="student-join-class-backdrop" onMouseDown={() => setIsJoinClassOpen(false)} role="presentation">
          <section
            aria-label="Tham gia lớp học"
            aria-modal="true"
            className="student-join-class-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button aria-label="Đóng popup tham gia lớp học" className="student-join-class-close" onClick={() => setIsJoinClassOpen(false)} type="button">
              ×
            </button>

            <header className="student-join-class-header">
              <span className="student-join-class-title-icon" aria-hidden="true">+</span>
              <div>
                <h2>Tham gia lớp học</h2>
                <p>Nhập mã lớp do giáo viên cung cấp để tham gia vào lớp học.</p>
              </div>
            </header>

            <div className="student-join-class-grid">
              <section className="student-join-class-form-card">
                <label htmlFor="student-class-code">Nhập mã lớp</label>
                <div className="student-join-input-wrap">
                  <span>#</span>
                  <input id="student-class-code" placeholder="Nhập mã lớp (ví dụ: ABCD12)" />
                  <button aria-label="Xóa mã lớp" type="button">×</button>
                </div>
                <p className="student-join-hint">Mã lớp thường gồm 6-8 ký tự bao gồm chữ và số.</p>

                <div className="student-join-divider"><span>HOẶC</span></div>

                <label htmlFor="student-class-link">Nhập link mời lớp (nếu có)</label>
                <div className="student-join-input-wrap is-muted">
                  <span>↗</span>
                  <input id="student-class-link" placeholder="https://tuteclass.vn/join/..." />
                </div>

                <div className="student-join-privacy-note">
                  <span>◇</span>
                  <p>Thông tin lớp học của bạn sẽ được bảo mật tuyệt đối. Chỉ giáo viên và thành viên lớp mới có quyền xem.</p>
                </div>

                <div className="student-join-actions">
                  <button className="student-join-cancel" onClick={() => setIsJoinClassOpen(false)} type="button">Hủy</button>
                  <button className="student-join-submit" type="button">Tham gia lớp học</button>
                </div>
              </section>

              <aside className="student-join-class-help">
                <section className="student-join-help-note">
                  <h3>Mã lớp ở đâu?</h3>
                  <ul>
                    <li>Giáo viên sẽ cung cấp mã lớp cho bạn.</li>
                    <li>Mã lớp có thể được gửi qua tin nhắn, email hoặc trên lớp học.</li>
                  </ul>
                  <div className="student-join-channels">
                    <span>Tin nhắn</span>
                    <span>Email</span>
                    <span>Trên lớp học</span>
                  </div>
                </section>

                <section className="student-join-examples">
                  <h3>Ví dụ mã lớp</h3>
                  <div>
                    {["MATH9A", "ENG9A1", "VLY9A_24", "A1B2C3", "9A2024", "KHTN9A"].map((code) => (
                      <span key={code}>{code}</span>
                    ))}
                  </div>
                </section>

                <section className="student-join-after-note">
                  <span>☆</span>
                  <p>Sau khi tham gia, lớp học sẽ xuất hiện trong <strong>Lớp học của tôi</strong> ở tab Lớp học.</p>
                </section>
              </aside>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
