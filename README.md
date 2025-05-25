# DSA A2Z Sheet Tracker 🚀

A comprehensive progress tracking application for Striver's A2Z DSA Sheet - complete 450 problems in 30 days!

![DSA Tracker](https://img.shields.io/badge/DSA-Tracker-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-blue)
![Vite](https://img.shields.io/badge/Vite-4.4-green)

## 🎯 Features

### 📊 **Smart Analytics Dashboard**
- **Progress Visualization**: Real-time progress bars and completion percentages
- **Performance Metrics**: Track problems solved, daily averages, and completion rates
- **Lag Detection**: Automatic alerts when falling behind schedule
- **Estimated Completion**: Predictive analysis for finish date

### 📈 **Comprehensive Tracking**
- **Daily Check-ins**: Mark days complete and log problems solved
- **Weekly Organization**: Structured by topic complexity and difficulty
- **Visual Progress**: Color-coded cards showing current status
- **Problem Counter**: Track actual vs target problems per day

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on all devices
- **Interactive Elements**: Smooth animations and hover effects
- **Intuitive Navigation**: Clean, organized layout
- **Real-time Updates**: Instant feedback on progress changes

## 🛠️ Technology Stack

- **Frontend**: React 18.2 with Hooks
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Build Tool**: Vite 4.4
- **State Management**: React State + Local Storage
- **Development**: ESLint + Hot Reload

## 📁 Project Structure

```
dsa-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main analytics dashboard
│   │   ├── WeekCard.jsx        # Weekly progress container
│   │   ├── DayCard.jsx         # Individual day tracking
│   │   └── StatsCard.jsx       # Reusable stat components
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom localStorage hook
│   ├── utils/
│   │   └── dsaData.js          # DSA plan data and utilities
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles and Tailwind
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and setup**:
```bash
git clone <your-repo-url>
cd dsa-tracker
npm install
```

2. **Install dependencies**:
```bash
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npx tailwindcss init -p
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 📊 DSA Plan Overview

| Week | Focus Area | Problems | Topics |
|------|------------|----------|---------|
| **Week 1** | Foundation | 80 | Arrays, Sorting, Binary Search |
| **Week 2** | Core Concepts | 90 | Recursion, Linked Lists, Stacks & Queues |
| **Week 3** | Advanced DS | 100 | Trees, BST, Heaps, Tries, Hashing |
| **Week 4** | Algorithms | 180 | Graphs, DP, Greedy, Miscellaneous |

**Total**: 450 problems in 30 days (15 problems/day average)

## 🎯 How to Use

### Daily Workflow
1. **Check Today's Target**: View your current day and problem goals
2. **Mark Progress**: Check off completed days and input problems solved
3. **Monitor Dashboard**: Track your overall progress and performance
4. **Address Gaps**: Use lag alerts to stay on schedule
5. **Review & Plan**: Use analytics to adjust your study strategy

### Key Metrics to Watch
- **Progress Percentage**: Overall completion rate
- **Daily Average**: Problems solved per day
- **Lag Indicator**: How far behind/ahead you are
- **Estimated Completion**: Predicted finish date

## 🔧 Customization

### Adding New Features
The modular structure makes it easy to extend:

```javascript
// Add new tracking metrics in Dashboard.jsx
const customMetric = calculateCustomMetric(progress);

// Create new card types in components/
const CustomCard = ({ data }) => { /* implementation */ };

// Extend data structure in utils/dsaData.js
export const extendedPlan = dsaPlan.map(day => ({
  ...day,
  difficulty: calculateDifficulty(day),
  estimatedTime: calculateTime(day)
}));
```

### Styling Modifications
Built with Tailwind CSS for easy customization:

```css
/* Add custom animations in index.css */
@layer components {
  .custom-animation {
    @apply transform transition-all duration-500 hover:scale-110;
  }
}
```

## 📱 Progressive Web App (PWA) Ready

Add PWA capabilities by:
1. Installing `vite-pwa` plugin
2. Adding service worker
3. Creating manifest.json
4. Enabling offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Striver (Raj Vikramaditya)** for the comprehensive A2Z DSA Sheet
- **TakeUForward** community for continuous support
- All contributors and users of this tracker

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/your-username/dsa-tracker/issues)
- 💡 **Feature Requests**: [Discussion page](https://github.com/your-username/dsa-tracker/discussions)
- 📧 **Questions**: [Contact us](mailto:your-email@example.com)

---

**Happy Coding! 🎉** Start your DSA journey today and track every step towards your goal!

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red)](https://github.com/your-username)
[![Stars](https://img.shields.io/github/stars/your-username/dsa-tracker?style=social)](https://github.com/your-username/dsa-tracker)