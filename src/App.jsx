import React from 'react';
import { Book, Github, ExternalLink, Download, Upload, Sun, Moon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WeekCard from './components/WeekCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { dsaPlan, weekTitles, totalProblems } from './utils/dsaData';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const [progress, setProgress] = useLocalStorage('dsaProgress', {});
  const { isDarkMode, toggleTheme } = useTheme();

  const handleDayCompletion = (day, completed) => {
    const newProgress = {
      ...progress,
      [day]: {
        ...progress[day],
        completed,
        completedAt: completed ? new Date().toISOString() : null,
        problemsSolved: completed ? (progress[day]?.problemsSolved || dsaPlan[day-1].problems) : (progress[day]?.problemsSolved || 0)
      }
    };
    setProgress(newProgress);
  };

  const handleProblemsChange = (day, count) => {
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

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const sortedDays = Object.keys(progress)
      .filter(day => progress[day]?.completed)
      .sort((a, b) => b - a);

    if (sortedDays.length === 0) return 0;

    // Check if the last completed day was today or yesterday
    const lastCompletedDay = sortedDays[0];
    const lastCompletedDate = new Date(progress[lastCompletedDay]?.completedAt || 0);
    const lastCompletedDateStr = lastCompletedDate.toISOString().split('T')[0];
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastCompletedDateStr !== today && lastCompletedDateStr !== yesterdayStr) {
      return 0;
    }

    // Calculate streak
    let currentDate = new Date(lastCompletedDate);
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayNumber = sortedDays.find(day => {
        const dayDate = new Date(progress[day]?.completedAt || 0);
        return dayDate.toISOString().split('T')[0] === dateStr;
      });

      if (!dayNumber) break;
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Header */}
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
                {streak > 0 && (
                  <p className="text-green-500 font-semibold mt-1">
                    🔥 {streak} Day{streak > 1 ? 's' : ''} Streak!
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
              <button 
                onClick={() => {
                  const dataStr = JSON.stringify(progress);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  const exportFileDefaultName = 'dsa-progress.json';
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                }}
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-green-700 hover:bg-green-600' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white rounded-lg transition-colors`}
              >
                <Download className="w-4 h-4" />
                Export Progress
              </button>
              <input
                type="file"
                id="importProgress"
                className="hidden"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const importedProgress = JSON.parse(event.target.result);
                        setProgress(importedProgress);
                      } catch (error) {
                        alert('Invalid progress file');
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
              />
              <button 
                onClick={() => document.getElementById('importProgress').click()}
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-yellow-700 hover:bg-yellow-600' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } text-white rounded-lg transition-colors`}
              >
                <Upload className="w-4 h-4" />
                Import Progress
              </button>
              <a 
                href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-blue-700 hover:bg-blue-600' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white rounded-lg transition-colors`}
              >
                <ExternalLink className="w-4 h-4" />
                Original Sheet
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-800 hover:bg-gray-900'
                } text-white rounded-lg transition-colors`}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

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
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              Weekly Progress
            </h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
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
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-lg p-8 border transition-colors duration-200`}>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
              📚 Daily Study Schedule & Tips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`text-center p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/50' 
                  : 'bg-gradient-to-br from-blue-50 to-blue-100'
              } rounded-xl transition-colors duration-200`}>
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">AM</span>
                </div>
                <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Morning (3 hours)</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>New concepts + solution videos</p>
              </div>
              
              <div className={`text-center p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-green-900/50 to-green-800/50' 
                  : 'bg-gradient-to-br from-green-50 to-green-100'
              } rounded-xl transition-colors duration-200`}>
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">PM</span>
                </div>
                <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Afternoon (3 hours)</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Fresh problem practice</p>
              </div>
              
              <div className={`text-center p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/50' 
                  : 'bg-gradient-to-br from-purple-50 to-purple-100'
              } rounded-xl transition-colors duration-200`}>
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">EVE</span>
                </div>
                <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Evening (2 hours)</h4>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Review + failed problems</p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 transition-colors duration-200`}>
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>🎯 Pro Tips for Success:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✅ Maintain a "Mistakes & Patterns" notebook</li>
                  <li>✅ Don't skip revision days (7, 14, 21, 30)</li>
                  <li>✅ Discuss daily doubts on forums</li>
                  <li>✅ Focus on understanding over quantity</li>
                </ul>
                <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
  );
};

export default App;