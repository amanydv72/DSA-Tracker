import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { Book, Sun, Moon, BarChart2, Trophy, Flame } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { dsaPlan, weekTitles, totalProblems } from './utils/dsaData';
import { useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Dashboard = lazy(() => import('./components/Dashboard'));
const WeekCard = lazy(() => import('./components/WeekCard'));
const Analytics = lazy(() => import('./components/Analytics'));
const Achievements = lazy(() => import('./components/Achievements'));

// Utility functions for India timezone
const getIndiaDate = (date = new Date()) => {
  return new Date(date.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
};

const getIndiaDateString = (date = new Date()) => {
  const indiaDate = getIndiaDate(date);
  return indiaDate.toISOString().split('T')[0];
};

const formatNumber = (num, decimals = 1) => {
  if (!num || isNaN(num)) return 0;
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

const validateProgress = (progress) => {
  return Object.entries(progress).every(([day, data]) => {
    const dayNum = parseInt(day);
    return dayNum >= 1 && dayNum <= 35 && 
           (!data.problemsSolved || data.problemsSolved >= 0);
  });
};

const Navbar = ({ progress, startDate }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Improved streak calculation with India timezone
  const calculateStreak = useMemo(() => {
    if (!progress || Object.keys(progress).length === 0) return 0;

    const completedDays = Object.entries(progress)
      .filter(([_, data]) => data?.completed && data?.completedAt)
      .map(([day, data]) => ({
        day: parseInt(day),
        date: getIndiaDateString(new Date(data.completedAt))
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (completedDays.length === 0) return 0;

    let streak = 0;
    const today = getIndiaDate();
    
    for (let i = 0; i < completedDays.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - streak);
      const expectedDateStr = getIndiaDateString(expectedDate);
      
      if (completedDays[i].date === expectedDateStr) {
        streak++;
      } else if (i === 0 && completedDays[i].date === getIndiaDateString(new Date(today.getTime() - 24 * 60 * 60 * 1000))) {
        // Allow for yesterday if today is not completed yet
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }, [progress]);

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl">
              <Book className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DSA A2Z Sheet Tracker
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 text-sm sm:text-base`}>
                35-Day Challenge • 455 Problems • 8 Hours/Day
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {/* Streak Counter */}
            <div className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 ${
              isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'
            } rounded-lg`}>
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className={`font-semibold text-sm sm:text-base ${
                isDarkMode ? 'text-orange-400' : 'text-orange-700'
              }`}>
                {calculateStreak} Day Streak
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            <Link 
              to="/"
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                location.pathname === '/' 
                  ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-600')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
              } ${isDarkMode ? 'text-white' : 'text-gray-800'} rounded-lg transition-colors`}
            >
              <Book className="w-4 h-4" />
              Dashboard
            </Link>

            <Link 
              to="/analytics"
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                location.pathname === '/analytics' 
                  ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-600')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
              } ${isDarkMode ? 'text-white' : 'text-gray-800'} rounded-lg transition-colors`}
            >
              <BarChart2 className="w-4 h-4" />
              Analytics
            </Link>

            <Link 
              to="/achievements"
              className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                location.pathname === '/achievements' 
                  ? (isDarkMode ? 'bg-blue-700' : 'bg-blue-600')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
              } ${isDarkMode ? 'text-white' : 'text-gray-800'} rounded-lg transition-colors`}
            >
              <Trophy className="w-4 h-4" />
              Achievements
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Home = ({ progress, dsaPlan, totalProblems, handleDayCompletion, handleProblemsChange, handleImportData, currentDay, startDate, daysSinceStart }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Dashboard */}
      <section className="mb-8 sm:mb-12">
        <Dashboard 
          progress={progress}
          dsaPlan={dsaPlan}
          totalProblems={totalProblems}
          startDate={startDate}
          daysSinceStart={daysSinceStart}
        />
      </section>

      {/* Weekly Progress */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Weekly Progress
          </h2>
          <p className={`text-sm sm:text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Track your journey through each week of the DSA challenge
          </p>
        </div>

        {[1, 2, 3, 4, 5].map(week => (
          <WeekCard
            key={week}
            week={week}
            weekTitle={weekTitles[week]}
            progress={progress}
            onDayCompletion={handleDayCompletion}
            onProblemsChange={handleProblemsChange}
            currentDay={currentDay}
          />
        ))}
      </section>

      {/* Productivity Tips */}
      <section className="mt-12 sm:mt-16">
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-lg p-4 sm:p-8 border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            📚 Daily Study Schedule & Tips
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className={`text-center p-4 sm:p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30' 
                : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}>
              <div className="bg-blue-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-sm sm:text-base">AM</span>
              </div>
              <h4 className={`font-bold mb-2 text-sm sm:text-base ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Morning (3 hours)</h4>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>New concepts + solution videos</p>
            </div>
            
            <div className={`text-center p-4 sm:p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-green-900/30 to-green-800/30' 
                : 'bg-gradient-to-br from-green-50 to-green-100'
            }`}>
              <div className="bg-green-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-sm sm:text-base">PM</span>
              </div>
              <h4 className={`font-bold mb-2 text-sm sm:text-base ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Afternoon (3 hours)</h4>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Fresh problem practice</p>
            </div>
            
            <div className={`text-center p-4 sm:p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30' 
                : 'bg-gradient-to-br from-purple-50 to-purple-100'
            }`}>
              <div className="bg-purple-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-sm sm:text-base">EVE</span>
              </div>
              <h4 className={`font-bold mb-2 text-sm sm:text-base ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Evening (2 hours)</h4>
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Review + failed problems</p>
            </div>
          </div>

          <div className={`rounded-xl p-4 sm:p-6 ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h4 className={`font-bold mb-3 sm:mb-4 text-sm sm:text-base ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>🎯 Pro Tips for Success:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <ul className={`space-y-1.5 sm:space-y-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>✅ Maintain a "Mistakes & Patterns" notebook</li>
                <li>✅ Don't skip revision days (7, 14, 21, 30)</li>
                <li>✅ Discuss daily doubts on forums</li>
                <li>✅ Focus on understanding over quantity</li>
              </ul>
              <ul className={`space-y-1.5 sm:space-y-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>🔥 Re-attempt failed problems after 2-3 days</li>
                <li>🔥 Practice similar problems to reinforce patterns</li>
                <li>🔥 Use active recall and spaced repetition</li>
                <li>🔥 Celebrate small wins and daily progress</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  const [progress, setProgress] = useLocalStorage('dsaProgress', {});
  const [startDate, setStartDate] = useLocalStorage('dsaStartDate', null);
  const { isDarkMode } = useTheme();

  // Initialize start date if not set (using India timezone)
  useEffect(() => {
    if (!startDate && Object.keys(progress).length === 0) {
      setStartDate(getIndiaDate().toISOString());
    }
  }, [startDate, progress, setStartDate]);

  const handleDayCompletion = (day, completed) => {
    const newProgress = {
      ...progress,
      [day]: {
        ...progress[day],
        completed,
        completedAt: completed ? getIndiaDate().toISOString() : null,
        problemsSolved: completed ? (progress[day]?.problemsSolved || dsaPlan[day-1].problems) : 0
      }
    };
    setProgress(newProgress);
  };

  const handleProblemsChange = (day, count) => {
    const parsedCount = parseInt(count) || 0;
    const maxProblems = dsaPlan[day-1]?.problems || 0;
    const validatedCount = Math.max(0, parsedCount);
    
    const newProgress = {
      ...progress,
      [day]: {
        ...progress[day],
        problemsSolved: validatedCount
      }
    };
    setProgress(newProgress);
  };

  const handleImportData = (importedData) => {
    setProgress(importedData.progress);
    setStartDate(importedData.startDate);
  };

  // Memoized calculations for better performance
  const calculatedStats = useMemo(() => {
    if (!validateProgress(progress)) {
      console.warn('Invalid progress data detected');
    }

    const completedDays = Object.keys(progress).filter(day => progress[day]?.completed).length;
    const currentDay = Math.min(35, Math.max(1, completedDays + 1));

    // Improved days since start calculation with India timezone
    const calculateDaysSinceStart = () => {
      if (!startDate) return 0;
      
      const start = getIndiaDate(new Date(startDate));
      const today = getIndiaDate();
      
      // Use date-only comparison to avoid timezone issues
      const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const diffTime = todayDateOnly.getTime() - startDateOnly.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      return Math.max(1, diffDays + 1);
    };

    const daysSinceStart = calculateDaysSinceStart();

    return {
      completedDays,
      currentDay,
      daysSinceStart
    };
  }, [progress, startDate]);

  // Auto-update at midnight India time
  useEffect(() => {
    const updateAtMidnight = () => {
      const now = getIndiaDate();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const msUntilMidnight = tomorrow.getTime() - now.getTime();
      
      const timeoutId = setTimeout(() => {
        // Force re-render by updating progress
        setProgress(prev => ({ ...prev }));
        updateAtMidnight(); // Schedule next update
      }, msUntilMidnight);

      return timeoutId;
    };

    const timeoutId = updateAtMidnight();
    return () => clearTimeout(timeoutId);
  }, [setProgress]);

  return (
    <Router>
      <ErrorBoundary>
        <div className={`min-h-screen transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
          <Navbar progress={progress} startDate={startDate} />
          
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    progress={progress}
                    dsaPlan={dsaPlan}
                    totalProblems={totalProblems}
                    handleDayCompletion={handleDayCompletion}
                    handleProblemsChange={handleProblemsChange}
                    handleImportData={handleImportData}
                    currentDay={calculatedStats.currentDay}
                    startDate={startDate}
                    daysSinceStart={calculatedStats.daysSinceStart}
                  />
                } 
              />
              <Route 
                path="/analytics" 
                element={<Analytics progress={progress} dsaPlan={dsaPlan} startDate={startDate} />} 
              />
              <Route 
                path="/achievements" 
                element={<Achievements progress={progress} dsaPlan={dsaPlan} startDate={startDate} />} 
              />
            </Routes>
          </Suspense>

          {/* Footer */}
          <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white py-8 mt-16 transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-400">
                Built for DSA enthusiasts • Track your progress, stay motivated, achieve your goals
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Based on Striver's A2Z DSA Course Sheet
              </p>
              <p className="text-gray-400 mt-4 text-sm">
                Made with ❤️ by Aman Yadav
              </p>
            </div>
          </footer>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;