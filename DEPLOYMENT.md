# GameClub Frontend - Railway Deployment Guide

## Local Setup

### Prerequisites
- Node.js 20+
- npm or yarn

### Environment Variables
Create `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3000/api
```

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

3. Build for production:
```bash
npm run build
```

## Railway Deployment

### Prerequisites
- GitHub account with this repository
- Railway account (https://railway.app)

### Steps

1. Sign in to Railway with GitHub
2. Create a new project
3. Connect your GitHub repository
4. Railway will automatically detect the Dockerfile

### Environment Variables on Railway
```
VITE_API_URL = https://[YOUR_BACKEND_URL].up.railway.app
```

Replace `[YOUR_BACKEND_URL]` with your backend Railway URL.

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Navbar.tsx   # Navigation bar
│   ├── cards/       # Card components
│   ├── dialogs/     # Dialog components
│   ├── modals/      # Modal components
│   └── tables/      # Table components
├── pages/           # Page components
│   ├── LoginPage.tsx
│   ├── games/
│   ├── news/
│   ├── teams/
│   └── tournaments/
├── services/        # API service files
│   ├── auth_service.ts
│   ├── game_service.ts
│   ├── news_service.ts
│   ├── team_service.ts
│   └── tournament_service.ts
├── types/           # TypeScript type definitions
└── styles/          # CSS and theme files
```

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Animation**: Framer Motion
