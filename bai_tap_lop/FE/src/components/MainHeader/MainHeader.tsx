import "./MainHeader.css";

type Workspace = "student" | "teacher";
type ActiveFeature = "landing" | "schedule" | "assignments";

type MainHeaderProps = {
  activeFeature?: ActiveFeature;
  activeWorkspace?: Workspace;
  onWorkspaceChange?: (workspace: Workspace) => void;
};

export function MainHeader({ activeFeature, activeWorkspace = "student", onWorkspaceChange }: MainHeaderProps) {
  const homeHref = activeWorkspace === "teacher" ? "#teacher/landing" : "#student";
  const classHref = activeWorkspace === "teacher" ? "#teacher/schedule" : "#student";
  const resourceHref = activeWorkspace === "teacher" ? "#teacher/assignments" : "#student";
  const isClassActive = activeWorkspace === "student" || activeFeature === "schedule";
  const isResourceActive = activeFeature === "assignments";

  return (
    <>
      <div className="header-hover-zone" aria-hidden="true" />
      <header className="app-header">
        <div className="app-header__surface">
          <div className="app-header__left">
            <div className="app-header__brand" data-purpose="logo">
              tute<span>class</span>
            </div>

            <nav className="app-header__nav" aria-label="Main navigation">
              <a className={`app-header__nav-link ${activeFeature === "landing" ? "is-active" : ""}`} href={homeHref}>
                <svg className="app-header__nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Trang chủ
              </a>
              <a className={`app-header__nav-link ${isClassActive ? "is-active" : ""}`} href={classHref}>
                <svg className="app-header__nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Lớp học
              </a>
              <a className={`app-header__nav-link ${isResourceActive ? "is-active" : ""}`} href={resourceHref}>
                <svg className="app-header__nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Tài nguyên
              </a>
            </nav>
          </div>

          <div className="app-header__right">
            <div className="workspace-switch" aria-label="Workspace switcher" role="tablist">
              <button
                className={`workspace-switch__button ${activeWorkspace === "student" ? "is-active" : ""}`}
                onClick={() => onWorkspaceChange?.("student")}
                role="tab"
                type="button"
              >
                Học viên
              </button>
              <button
                className={`workspace-switch__button ${activeWorkspace === "teacher" ? "is-active" : ""}`}
                onClick={() => onWorkspaceChange?.("teacher")}
                role="tab"
                type="button"
              >
                Giáo viên
              </button>
            </div>

            <div className="app-header__notification">
              <svg className="app-header__notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="app-header__notification-badge">2</span>
            </div>

            <div className="app-header__profile">
              <img
                alt="Minh Anh"
                className="app-header__avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBnLyEpI_CUf7rvWAoybOJGIxGnte_p3Cul7259LH1YF2pIQbtfz9NXf1UhV-3jPhfDvSfPhVtVex174OdU5FHF422eX6hwaFh6fj_Uo1VhpI_rFXPUwidh4Idy6shCHGcBXsVZkrhuN0fQT3CjpEjcDFoMv_GDICngrTGLYXJ2b9oavDZ69D8P5GbK01bLfvaaIRNzoZCS4ig4AUZL17Pu0cPOa4CyJ3sfcTlMM3Ckysjxf6BFRxDB0J5hP0r8QuDc-SiaOcTnfkT"
              />
              <span className="app-header__profile-name">Minh Anh</span>
              <svg className="app-header__profile-caret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>

            <button className="app-header__logout" type="button">
              Đăng xuất
              <svg className="app-header__logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
