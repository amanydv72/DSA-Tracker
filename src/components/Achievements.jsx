import React from 'react';
import { Trophy, Flame, Star, Target, Clock, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Achievements = ({ progress, dsaPlan }) => {
  const { isDarkMode } = useTheme();

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

  // Calculate total problems solved
  const calculateTotalProblems = () => {
    return Object.values(progress).reduce((total, day) => 
      total + (day.problemsSolved || 0), 0
    );
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const totalProblems = Object.values(dsaPlan).reduce((sum, day) => sum + day.problems, 0);
    const solvedProblems = calculateTotalProblems();
    return Math.round((solvedProblems / totalProblems) * 100);
  };

  const streak = calculateStreak();
  const totalProblems = calculateTotalProblems();
  const completion = calculateCompletion();

  const achievements = [
    {
      id: 'streak',
      title: 'Current Streak',
      value: `${streak} days`,
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      description: 'Consecutive days of problem solving'
    },
    {
      id: 'problems',
      title: 'Problems Solved',
      value: totalProblems,
      icon: <Target className="w-6 h-6 text-blue-500" />,
      description: 'Total problems completed'
    },
    {
      id: 'completion',
      title: 'Course Progress',
      value: `${completion}%`,
      icon: <Clock className="w-6 h-6 text-green-500" />,
      description: 'Overall course completion'
    }
  ];

  const milestones = [
    {
      id: 'first-week',
      title: 'First Week Complete',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      achieved: streak >= 7,
      description: 'Complete 7 consecutive days of problem solving'
    },
    {
      id: 'problem-master',
      title: 'Problem Master',
      icon: <Trophy className="w-6 h-6 text-purple-500" />,
      achieved: totalProblems >= 100,
      description: 'Solve 100 problems'
    },
    {
      id: 'streak-warrior',
      title: 'Streak Warrior',
      icon: <Zap className="w-6 h-6 text-red-500" />,
      achieved: streak >= 14,
      description: 'Maintain a 14-day streak'
    }
  ];

  return (
    <div className={`rounded-xl shadow-lg p-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Your Achievements
      </h2>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {achievement.icon}
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{achievement.title}</h3>
            </div>
            <p className={`text-2xl font-bold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>{achievement.value}</p>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {achievement.description}
            </p>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <h3 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Milestones</h3>
        {milestones.map(milestone => (
          <div
            key={milestone.id}
            className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
              milestone.achieved
                ? isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
                : isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            {milestone.icon}
            <div className="flex-1">
              <h4 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{milestone.title}</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {milestone.description}
              </p>
            </div>
            {milestone.achieved && (
              <span className={`font-semibold ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}>Achieved!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;