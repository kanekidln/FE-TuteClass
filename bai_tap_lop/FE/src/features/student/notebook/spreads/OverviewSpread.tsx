import { useState } from "react";
import { PaperCard } from "../components/common/PaperCard";
import type { ClassKey } from "..";
import { overviewDashboardContent } from "../content/overviewDashboardContent";
import "./overviewSpread.css";

type OverviewSpreadProps = {
  classKey: ClassKey;
  className: string;
  subtitle: string;
};

type IconName = "chart" | "wallet" | "assignment" | "calendar";

function OverviewIcon({ name }: { name: IconName }) {
  if (name === "chart") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M4 18V6m0 12h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M7 15l3-3 3 2 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "wallet") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path
          d="M4 8.5A2.5 2.5 0 0 1 6.5 6H18a2 2 0 0 1 2 2v8.5a1.5 1.5 0 0 1-1.5 1.5H6.5A2.5 2.5 0 0 1 4 15.5z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M4 9.5h12.75a1.25 1.25 0 0 0 0-2.5H7.25" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.25" cy="13" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (name === "assignment") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M8 5.5h8M9 3.5h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path
          d="M7 4.5h10A1.5 1.5 0 0 1 18.5 6v12A1.5 1.5 0 0 1 17 19.5H7A1.5 1.5 0 0 1 5.5 18V6A1.5 1.5 0 0 1 7 4.5z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M8.5 10.5h6M8.5 14h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg fill="none" viewBox="0 0 24 24">
      <rect height="15" rx="2.25" stroke="currentColor" strokeWidth="1.8" width="15" x="4.5" y="5.5" />
      <path d="M8 3.5v4M16 3.5v4M4.5 10h15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M8.5 13.5h3M8.5 16.5h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function OverviewSpread({ classKey, className, subtitle }: OverviewSpreadProps) {
  const content = overviewDashboardContent[classKey];
  const [isTuitionOpen, setIsTuitionOpen] = useState(false);

  return (
    <div className="overview-spread">
      <section className="overview-hero">
        <div>
          <div className="overview-kicker">TRANG HỌC SINH</div>
          <h1 className="overview-title">
            Lớp <span>{className}</span>
          </h1>
          <p className="overview-subtitle">{subtitle}</p>
          <div className="overview-title-underline" />
        </div>
      </section>

      <section className="overview-card-grid">
        {content.quickCards.map((card, index) => (
          <PaperCard
            className={`overview-note-card overview-quick-card tone-${card.tone} ${index % 2 === 0 ? "is-pinned" : "has-tape"}`}
            key={card.title}
          >
            <div className="overview-note-label">{card.title}</div>
            <div className="overview-quick-body">
              <div className={`overview-icon-badge tone-${card.tone}`}>
                <OverviewIcon name={card.icon} />
              </div>
              <div className="overview-quick-content">
                <div className="overview-quick-value">{card.value}</div>
                <div className="overview-quick-meta">{card.meta}</div>
                <div className="overview-quick-detail">{card.detail}</div>
              </div>
            </div>
            {card.actionLabel ? (
              <button
                className={`overview-note-action tone-${card.tone}`}
                onClick={card.icon === "wallet" ? () => setIsTuitionOpen(true) : undefined}
                type="button"
              >
                {card.actionLabel}
              </button>
            ) : null}
          </PaperCard>
        ))}
      </section>

      <section className="overview-bottom-grid">
        <PaperCard className="overview-note-card overview-attendance-card is-pinned tone-teal">
          <div className="overview-note-label">{content.attendanceTitle}</div>
          <div className="overview-attendance-value">{content.attendanceValue}</div>
          <p className="overview-attendance-detail">{content.attendanceDetail}</p>
          <div className="overview-note-scribble coral" />
          <div className="overview-corner-glyph">◡</div>
        </PaperCard>

        <PaperCard className="overview-note-card overview-list-card has-tape tone-teal">
          <div className="overview-list-header">
            <div className="overview-note-label">{content.taskTitle}</div>
            <div className="overview-header-spark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="overview-note-scribble teal compact" />
          <div className="overview-task-list">
            {content.taskItems.map((item) => (
              <div className="overview-task-row" key={`${item.label}-${item.meta}`}>
                <div className="overview-task-check" aria-hidden="true" />
                <span>{item.label}</span>
                <strong>{item.meta}</strong>
              </div>
            ))}
          </div>
          <div className="overview-corner-glyph">◡</div>
        </PaperCard>

        <PaperCard className="overview-note-card overview-plan-card has-tape tone-coral">
            <div className="overview-list-header">
            <div className="overview-note-label coral-text">Kế hoạch học tập của mình</div>
            <div className="overview-heart" aria-hidden="true">
              ♡
            </div>
          </div>
          <div className="overview-plan-list">
            {content.planItems.map((item) => (
              <label className="overview-plan-item" key={item}>
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <div className="overview-note-scribble coral compact" />
          <div className="overview-plan-star" aria-hidden="true">
            ★
          </div>
        </PaperCard>
      </section>

      <footer className="overview-footer">
        <div className="overview-footer-note">
          <svg fill="none" viewBox="0 0 24 24">
            <path
              d="M9.5 18.5h5M10 21h4M8.5 14.5c-1.2-.9-2-2.4-2-4.1a5.5 5.5 0 0 1 11 0c0 1.7-.8 3.2-2 4.1-.7.5-1 1-1.1 1.5h-4.8c-.1-.5-.4-1-.1-1.5z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
          <span>{content.footerLeft}</span>
        </div>
        <div className="overview-footer-quote">{content.footerRight}</div>
      </footer>

      {isTuitionOpen ? (
        <div className="overview-tuition-backdrop" role="presentation" onMouseDown={() => setIsTuitionOpen(false)}>
          <section
            aria-label="Chi tiết học phí lớp học"
            aria-modal="true"
            className="overview-tuition-modal"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button aria-label="Đóng popup học phí" className="overview-tuition-close" onClick={() => setIsTuitionOpen(false)} type="button">
              ×
            </button>

            <header className="overview-tuition-header">
              <span className="overview-tuition-header-icon">
                <OverviewIcon name="wallet" />
              </span>
              <div>
                <h2>Học phí lớp học</h2>
                <p>Theo dõi hóa đơn, trạng thái thanh toán và lịch sử công nợ của {className}.</p>
              </div>
            </header>

            <div className="overview-tuition-grid">
              <section className="overview-tuition-panel">
                <h3>1. Xem hóa đơn</h3>
                <div className="overview-invoice-card is-current">
                  <div className="overview-invoice-icon">PDF</div>
                  <div>
                    <strong>Hóa đơn #INV-2405-00123</strong>
                    <span>Lớp: {className}</span>
                    <span>Tháng: Tháng 05/2024</span>
                    <button type="button">Xem hóa đơn PDF</button>
                  </div>
                  <div className="overview-invoice-meta">
                    <strong>1.200.000 đ</strong>
                    <span>Ngày phát hành: 02/05/2024</span>
                    <span>Hạn thanh toán: 15/05/2024</span>
                  </div>
                </div>

                <div className="overview-invoice-card">
                  <div className="overview-invoice-icon muted">PDF</div>
                  <div>
                    <strong>Hóa đơn #INV-2404-00105</strong>
                    <span>Lớp: {className}</span>
                    <span>Tháng: Tháng 04/2024</span>
                    <button type="button">Xem hóa đơn PDF</button>
                  </div>
                  <div className="overview-invoice-meta">
                    <strong>1.200.000 đ</strong>
                    <span>Ngày phát hành: 02/04/2024</span>
                    <span>Hạn thanh toán: 15/04/2024</span>
                  </div>
                </div>
                <button className="overview-tuition-wide-button" type="button">Xem tất cả hóa đơn →</button>
              </section>

              <section className="overview-tuition-panel overview-payment-panel">
                <h3>2. Trạng thái thanh toán</h3>
                <div className="overview-payment-status">
                  <div className="overview-payment-check">✓</div>
                  <div>
                    <strong>Đã thanh toán</strong>
                    <span>Hoàn thành</span>
                    <p>Hạn thanh toán: 15/05/2024. Bạn đã thanh toán đúng hạn, cảm ơn bạn!</p>
                  </div>
                </div>
                <div className="overview-payment-stats">
                  <div><span>Tổng tiền</span><strong>1.200.000 đ</strong></div>
                  <div><span>Đã thanh toán</span><strong>1.200.000 đ</strong></div>
                  <div><span>Còn lại</span><strong className="danger">0 đ</strong></div>
                  <div><span>Đúng hạn</span><strong>100%</strong></div>
                </div>

                <div className="overview-payment-history-head">
                  <h3>3. Lịch sử thanh toán / công nợ</h3>
                  <div>Công nợ hiện tại <strong>0 đ</strong></div>
                </div>
                <div className="overview-payment-table">
                  {[
                    ["12/05/2024", "INV-2405-00123", "05/2024", "1.200.000 đ", "Chuyển khoản", "Đã thanh toán"],
                    ["10/04/2024", "INV-2404-00105", "04/2024", "1.200.000 đ", "Chuyển khoản", "Đã thanh toán"],
                    ["11/03/2024", "INV-2403-00087", "03/2024", "1.200.000 đ", "Chuyển khoản", "Đã thanh toán"],
                    ["02/06/2024", "INV-2406-00145", "06/2024", "1.200.000 đ", "—", "Chưa thanh toán"]
                  ].map((row) => (
                    <div className="overview-payment-row" key={row[1]}>
                      {row.map((cell, cellIndex) => (
                        <span className={cellIndex === 5 ? (cell === "Đã thanh toán" ? "paid" : "unpaid") : ""} key={`${row[1]}-${cell}`}>
                          {cell}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
