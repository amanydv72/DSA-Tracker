import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = ({ progress, dsaPlan }) => {
  const { isDarkMode } = useTheme();

  // Calculate daily completion data
  const dailyCompletionData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dayProgress = progress[day] || {};
    return {
      day: `Day ${day}`,
      completed: dayProgress.completed ? 1 : 0,
      problemsSolved: dayProgress.problemsSolved || 0,
    };
  });

  // Calculate weekly progress
  const weeklyProgress = [1, 2, 3, 4].map(week => {
    const weekDays = dsaPlan.filter(day => day.week === week);
    const completedDays = weekDays.filter(day => progress[day.day]?.completed).length;
    const totalProblems = weekDays.reduce((sum, day) => sum + day.problems, 0);
    const solvedProblems = weekDays.reduce((sum, day) => sum + (progress[day.day]?.problemsSolved || 0), 0);
    
    return {
      week: `Week ${week}`,
      completionRate: (completedDays / weekDays.length) * 100,
      problemsSolved: solvedProblems,
      totalProblems,
    };
  });

  // Calculate topic-wise progress
  const topicProgress = dsaPlan.reduce((acc, day) => {
    const topic = day.topic;
    if (!acc[topic]) {
      acc[topic] = {
        name: topic,
        value: 0,
        total: 0,
      };
    }
    if (progress[day.day]?.completed) {
      acc[topic].value += progress[day.day].problemsSolved;
    }
    acc[topic].total += day.problems;
    return acc;
  }, {});

  const topicData = Object.values(topicProgress).map(topic => ({
    name: topic.name,
    value: (topic.value / topic.total) * 100,
  }));

  // Calculate overall statistics
  const totalDays = 30;
  const completedDays = Object.values(progress).filter(day => day.completed).length;
  const totalProblems = dsaPlan.reduce((sum, day) => sum + day.problems, 0);
  const solvedProblems = Object.values(progress).reduce((sum, day) => sum + (day.problemsSolved || 0), 0);
  const completionRate = (completedDays / totalDays) * 100;
  const problemCompletionRate = (solvedProblems / totalProblems) * 100;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 border transition-colors duration-200`}>
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
        📊 Progress Analytics
      </h2>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg text-center`}>
          <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-blue-600'} text-sm font-semibold`}>Days Completed</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-blue-800'} text-2xl font-bold`}>{completedDays}/30</p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-blue-600'} text-sm`}>{completionRate.toFixed(1)}%</p>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg text-center`}>
          <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-green-600'} text-sm font-semibold`}>Problems Solved</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-green-800'} text-2xl font-bold`}>{solvedProblems}/{totalProblems}</p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-green-600'} text-sm`}>{problemCompletionRate.toFixed(1)}%</p>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'} p-4 rounded-lg text-center`}>
          <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-purple-600'} text-sm font-semibold`}>Current Streak</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-purple-800'} text-2xl font-bold`}>
            {Object.keys(progress).filter(day => progress[day]?.completed).length}
          </p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-purple-600'} text-sm`}>Days</p>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} p-4 rounded-lg text-center`}>
          <h3 className={`${isDarkMode ? 'text-gray-300' : 'text-yellow-600'} text-sm font-semibold`}>Average Problems/Day</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-yellow-800'} text-2xl font-bold`}>
            {(solvedProblems / (completedDays || 1)).toFixed(1)}
          </p>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-yellow-600'} text-sm`}>Problems</p>
        </div>
      </div>

      {/* Daily Progress Chart */}
      <div className="mb-8">
        <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-lg font-semibold mb-4`}>Daily Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
              <XAxis 
                dataKey="day" 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
              <YAxis 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
              <Bar dataKey="problemsSolved" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-8">
        <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-lg font-semibold mb-4`}>Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
              <XAxis 
                dataKey="week" 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
              <YAxis 
                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
              <Line type="monotone" dataKey="completionRate" stroke="#10B981" />
              <Line type="monotone" dataKey="problemsSolved" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic-wise Progress */}
      <div>
        <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-lg font-semibold mb-4`}>Topic-wise Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topicData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 