# DSA A2Z Sheet Tracker 🚀

A clean and intuitive progress tracking application for Striver's A2Z DSA Sheet - complete 455 problems in 35 days!

## 🌐 Try it Live!

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://aman-dsa-tracker.netlify.app/)

**Experience the DSA Tracker right now!** [Click here to open the live application](https://aman-dsa-tracker.netlify.app/)

![DSA Tracker](https://img.shields.io/badge/DSA-Tracker-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-blue)
![Vite](https://img.shields.io/badge/Vite-4.4-green)

## 🎯 Features

### 📊 **Smart Analytics Dashboard**
- **Progress Tracking**: Clear progress indicators and completion percentages
- **Performance Metrics**: Track problems solved and daily averages
- **Smart Alerts**: Simple notifications when falling behind schedule
- **Completion Estimates**: Basic predictions for finish date

### 📈 **Progress Tracking**
- **Daily Progress**: Mark days complete and log problems solved
- **Weekly Structure**: Organized by topic and difficulty
- **Visual Status**: Clean, color-coded progress indicators
- **Problem Counter**: Track daily problem targets

### 🎨 **Clean UI/UX**
- **Responsive Design**: Works on all devices
- **Simple Interface**: Easy to use and understand
- **Quick Actions**: One-click progress updates
- **Real-time Updates**: Instant progress feedback

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
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/Light theme management
│   ├── utils/
│   │   ├── dsaData.js          # DSA plan data
│   │   └── dataExport.js       # Progress import/export
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

2. **Start development server**:
```bash
npm run dev
```

3. **Open your browser**:
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

**Total**: 455 problems in 35 days (13 problems/day average)

## 🎯 How to Use

### Daily Workflow
1. **Check Today's Target**: View your current day and problem goals
2. **Mark Progress**: Check off completed days and input problems solved
3. **Monitor Dashboard**: Track your overall progress
4. **Stay on Track**: Use simple alerts to maintain schedule
5. **Review Progress**: Use basic analytics to guide your study

### Key Metrics
- **Progress**: Overall completion percentage
- **Daily Average**: Problems solved per day
- **Schedule Status**: On track, ahead, or behind
- **Completion Date**: Estimated finish date

## 🔧 Customization

### Adding Features
The modular structure makes it easy to extend:

```javascript
// Add new metrics in Dashboard.jsx
const newMetric = calculateMetric(progress);

// Create new components
const NewComponent = ({ data }) => { /* implementation */ };
```

### Styling
Built with Tailwind CSS for easy customization:

```css
/* Add custom styles in index.css */
@layer components {
  .custom-style {
    @apply transition-all duration-300;
  }
}
```

## 📱 Data Management

- **Export Progress**: Save your progress as JSON
- **Import Progress**: Restore from saved file
- **Local Storage**: Automatic progress saving

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m 'Add NewFeature'`
4. Push to branch: `git push origin feature/NewFeature`
5. Open Pull Request


## 🙏 Acknowledgments

- **Striver (Raj Vikramaditya)** for the A2Z DSA Sheet
- **TakeUForward** community for support
- All contributors and users

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/amanydv72/dsa-tracker/issues)
- 💡 **Feature Requests**: [Discussion page](https://github.com/amanydv72/dsa-tracker/discussions)
- 📧 **Questions**: [Contact us](mailto:amanydv879587@gmail.com)

---

**Happy Coding! 🎉** Start your DSA journey today!

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red)](https://github.com/amanydv72)
[![Stars](https://img.shields.io/github/stars/your-username/dsa-tracker?style=social)](https://github.com/amanydv72/dsa-tracker)