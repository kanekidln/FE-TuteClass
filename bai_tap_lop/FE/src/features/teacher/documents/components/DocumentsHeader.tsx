import { CloudUpload, Plus } from "lucide-react";
import PaperClip from "./PaperClip";
import Tape from "./Tape";
import DoodleDecoration from "./DoodleDecoration";

function DocumentsHeader() {
  return (
    <header className="teacher-doc-header">
      <div className="teacher-doc-holes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <PaperClip className="doc-header-clip" />
      <Tape className="doc-header-tape" />
      <DoodleDecoration kind="loop" className="doc-header-loop" />
      <DoodleDecoration kind="star" className="doc-header-star" />

      <div className="teacher-doc-folder" aria-hidden="true">
        <span className="folder-paper one" />
        <span className="folder-paper two" />
        <span className="folder-body" />
        <span className="folder-label" />
      </div>

      <div className="teacher-doc-title-block">
        <h1>Tài liệu</h1>
      </div>

      <div className="teacher-doc-actions">
        <button className="doc-primary-button" type="button">
          <Plus size={25} />
          Thêm tài liệu
        </button>
        <button className="doc-outline-button" type="button">
          <CloudUpload size={25} />
          Tải tài liệu
        </button>
      </div>
    </header>
  );
}

export default DocumentsHeader;
