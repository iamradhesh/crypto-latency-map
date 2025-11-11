This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 🌍 Crypto Exchange Latency Monitor

A real-time 3D visualization tool for monitoring cryptocurrency exchange server locations and network latency across AWS, GCP, and Azure cloud infrastructure. Built with Next.js, Three.js, and React.

![Project Banner](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-r128-orange?style=for-the-badge&logo=three.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🗺️ 3D World Map Visualization
- Interactive 3D globe with smooth rotation and zoom controls
- Touch-optimized for mobile devices
- Real-time rendering with Three.js
- Custom Earth texture with geographic grid

### 📍 Exchange Server Locations
- 10+ major cryptocurrency exchanges (Binance, Coinbase, OKX, Bybit, etc.)
- Color-coded markers by cloud provider (AWS, GCP, Azure)
- Hover tooltips with detailed server information
- Click-to-view historical data

### 📊 Real-time Latency Monitoring
- Live latency updates every 5 seconds
- Animated connection lines between exchanges
- Color-coded latency ranges (green < 50ms, yellow 50-100ms, red > 100ms)
- Latency statistics (min, avg, max, uptime)

### 📈 Historical Latency Analysis
- Time-series charts (1 hour, 24 hours, 7 days, 30 days)
- Compare up to 3 exchanges simultaneously
- Interactive tooltips with detailed metrics
- Responsive chart design for all screen sizes

### 🎨 Advanced UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Dark mode optimized interface
- Glassmorphism effects
- Smooth animations and transitions
- Touch gesture support
- Accessibility features

### 🔧 Infrastructure Monitoring
- Cloud provider filtering (AWS, GCP, Azure)
- Toggle connection visibility
- Active exchange count
- Provider legend with color coding

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher)
- **npm** (v9.0 or higher) or **yarn** (v1.22 or higher)
- **Git**

Check your versions:
```bash
node --version
npm --version
git --version
```

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crypto-latency-monitor.git
cd crypto-latency-monitor
```

#### 2. Install Dependencies
Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

#### 3. Project Structure Setup

Ensure your project structure matches:
```
crypto-latency-monitor/
├── app/
│   ├── page.tsx                 # Main map component
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── component/
│   └── HistoricLatency.tsx      # Historical chart component
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

#### 4. Copy Component Files

**Main Page Component** (`app/page.tsx`):
Copy the content from the "Responsive Crypto Latency Map (Updated)" artifact.

**Historical Latency Component** (`component/HistoricLatency.tsx`):
Copy the content from the "Responsive HistoricLatency Component" artifact.

**Global Styles** (`app/globals.css`):
Copy the content from the "Enhanced Global CSS" artifact.

---

## 🏃 Running the Project

### Development Mode

Start the development server:
```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at:
```
http://localhost:3000
```

### Production Build

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Run with Turbopack (Faster Development)
```bash
npm run dev --turbo
```

---

## 📦 Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.128.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.263.1",
    "typescript": "^5.0.0"
  }
}
```

### Install Additional Dependencies
If not already installed:
```bash
npm install three recharts lucide-react
```

---

## 🎮 Usage Guide

### Desktop Controls
- **🖱️ Mouse Drag**: Rotate the globe
- **🖱️ Scroll Wheel**: Zoom in/out
- **🖱️ Hover**: View exchange information
- **🖱️ Click Marker**: Open historical latency data
- **🖱️ Click Chart Icon**: Toggle historical view

### Mobile Controls
- **👆 Swipe**: Rotate the globe
- **🤏 Pinch**: Zoom (browser native)
- **👆 Tap Marker**: View exchange details
- **☰ Menu Button**: Open controls panel
- **📊 View Historical**: Open latency charts

### Features Walkthrough

#### 1. Filtering by Cloud Provider
1. Open the controls panel (right side on desktop, menu on mobile)
2. Select a cloud provider from the dropdown (AWS, GCP, Azure, or All)
3. The globe updates to show only selected exchanges

#### 2. Viewing Historical Latency
1. Click any exchange marker on the globe
2. Historical latency panel opens automatically
3. Switch between time ranges (1H, 24H, 7D, 30D)
4. View statistics: Min, Avg, Max latency, and Uptime

#### 3. Comparing Exchanges
1. Open historical latency for any exchange
2. Expand "Compare with other exchanges"
3. Select up to 3 exchanges to overlay on the chart
4. Different colors distinguish each exchange

#### 4. Toggling Connections
1. Use the "Show Connections" checkbox in controls
2. View animated latency lines between exchanges
3. Color indicates latency quality (green/yellow/red)

---

## 🏗️ Project Architecture

### Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **3D Rendering**: Three.js
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Component Structure

```
┌─────────────────────────────────────┐
│     CryptoLatencyMap (Main)         │
│  ┌───────────────────────────────┐  │
│  │   Three.js 3D Globe Scene     │  │
│  │  - Earth mesh                 │  │
│  │  - Exchange markers           │  │
│  │  - Connection lines           │  │
│  │  - Lighting & camera          │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   Controls Panel              │  │
│  │  - Provider filter            │  │
│  │  - Connection toggle          │  │
│  │  - Legend                     │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   Historical Latency          │  │
│  │  - Time range selector        │  │
│  │  - Statistics cards           │  │
│  │  - Recharts line/area chart   │  │
│  │  - Comparison selector        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Data Flow

```
Mock Data (EXCHANGES) 
    ↓
State Management (React useState)
    ↓
Three.js Scene Rendering
    ↓
User Interactions (click, hover, drag)
    ↓
Update State → Re-render
```

---

## 🎨 Customization

### Adding New Exchanges

Edit the `EXCHANGES` array in `app/page.tsx`:

```typescript
const EXCHANGES: Exchange[] = [
  // ... existing exchanges
  { 
    name: "YourExchange", 
    lat: 40.7128,           // Latitude
    lon: -74.0060,          // Longitude
    provider: "AWS",        // AWS, GCP, or Azure
    region: "us-east-1"     // Cloud region
  },
];
```

### Changing Cloud Provider Colors

Modify `PROVIDER_COLORS` in `app/page.tsx`:

```typescript
const PROVIDER_COLORS = {
  AWS: 0xff9900,      // Orange
  GCP: 0x4285f4,      // Blue
  Azure: 0x0072c6,    // Light Blue
};
```

### Adjusting Update Intervals

Change latency update frequency:

```typescript
// In useEffect hook
const interval = setInterval(() => {
  // Update latency data
}, 5000); // 5000ms = 5 seconds
```

### Modifying Globe Appearance

Edit `createEarthTexture()` function for custom Earth texture:

```typescript
const createEarthTexture = () => {
  const canvas = document.createElement("canvas");
  // Customize canvas drawing here
  ctx.fillStyle = "#YOUR_OCEAN_COLOR";
  ctx.fillStyle = "#YOUR_LAND_COLOR";
  // ...
};
```

---

## 🔌 API Integration (Future Enhancement)

Currently using mock data. To integrate real APIs:

### 1. Replace Mock Latency Generator

```typescript
// Replace this:
const generateLatency = () => Math.floor(Math.random() * 150) + 20;

// With actual API call:
const fetchRealLatency = async (exchangeUrl: string) => {
  const start = performance.now();
  try {
    await fetch(exchangeUrl, { mode: 'no-cors' });
    return performance.now() - start;
  } catch (error) {
    return null;
  }
};
```

### 2. Recommended APIs
- **Cloudflare Radar API**: Network performance data
- **PingPlotter API**: Network latency monitoring
- **Custom Backend**: Build your own latency measurement service

### 3. Add Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- ✅ Touch gesture support
- ✅ Hamburger menu navigation
- ✅ Full-screen historical view
- ✅ Optimized 3D rendering performance
- ✅ Reduced pixel ratio for better frame rate
- ✅ Adaptive text sizing
- ✅ Collapsible sections

### Testing Responsiveness

```bash
# Using Chrome DevTools
1. Open Developer Tools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test various device sizes

# Recommended test devices:
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- iPad (768x1024)
- Desktop (1920x1080)
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Three.js Import Error
```bash
Error: Cannot find module 'three'
```
**Solution:**
```bash
npm install three
npm install --save-dev @types/three
```

#### 2. Recharts Not Rendering
```bash
Error: Module not found: recharts
```
**Solution:**
```bash
npm install recharts
```

#### 3. Lucide Icons Missing
```bash
Error: Module not found: lucide-react
```
**Solution:**
```bash
npm install lucide-react
```

#### 4. TypeScript Errors
```bash
Error: Cannot find name 'Exchange'
```
**Solution:** Ensure interfaces are properly defined at the top of components.

#### 5. Canvas Not Rendering
- Check if mountRef is properly attached
- Ensure Three.js is initialized in useEffect
- Verify WebGL support in browser

#### 6. Mobile Touch Not Working
- Make sure touch event listeners are added
- Check if `isMobile` state is properly detected
- Verify touch handlers are not being prevented

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the .next folder
```

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t crypto-latency-monitor .
docker run -p 3000:3000 crypto-latency-monitor
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Functionality
- [ ] Globe rotates smoothly
- [ ] Markers appear on correct locations
- [ ] Click marker opens historical view
- [ ] Filters work correctly
- [ ] Connections toggle properly
- [ ] Charts display data
- [ ] Comparison feature works
- [ ] Time range switches correctly

#### Responsiveness
- [ ] Mobile menu works
- [ ] Touch gestures respond
- [ ] Charts fit screen
- [ ] Text is readable on all sizes
- [ ] No horizontal scroll

#### Performance
- [ ] 60 FPS on desktop
- [ ] 30+ FPS on mobile
- [ ] No memory leaks
- [ ] Smooth animations

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ Pixel ratio capped at 2x
- ✅ Reduced geometry complexity on mobile
- ✅ Hardware acceleration enabled
- ✅ Efficient event listeners
- ✅ Proper cleanup in useEffect

### Future Improvements
- [ ] Implement Web Workers for calculations
- [ ] Add lazy loading for historical data
- [ ] Optimize Three.js mesh reuse
- [ ] Implement virtual scrolling for exchange list
- [ ] Add service worker for offline support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test on multiple devices

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **Recharts** - Charting library
- **Lucide** - Beautiful icon set
- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS

---

## 📞 Support

For questions or issues:
- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/crypto-latency-monitor/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/crypto-latency-monitor/discussions)

---

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- [x] 3D globe visualization
- [x] Exchange markers
- [x] Historical latency charts
- [x] Responsive design
- [x] Touch controls

### Phase 2 (In Progress) 🚧
- [ ] Real API integration
- [ ] Live latency updates
- [ ] Export functionality (CSV, PNG)
- [ ] Dark/Light theme toggle
- [ ] Performance dashboard

### Phase 3 (Planned) 📋
- [ ] Latency heatmap overlay
- [ ] Network topology view
- [ ] Alert system
- [ ] User authentication
- [ ] Custom exchange lists
- [ ] Historical data persistence

### Phase 4 (Future) 🔮
- [ ] WebSocket real-time updates
- [ ] Machine learning predictions
- [ ] Multi-region comparison
- [ ] Trading volume visualization
- [ ] Custom dashboards

---

## 📸 Screenshots

### Desktop View
```
[Add screenshot of desktop view]
```

### Mobile View
```
[Add screenshot of mobile view]
```

### Historical Chart
```
[Add screenshot of historical chart]
```

---

## 💡 Tips & Best Practices

1. **Performance**: Close unused tabs when running locally
2. **Development**: Use React DevTools for debugging
3. **Mobile**: Test on real devices, not just emulators
4. **Data**: Replace mock data with real APIs for production
5. **Deployment**: Use environment variables for sensitive data

---

**Made with ❤️ by Radhesh**

⭐ Star this repo if you find it helpful!

Last Updated: November 2025
