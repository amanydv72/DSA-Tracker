import React from 'react';
import { Book, Sun, Moon, BarChart2, Trophy, Flame } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WeekCard from './components/WeekCard';
import Analytics from './components/Analytics';
import Achievements from './components/Achievements';
import { useLocalStorage } from './hooks/useLocalStorage';
import { dsaPlan, weekTitles, totalProblems } from './utils/dsaData';
import { useTheme } from './context/ThemeContext';

const Navbar = ({ progress }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Calculate current streak
  const calculateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let currentDate = new Date();

    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayNumber = Object.keys(progress).find(day => 
        progress[day]?.completedAt?.startsWith(dateStr)
      );

      if (!dayNumber) break;
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DSA A2Z Sheet Tracker
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                30-Day Challenge • 450 Problems • 8 Hours/Day
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Streak Counter */}
            <div className={`flex items-center gap-2 px-4 py-2 ${
              isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'
            } rounded-lg`}>
              <Flame className="w-5 h-5 text-orange-500" />
              <span className={`font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                {streak} Day Streak
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link 
              to="/"
              className={`flex items-center gap-2 px-4 py-2 ${
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
              className={`flex items-center gap-2 px-4 py-2 ${
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
              className={`flex items-center gap-2 px-4 py-2 ${
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

const Home = ({ progress, dsaPlan, totalProblems, handleDayCompletion, handleProblemsChange, currentDay }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Dashboard */}
      <section className="mb-12">
        <Dashboard 
          progress={progress}
          dsaPlan={dsaPlan}
          totalProblems={totalProblems}
        />
      </section>

      {/* Weekly Progress */}
      <section className="space-y-8">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Weekly Progress
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Track your journey through each week of the DSA challenge
          </p>
        </div>

        {[1, 2, 3, 4].map(week => (
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
      <section className="mt-16">
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-lg p-8 border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            📚 Daily Study Schedule & Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`text-center p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30' 
                : 'bg-gradient-to-br from-blue-50 to-blue-100'
            }`}>
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AM</span>
              </div>
              <h4 className={`font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Morning (3 hours)</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>New concepts + solution videos</p>
            </div>
            
            <div className={`text-center p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-green-900/30 to-green-800/30' 
                : 'bg-gradient-to-br from-green-50 to-green-100'
            }`}>
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">PM</span>
              </div>
              <h4 className={`font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Afternoon (3 hours)</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Fresh problem practice</p>
            </div>
            
            <div className={`text-center p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30' 
                : 'bg-gradient-to-br from-purple-50 to-purple-100'
            }`}>
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">EVE</span>
              </div>
              <h4 className={`font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>Evening (2 hours)</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Review + failed problems</p>
            </div>
          </div>

          <div className={`rounded-xl p-6 ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h4 className={`font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>🎯 Pro Tips for Success:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <li>✅ Maintain a "Mistakes & Patterns" notebook</li>
                <li>✅ Don't skip revision days (7, 14, 21, 30)</li>
                <li>✅ Discuss daily doubts on forums</li>
                <li>✅ Focus on understanding over quantity</li>
              </ul>
              <ul className={`space-y-2 ${
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

const App = () => {
  const [progress, setProgress] = useLocalStorage('dsaProgress', {});
  const { isDarkMode } = useTheme();

  const handleDayCompletion = (day, completed) => {
    const newProgress = {
      ...progress,
      [day]: {
        ...progress[day],
        completed,
        completedAt: completed ? new Date().toISOString() : null,
        problemsSolved: completed ? (progress[day]?.problemsSolved || dsaPlan[day-1].problems) : 0
      }
    };
    setProgress(newProgress);
  };

  const handleProblemsChange = (day, count) => {
    if (!progress[day]?.completed) return;

    const newProgress = {
      ...progress,
      [day]: {
        ...progress[day],
        problemsSolved: parseInt(count) || 0
      }
    };
    setProgress(newProgress);
  };

  const completedDays = Object.keys(progress).filter(day => progress[day]?.completed).length;
  const currentDay = Math.min(30, Math.max(1, completedDays + 1));

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <Navbar progress={progress} />
        
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
                currentDay={currentDay}
              />
            } 
          />
          <Route 
            path="/analytics" 
            element={<Analytics progress={progress} dsaPlan={dsaPlan} />} 
          />
          <Route 
            path="/achievements" 
            element={<Achievements progress={progress} dsaPlan={dsaPlan} />} 
          />
        </Routes>

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
    </Router>
  );
};

export default App;