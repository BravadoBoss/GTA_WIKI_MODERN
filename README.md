# GTA WIKI Modern

A modern web application for exploring GTA (Grand Theft Auto) related information with a fast and enjoyable user experience.

## About

GTA WIKI Modern is a dashboard-style web app designed to make finding GTA-related information quick and efficient. The application features a modern UI and UX built with cutting-edge web technologies.

## Tech Stack

- **Next.js** - React framework for production
- **MUI (Material-UI)** - React component library for modern UI design

## Features

- 🎮 Modern dashboard UI for easy navigation
- ⚡ Fast and efficient information retrieval
- 🎨 Beautiful and intuitive user experience
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

#### Option 1: Use the Setup Script (Recommended for Windows)

Run the PowerShell setup script which will automatically configure PATH and install dependencies:

```powershell
.\setup.ps1
```

If you get an execution policy error, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Option 2: Manual Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Troubleshooting

**If `npm` or `node` is not recognized:**

1. **Restart your terminal/IDE** - Close and reopen PowerShell or Cursor to refresh PATH
2. **Add Node.js to PATH manually:**
   - Open Windows Settings → System → About → Advanced system settings
   - Click "Environment Variables"
   - Under "System variables", find "Path" → Edit → New → Add: `C:\Program Files\nodejs\`
   - Restart your terminal after making changes
3. **Or use the full path temporarily:**
   ```powershell
   & "C:\Program Files\nodejs\npm.cmd" install
   ```

### Build for Production

```bash
npm run build
npm start
```

## License

MIT License - Copyright (c) 2025 BravadoBoss

