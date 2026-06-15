import { useMemo, useState } from "react";
import type { ResourceFileType, ResourceFilter, ResourceItem, ResourceNoteCard, ResourcesSpreadData } from "..";
import { SpreadHeader } from "./SpreadHeader";
import "./spreads.css";
import "./resourcesSpread.css";

type ResourcesSpreadProps = {
  data: ResourcesSpreadData;
};

const typeLabels: Record<ResourceFileType, string> = {
  doc: "Word",
  image: "Ảnh",
  link: "Link",
  pdf: "PDF",
  video: "Video"
};

const actionLabels: Record<ResourceItem["action"], string> = {
  download: "Tải xuống",
  open: "Mở link",
  view: "Xem"
};

function FileIcon({ type }: { type: ResourceFileType }) {
  const iconText = type === "image" ? "IMG" : type.toUpperCase();

  return <span className={`resources-file-icon resources-file-icon--${type}`}>{iconText}</span>;
}

function TypeIcon({ type }: { type: ResourceFilter["id"] | "total" }) {
  if (type === "all") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "link") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7L8 5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "image") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M4 5h16v14H4V5Zm3 10 3-3 3 3 2-2 3 3M8 9h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "total") {
    return (
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg fill="none" viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7V3Zm7 0v5h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ResourceNote({ note }: { note: ResourceNoteCard }) {
  return (
    <section className={`resources-note resources-note--${note.tone}`}>
      <div className="resources-note-pin" aria-hidden="true" />
      <div className="resources-note-title">
        <span>{note.title}</span>
        <TypeIcon type={note.tone === "green" ? "total" : note.tone === "purple" ? "pdf" : "image"} />
      </div>

      {note.items ? (
        <ul className="resources-note-list">
          {note.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {note.text ? <p className="resources-note-text">{note.text}</p> : null}

      {note.stats ? (
        <div className="resources-stats-list">
          {note.stats.map((stat) => (
            <div className="resources-stat-row" key={stat.id}>
              <span className={`resources-stat-icon resources-stat-icon--${stat.type}`}>
                <TypeIcon type={stat.type} />
              </span>
              <span>{stat.label}:</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      ) : null}

      {note.tone === "purple" ? (
        <button className="resources-note-link" type="button">
          Xem tất cả
          <svg fill="none" viewBox="0 0 24 24">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        </button>
      ) : null}
      {note.tone === "yellow" ? <span className="resources-note-smile">:)</span> : null}
    </section>
  );
}

export function ResourcesSpread({ data }: ResourcesSpreadProps) {
  const [activeFilter, setActiveFilter] = useState<ResourceFilter["id"]>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return data.items;
    }

    return data.items.filter((item) => item.type === activeFilter);
  }, [activeFilter, data.items]);

  return (
    <div className="resources-spread-shell">
      <SpreadHeader accent={data.accent} subtitle={data.subtitle} title={data.heading} />

      <div className="resources-spread-layout">
        <main className="resources-main-panel notebook-section-card">
          <div className="resources-tabs" aria-label="Kiểu tài liệu">
            <button className="resources-tab is-active" type="button">
              Tài liệu toàn môn
            </button>
            <button className="resources-tab" type="button">
              Theo buổi học
            </button>
          </div>

          <div className="resources-filter-row">
            {data.filters.map((filter) => (
              <button
                className={`resources-filter ${activeFilter === filter.id ? "is-active" : ""}`}
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
              >
                <TypeIcon type={filter.id} />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          <div className="resources-table">
            <div className="resources-table-head">
              <span>Tài liệu</span>
              <span>Buổi/Chủ đề</span>
              <span>Loại</span>
              <span>Ngày đăng</span>
              <span>Người đăng</span>
              <span>Thao tác</span>
            </div>
            <div className="resources-table-body">
              {filteredItems.map((item) => (
                <article className="resources-row" key={item.id}>
                  <div className="resources-file-cell">
                    <FileIcon type={item.type} />
                    <strong>{item.name}</strong>
                  </div>
                  <div>
                    <strong>{item.lesson}</strong>
                    <span>{item.topic}</span>
                  </div>
                  <div>
                    <span className={`resources-type-pill resources-type-pill--${item.type}`}>{typeLabels[item.type]}</span>
                  </div>
                  <div className="resources-date-cell">{item.date}</div>
                  <div>{item.owner}</div>
                  <div>
                    <button className={`resources-action resources-action--${item.action}`} type="button">
                      {actionLabels[item.action]}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        <aside className="resources-side-column">
          {data.notes.map((note) => (
            <ResourceNote key={note.id} note={note} />
          ))}
        </aside>
      </div>

      <footer className="resources-footer">
        <span>{data.footerLeft}</span>
        <span>{data.footerRight}</span>
      </footer>
    </div>
  );
}
