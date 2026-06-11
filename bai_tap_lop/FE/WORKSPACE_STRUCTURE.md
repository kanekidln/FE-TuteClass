# FE Workspace Structure

Tai lieu nay mo ta cau truc cac thanh phan chinh trong `FE/`, tap trung vao 2 workspace hien co:

- `student`: giao dien cuon so hoc vien
- `teacher`: giao dien lich day giao vien

## 1. Tong quan

Entry point cua app:

- `src/main.tsx`: mount React app
- `src/App.tsx`: chon workspace dang hien thi

App hien tai dung hash de chuyen workspace:

- `#student` -> `StudentNotebookWorkspace`
- `#teacher` -> `TeacherScheduleWorkspace`

Header dung chung cho ca 2 workspace:

- `src/components/MainHeader/MainHeader.tsx`

## 2. Student Workspace

Thu muc goc:

- `src/features/student/notebook/`

Thanh phan root:

- `StudentNotebookWorkspace.tsx`

Nhiem vu:

- khoi tao notebook navigation
- lay trang hien tai
- render `NotebookLayout`
- render `FlipBook`

### 2.1 Cau truc chuc nang

#### `builders/`

- `notebookPages.ts`

Nhiem vu:

- build danh sach page cho cuon so
- ket hop `classTabs` + `sectionMarkers` + noi dung mock

#### `config/`

- `navigation.ts`

Nhiem vu:

- dinh nghia tab lop hoc
- dinh nghia marker section ben phai
- dinh nghia vi tri notebook mac dinh

#### `content/`

- `classProfiles.ts`
- `overviewDashboardContent.ts`
- `standardSpreadContent.ts`

Nhiem vu:

- chua mock data cho tung lop
- chua noi dung trang tong quan
- chua copy cho cac spread overview/assignments/resources/discussion

#### `domain/`

- `types.ts`

Nhiem vu:

- dinh nghia type cho page, section, event, schedule, content card, notebook state

#### `hooks/`

- `useNotebookIndex.ts`
- `useFlipTransition.ts`
- `useNotebookController.ts`

Nhiem vu:

- map `classKey + sectionKey` -> page index
- dieu khien animation lat trang
- cung cap API dieu huong cho workspace student

### 2.2 Layout va Components

#### `layouts/NotebookLayout/`

- `NotebookLayout.tsx`
- `NotebookLayout.css`

Nhiem vu:

- render shell chung cua cuon so
- gan `ClassTabs`, `SpiralBinding`, viewport va `SidePageMarkers`

#### `components/FlipBook/`

- `FlipBook.tsx`
- `FlipBook.css`

Nhiem vu:

- render spread hien tai
- render page stack khi lat
- xu ly keyboard next/previous
- apply hieu ung 3D flip

#### `components/ClassTabs/`

- `ClassTabs.tsx`
- `ClassTabs.css`

Nhiem vu:

- chuyen giua cac lop hoc
- hien thi tab lop theo phan tren cua cuon so

#### `components/SidePageMarkers/`

- `SidePageMarkers.tsx`
- `SidePageMarkers.css`

Nhiem vu:

- chuyen giua cac section trong cuon so
- hien thi marker dung ben phai

#### `components/SpiralBinding/`

- `SpiralBinding.tsx`
- `SpiralBinding.css`

Nhiem vu:

- render phan lo xo cua notebook

#### `components/common/`

- `PaperCard.tsx`

Nhiem vu:

- wrapper card dung lai cho cac note/panel paper style

### 2.3 Spreads cua Student

Thu muc:

- `spreads/`

Gom:

- `SpreadHeader.tsx`
- `ScheduleSpread.tsx`
- `StandardSpread.tsx`
- `OverviewSpread.tsx`
- `spreads.css`
- `overviewSpread.css`

Nhiem vu:

- `SpreadHeader`: header chung cho mot so spread
- `ScheduleSpread`: layout section lich hoc
- `StandardSpread`: layout dung cho assignments/resources/discussion
- `OverviewSpread`: layout rieng cho trang tong quan

### 2.4 Schedule subcomponents

Thu muc:

- `pages/SchedulePage/components/`

Gom:

- `ScheduleHeader.tsx`
- `WeeklySchedule.tsx`
- `MiniCalendar.tsx`
- `UpcomingSessions.tsx`

Nhiem vu:

- tach nho cac block trong trang lich hoc de tai su dung trong `ScheduleSpread`

## 3. Teacher Workspace

Thu muc goc:

- `src/features/teacher/schedule/`

Thanh phan root:

- `TeacherScheduleWorkspace.tsx`

Nhiem vu:

- set title cho workspace teacher
- render `TeacherSchedulePage`
- ap style shell rieng qua `teacherShell.css`

### 3.1 Cau truc chuc nang

#### `constants/`

- `teacherSchedule.constants.ts`

Nhiem vu:

- mock data lich day theo tuan
- mock data lich theo thang
- mock danh sach lop hom nay
- mock data form tao/sua lich
- mock conflict va weekly slots

#### `types/`

- `teacherSchedule.types.ts`

Nhiem vu:

- dinh nghia type cho lesson, weekday, month day, modal props, form state

### 3.2 Teacher page chinh

Thu muc:

- `components/TeacherSchedulePage/`

Gom:

- `TeacherSchedulePage.tsx`
- `TeacherSchedulePage.css`

Nhiem vu:

- trang root cua workspace teacher
- quan ly state modal
- render:
  - title note
  - weekly teaching schedule
  - monthly calendar
  - danh sach lop hom nay

### 3.3 Teacher modals

#### `components/LessonDetailModal/`

- `LessonDetailModal.tsx`
- `LessonDetailModal.css`

Nhiem vu:

- hien thi chi tiet mot buoi hoc

#### `components/CreateScheduleModal/`

- `CreateScheduleModal.tsx`
- `CreateScheduleModal.css`

Nhiem vu:

- tao lich hoc moi
- xu ly du lieu form tao lich

#### `components/EditScheduleModal/`

- `EditScheduleModal.tsx`
- `EditScheduleModal.css`

Nhiem vu:

- sua lich hoc da ton tai
- xu ly du lieu form sua lich

## 4. Shared Layer

### Shared app shell

- `src/components/MainHeader/`

Nhiem vu:

- dung chung cho student va teacher
- co workspace switcher `Hoc vien / Giao vien`

### Shared global styles

- `src/styles/global.css`
- `src/styles/variables.css`
- `src/styles/notebook.css`

Nhiem vu:

- font tokens
- mau dung chung
- background chung
- shell notebook dung cho workspace student

## 5. Luong render hien tai

1. `main.tsx` mount `App`
2. `App.tsx` doc hash va chon workspace
3. `MainHeader` hien thi tren cung
4. Neu `student`:
   - render `StudentNotebookWorkspace`
   - workspace nay render `NotebookLayout + FlipBook`
   - `FlipBook` chon spread tu `notebookPages`
5. Neu `teacher`:
   - render `TeacherScheduleWorkspace`
   - workspace nay render `TeacherSchedulePage`
   - `TeacherSchedulePage` mo/ dong modal theo state noi bo

## 6. Ghi chu nhanh

- Student va teacher hien tai la 2 feature tach biet ro rang.
- Header va global style la lop shared.
- Student uu tien animation notebook va page model.
- Teacher uu tien dashboard + modal workflow.
- Du lieu cua ca 2 workspace hien tai van chu yeu la mock/static.
