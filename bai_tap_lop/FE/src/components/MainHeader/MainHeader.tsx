import "./MainHeader.css";

export function MainHeader() {
  return (
    <>
      <div className="header-hover-zone" aria-hidden="true" />
      <header className="app-header max-w-[1400px] mx-auto bg-white/90 backdrop-blur-sm rounded-full px-8 py-3 mb-0 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <div className="text-tute-orange font-black text-2xl tracking-tighter" data-purpose="logo">
            tute<span className="text-gray-800">class</span>
          </div>
          <nav className="flex gap-6 font-semibold text-gray-600">
            <a className="flex items-center gap-2 hover:text-tute-orange transition-colors" href="#">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              Trang chủ
            </a>
            <a className="flex items-center gap-2 text-tute-orange border-b-2 border-tute-orange pb-1" href="#">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              Lớp học
            </a>
            <a className="flex items-center gap-2 hover:text-tute-orange transition-colors" href="#">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              Tài nguyên
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 border rounded-full bg-gray-50">
            <img
              alt="Minh Anh"
              className="w-8 h-8 rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBnLyEpI_CUf7rvWAoybOJGIxGnte_p3Cul7259LH1YF2pIQbtfz9NXf1UhV-3jPhfDvSfPhVtVex174OdU5FHF422eX6hwaFh6fj_Uo1VhpI_rFXPUwidh4Idy6shCHGcBXsVZkrhuN0fQT3CjpEjcDFoMv_GDICngrTGLYXJ2b9oavDZ69D8P5GbK01bLfvaaIRNzoZCS4ig4AUZL17Pu0cPOa4CyJ3sfcTlMM3Ckysjxf6BFRxDB0J5hP0r8QuDc-SiaOcTnfkT"
            />
            <span className="text-sm font-bold">Minh Anh</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            Đăng xuất
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
