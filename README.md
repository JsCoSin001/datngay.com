# FoodGo Landing Page

Landing page FoodGo bằng React, TypeScript, Tailwind CSS, Lucide và Vite. Nội dung, ảnh món ăn và font Be Vietnam Pro được phục vụ từ dự án.

## Chạy trên máy phát triển

Yêu cầu Node.js 20+ và npm.

```bash
npm ci
npm run dev
```

Mở địa chỉ do Vite hiển thị. Kiểm tra bản dựng bằng `npm run build`, sau đó dùng `npm run preview` nếu cần xem bản production.

## Dữ liệu demo

Danh mục, nhà hàng, thực đơn, giá, đánh giá, ưu đãi và thời gian giao hàng là dữ liệu minh họa trong `src/data.ts`. Nhập địa chỉ để thử tìm kiếm, lọc nhà hàng, xem thực đơn, thêm món vào giỏ và xác nhận đơn mô phỏng. Không có backend, kiểm tra khu vực, thanh toán hay đơn hàng thật. Các biểu mẫu đăng nhập và đối tác cũng chỉ mô phỏng trong phiên trình duyệt.

Ảnh được lưu trong `public/images`, không cần dịch vụ hình ảnh bên ngoài. Cập nhật giao diện trong `src/App.tsx` và `src/styles.css`.
