import React from 'react';
import { Book, Github, ExternalLink } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WeekCard from './components/WeekCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { dsaPlan, weekTitles, totalProblems } from './utils/dsaData';

const App = () => {
  const [progress, setProgress] = useLocalStorage('dsaProgress', {});

  const handleDayCompletion = (day, completed) => {
    const newProgress = {
      ...progress,
      [day]: {
        ...progress[day],
        completed,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
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
                <p className="text-gray-600 mt-1">
                  30-Day Challenge • 450 Problems • 8 Hours/Day
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Original Sheet
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Progress</h2>
            <p className="text-gray-600">Track your journey through each week of the DSA challenge</p>
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
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📚 Daily Study Schedule & Tips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">AM</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Morning (3 hours)</h4>
                <p className="text-gray-600 text-sm">New concepts + solution videos</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">PM</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Afternoon (3 hours)</h4>
                <p className="text-gray-600 text-sm">Fresh problem practice</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">EVE</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Evening (2 hours)</h4>
                <p className="text-gray-600 text-sm">Review + failed problems</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4">🎯 Pro Tips for Success:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <ul className="space-y-2">
                  <li>✅ Maintain a "Mistakes & Patterns" notebook</li>
                  <li>✅ Don't skip revision days (7, 14, 21, 30)</li>
                  <li>✅ Discuss daily doubts on forums</li>
                  <li>✅ Focus on understanding over quantity</li>
                </ul>
                <ul className="space-y-2">
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
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built for DSA enthusiasts • Track your progress, stay motivated, achieve your goals
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Based on Striver's A2Z DSA Course Sheet
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;