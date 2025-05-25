import React from 'react';
import { Trophy, Calendar, Target } from 'lucide-react';
import DayCard from './DayCard';
import { getDaysByWeek, getWeekProblems } from '../utils/dsaData';

const WeekCard = ({ week, weekTitle, progress, onDayCompletion, onProblemsChange, currentDay }) => {
  const weekDays = getDaysByWeek(week);
  const weekTotalProblems = getWeekProblems(week);
  
  // Calculate week statistics
  const completedDays = weekDays.filter(day => progress[day.day]?.completed).length;
  const totalSolvedInWeek = weekDays.reduce((sum, day) => sum + (progress[day.day]?.problemsSolved || 0), 0);
  const weekProgress = (totalSolvedInWeek / weekTotalProblems) * 100;

  const getWeekStatusColor = () => {
    if (completedDays === weekDays.length) return 'border-green-400 bg-green-50';
    if (completedDays > 0) return 'border-blue-400 bg-blue-50';
    return 'border-gray-300 bg-white';
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 border-2 transition-all duration-300 ${getWeekStatusColor()}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Week {week}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {completedDays}/{weekDays.length} days
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {totalSolvedInWeek}/{weekTotalProblems} problems
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 font-medium text-lg mb-4">{weekTitle}</p>
        
        {/* Week Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Week Progress</span>
            <span className="text-sm font-bold text-gray-800">{weekProgress.toFixed(1)}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="progress-bar h-3"
              style={{ width: `${Math.min(100, weekProgress)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {weekDays.map(day => (
          <DayCard
            key={day.day}
            day={day}
            progress={progress}
            onDayCompletion={onDayCompletion}
            onProblemsChange={onProblemsChange}
            currentDay={currentDay}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekCard;