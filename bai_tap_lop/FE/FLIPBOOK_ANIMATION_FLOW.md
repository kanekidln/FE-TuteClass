# Flipbook Animation Flow

## Mục tiêu

File này mô tả cách animation lật sổ trong `compile_ui` đang hoạt động, gồm:

- luồng điều hướng
- state điều khiển animation
- thứ tự mount/unmount page
- thời điểm đổi mặt giấy
- thời điểm ẩn/hiện spiral binding
- cách xử lý khi user bấm nhanh nhiều lần

## Hành vi tổng quát

- `note lớn` phía trên:
  Chỉ đổi lớp (`class`), không chạy animation lật.

- `note nhỏ` bên phải:
  Đổi `section` trong lớp hiện tại và chạy animation lật trang.

- notebook ở trạng thái nghỉ:
  Chỉ mount page hiện tại.

- notebook khi đang lật:
  Chỉ mount các page cần thiết cho cú lật hiện tại.

## Các file chính

- `src/hooks/useFlipBookNavigation.ts`
  Điều phối navigation, timer và queue click.

- `src/components/FlipBook/FlipBook.tsx`
  Render page hiện tại, page dưới và page đang lật.

- `src/components/FlipBook/FlipBook.css`
  Toàn bộ transform 3D, mặt trước/mặt sau, curl, shadow và thời gian lật.

- `src/layouts/NotebookLayout/NotebookLayout.tsx`
  Nối state animation xuống shell notebook.

- `src/components/SpiralBinding/SpiralBinding.css`
  Điều khiển thời điểm spiral binding ẩn/hiện lại.

## State chính

Trong `useFlipBookNavigation.ts` hiện có các state quan trọng:

- `currentIndex`
  Page hiện tại theo thứ tự trong `notebookPages`.

- `transition`
  Thông tin cú lật đang chạy:
  `fromIndex`, `toIndex`, `forward`.

- `faceBackOnly`
  Dùng để đổi page đang lật sang mặt sau trống ở nửa sau animation.

- `spiralHidden`
  Dùng để ẩn spiral binding trong giai đoạn cần che nó khỏi page lật.

- `pendingNavigationRef`
  Giữ click cuối cùng nếu user bấm thêm khi animation chưa xong.

## Luồng khi bấm note nhỏ bên phải

### 1. Xác định page đích

Khi user bấm note nhỏ:

- lấy `classKey` hiện tại
- lấy `sectionKey` vừa bấm
- tra `pageLookup`
- tìm ra `targetIndex`

Sau đó gọi `goToIndex(targetIndex, { animate: true })`.

### 2. Nếu chưa có animation đang chạy

Hook gọi `startAnimatedTransition(targetIndex)`.

Các bước:

- clear timer cũ
- lấy `fromIndex = currentIndex`
- tính `forward = targetIndex > fromIndex`
- `setSpiralHidden(true)`
- `setFaceBackOnly(false)`
- `setCurrentIndex(targetIndex)`
- `setTransition({ fromIndex, toIndex: targetIndex, forward })`

Từ thời điểm này, `FlipBook` biết là đang có animation.

### 3. Nếu đang có animation rồi

Click mới sẽ không bị bỏ ngay.

Thay vào đó:

- lưu vào `pendingNavigationRef`
- chỉ giữ yêu cầu mới nhất

Khi cú lật hiện tại kết thúc, yêu cầu này sẽ chạy ngay sau đó.

## Cách `FlipBook` render page

### Trạng thái nghỉ

Nếu `transition === null`:

- chỉ render 1 `PageFrame`
- mode = `static`

### Trạng thái đang lật tiến tới

Nếu `transition.forward === true`:

- render page đích ở dưới với mode `under`
- render page cũ ở trên với mode `outgoing`

Nghĩa là:

- page cũ là tờ giấy đang quay đi
- page đích nằm sẵn bên dưới

### Trạng thái đang lật lùi

Nếu `transition.forward === false`:

- render page cũ ở dưới với mode `under`
- render page đích ở trên với mode `incoming`

Nghĩa là:

- page đích quay từ trạng thái gập vào để mở ra

## Thời gian lật

Trong `FlipBook.tsx` hiện có:

```ts
const TURN_DURATION_MS = 1080;
```

Giá trị này được đẩy xuống CSS qua biến:

```tsx
style={{ ["--turn-duration" as string]: `${TURN_DURATION_MS}ms` }}
```

CSS dùng biến này để chạy:

- `transform`
- curl overlay
- shadow overlay

## Đổi sang mặt sau giấy trống

Trong `useFlipBookNavigation.ts` hiện có:

```ts
const OUTGOING_FACE_SWAP_MS = 560;
```

Ý nghĩa:

- chỉ áp dụng cho cú lật `forward`
- sau `560ms`, page đang quay đi sẽ bật `faceBackOnly = true`

Khi đó CSS:

```css
.spread-page.face-back-only .spread-face-front {
  opacity: 0;
  visibility: hidden;
}
```

Kết quả:

- không lộ mirrored content
- mặt trước biến mất ở nửa sau cú lật
- chỉ còn mặt sau giấy trống

## Spiral binding ẩn và hiện lại thế nào

Trong `useFlipBookNavigation.ts` hiện có:

```ts
const SPIRAL_REVEAL_MS = 120;
```

Luồng:

- bắt đầu lật:
  `setSpiralHidden(true)`

- sau `SPIRAL_REVEAL_MS`:
  `setSpiralHidden(false)`

Trong `NotebookLayout.tsx`, state này được đẩy xuống shell:

- `notebook-container spiral-hidden`

Trong `SpiralBinding.css`:

```css
.notebook-container.spiral-hidden .notebook-spiral {
  opacity: 0;
  transition-duration: .14s;
}
```

và mặc định:

```css
.notebook-spiral {
  transition: opacity .01s ease;
}
```

Ý nghĩa:

- spiral ẩn đi khi bắt đầu lật
- spiral hiện lại sớm ở pha cuối
- tốc độ hiện lại nhanh hơn tốc độ ẩn đi

## Kết thúc animation

Khi `PageFrame` đang lật nhận `transitionend`:

- gọi `onTransitionComplete`

Trong hook:

- clear timer
- `setFaceBackOnly(false)`
- `setSpiralHidden(false)`
- `setTransition(null)`

Sau đó:

- `requestAnimationFrame`
- gọi `flushPendingNavigation()`

Nếu có click bị giữ trong lúc đang lật:

- navigation mới sẽ chạy ngay sau frame kế tiếp

## Luồng bấm nhanh nhiều lần

Ví dụ:

1. user đang ở page A
2. bấm sang page B
3. trong lúc A -> B đang lật, user bấm tiếp sang page C

Kết quả hiện tại:

- animation A -> B vẫn chạy xong
- yêu cầu sang C được giữ trong `pendingNavigationRef`
- ngay khi A -> B kết thúc, animation B -> C chạy tiếp

Hệ thống hiện tại đang dùng cơ chế:

- không queue vô hạn
- chỉ giữ yêu cầu mới nhất

Điều này giúp UI vẫn ổn định nếu user bấm rất nhanh.

## Chỗ nên chỉnh khi cần tinh chỉnh cảm giác lật

### Độ dài toàn bộ cú lật

File:
`src/components/FlipBook/FlipBook.tsx`

```ts
const TURN_DURATION_MS = 1080;
```

### Thời điểm đổi sang mặt sau trống

File:
`src/hooks/useFlipBookNavigation.ts`

```ts
const OUTGOING_FACE_SWAP_MS = 560;
```

### Thời điểm spiral hiện lại

File:
`src/hooks/useFlipBookNavigation.ts`

```ts
const SPIRAL_REVEAL_MS = 120;
```

### Tốc độ fade spiral

File:
`src/components/SpiralBinding/SpiralBinding.css`

```css
.notebook-spiral {
  transition: opacity .01s ease;
}

.notebook-container.spiral-hidden .notebook-spiral {
  transition-duration: .14s;
}
```

## Tóm tắt ngắn

- note lớn đổi lớp ngay, không lật
- note nhỏ mới kích hoạt lật trang
- trạng thái nghỉ chỉ mount 1 page
- trạng thái lật chỉ mount đúng các page cần dùng
- page lật tiến tới sẽ đổi sang mặt sau trống ở nửa sau animation
- spiral binding bị ẩn lúc bắt đầu lật và hiện lại sớm ở pha cuối
- click nhanh khi đang lật sẽ được giữ lại và chạy tiếp sau cú lật hiện tại
