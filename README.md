# 💰 Expense Tracker - Full Stack Financial Management App

A modern, feature-rich expense tracking application built with React and Node.js that helps users manage their personal finances with beautiful visualizations and intuitive user interface.

![Expense Tracker](https://img.shields.io/badge/Expense-Tracker-purple?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.17.1-green?style=for-the-badge&logo=mongodb)

## 🚀 Features

### ✨ Core Functionality
- **📊 Financial Dashboard** - Real-time overview of income, expenses, and balance
- **💰 Income Management** - Track multiple income sources with custom icons
- **�� Expense Tracking** - Categorize and monitor all expenses
- **�� Interactive Charts** - Beautiful visualizations using Recharts
- **👤 User Authentication** - Secure login/signup with JWT tokens
- **🖼️ Profile Management** - Upload and manage profile photos
- **📱 Responsive Design** - Works seamlessly on all devices

### 🎨 Visual Features
- **📊 Pie Charts** - Financial overview with color-coded segments
- **📈 Bar Charts** - Category-wise expense breakdown
- **📉 Line Charts** - Time-series data visualization
- **😊 Emoji Picker** - Fun icon selection for categories
- **🎨 Modern UI** - Clean, intuitive interface with Tailwind CSS
- **🌙 Toast Notifications** - User-friendly feedback system

### �� Technical Features
- **�� JWT Authentication** - Secure user sessions
- **📁 File Upload** - Profile photo management with Multer
- **📊 Excel Export** - Data export functionality
- **🔄 Real-time Updates** - Instant data synchronization
- **📱 PWA Ready** - Progressive Web App capabilities

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 19.1.1** - Modern UI library
- **🚀 Vite** - Fast build tool and dev server
- **🎨 Tailwind CSS 4.1.11** - Utility-first CSS framework
- **�� Recharts 3.1.2** - Beautiful chart components
- **�� React Router DOM 7.8.0** - Client-side routing
- **�� Emoji Picker React 4.13.2** - Emoji selection component
- **�� Moment.js 2.30.1** - Date manipulation
- **�� React Hot Toast 2.5.2** - Toast notifications
- **🎯 React Icons 5.5.0** - Icon library
- **🌐 Axios 1.11.0** - HTTP client

### Backend
- **🟢 Node.js** - JavaScript runtime
- **�� Express.js 5.1.0** - Web framework
- **🗄️ MongoDB 8.17.1** - NoSQL database
- **🐪 Mongoose 8.17.1** - MongoDB ODM
- **�� JWT 9.0.2** - JSON Web Tokens
- **�� Bcryptjs 3.0.2** - Password hashing
- **📁 Multer 2.0.2** - File upload middleware
- **📊 XLSX 0.18.5** - Excel file processing
- **🌍 CORS 2.8.5** - Cross-origin resource sharing
- **⚙️ Dotenv 17.2.1** - Environment variables

### Development Tools
- **🔍 ESLint** - Code linting
- **🔄 Nodemon** - Development server with auto-reload
- **📦 npm** - Package management


## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend development server (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## �� API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login

### Income Management
- `GET /api/v1/income` - Get user's income records
- `POST /api/v1/income` - Add new income
- `PUT /api/v1/income/:id` - Update income record
- `DELETE /api/v1/income/:id` - Delete income record

### Expense Management
- `GET /api/v1/expense` - Get user's expense records
- `POST /api/v1/expense` - Add new expense
- `PUT /api/v1/expense/:id` - Update expense record
- `DELETE /api/v1/expense/:id` - Delete expense record

### Dashboard
- `GET /api/v1/dashboard/overview` - Get financial overview
- `GET /api/v1/dashboard/recent-transactions` - Get recent transactions

## 🎨 Key Components

### Charts & Visualizations
- **CustomPieChart** - Financial overview with interactive segments
- **CustomBarChart** - Category-wise expense breakdown
- **CustomLineChart** - Time-series data visualization
- **CustomTooltip** - Interactive tooltips for charts

### User Interface
- **ProfilePhotoSelector** - Image upload with preview
- **EmojiPickerPopup** - Emoji selection for categories
- **AddExpenseForm** - Expense entry form
- **AddIncomeForm** - Income entry form
- **TransactionInfoCard** - Transaction display cards

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password encryption
- **CORS Protection** - Cross-origin request handling
- **Input Validation** - Server-side data validation
- **File Upload Security** - Secure file handling

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 📱 Tablets
- �� Desktop computers
- ��️ Large screens

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

That's all.



