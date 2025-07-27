# User Interface – Food Fast E-commerce

This is the customer-facing frontend for the Food Fast E-commerce platform. It allows users to browse products, manage their cart, place orders, and manage their profiles. Built with React, Vite, and Material UI for a modern, responsive experience.

## Features

- **Product Browsing & Search:** Explore products with category filters, search, sorting, and price range selection.
- **Shopping Cart:** Add, update, or remove products from your cart. View order summary and proceed to checkout.
- **User Authentication:** Register, login (including Google OAuth), and manage sessions securely.
- **Order Placement & Tracking:** Place orders, view order history, and track order status.
- **Profile Management:** Update personal information and shipping address.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **React 18** with Vite for fast development and HMR
- **Material UI (MUI)** for UI components
- **Redux Toolkit** for state management
- **Axios** for API requests
- **Formik & Yup** for forms and validation
- **Framer Motion** for animations
- **React Router v6** for routing
- **Docker & Nginx** for production deployment

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm v7 or higher

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the `User` directory:

```env
VITE_API_URL=http://localhost:8000
VITE_USER_API_URL=http://localhost:8002
```

## Docker Deployment

Build and run the User interface with Docker:

```bash
docker build -t user-interface .
docker run -p 80:80 user-interface
```

## Project Structure

```
User/
├── public/           # Static assets
├── src/
│   ├── api/          # API service logic
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Main app pages (Home, Products, Cart, etc.)
│   ├── store/        # Redux store and slices
│   ├── theme.js      # MUI theme customization
│   └── utils/        # Utility functions
├── Dockerfile
├── nginx.conf
├── package.json
└── vite.config.js
```

## Contributing

1. Create a new branch for your feature or bugfix.
2. Make your changes and commit them.
3. Submit a pull request for review.

## License

MIT

## 🌐 Tính năng chuyển đổi song ngữ (VN/EN)

- Ứng dụng hỗ trợ chuyển đổi ngôn ngữ giữa Tiếng Việt và Tiếng Anh.
- Nút chuyển đổi ngôn ngữ (icon 🌐) nằm trên thanh Header/AppBar, bấm để chuyển đổi qua lại giữa hai ngôn ngữ.
- Tất cả các text sử dụng hàm `t('key')` sẽ tự động đổi ngôn ngữ ngay lập tức.

### Cách mở rộng thêm ngôn ngữ mới
1. Mở file `src/context/LocalizationContext.jsx`.
2. Thêm object ngôn ngữ mới vào biến `translations` (ví dụ: `fr` cho tiếng Pháp).
3. Sử dụng hàm `setLang('fr')` để chuyển sang ngôn ngữ mới.

### Hướng dẫn sử dụng
- Để chuyển đổi ngôn ngữ, bấm vào nút 🌐 trên thanh Header.
- Có thể sử dụng hook `useLocalization` để lấy hàm `t(key)` và đổi ngôn ngữ ở bất kỳ component nào.
