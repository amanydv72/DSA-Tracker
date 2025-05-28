import React, { useEffect } from 'react';
import { CheckCircle2, Clock, Target, Lock } from 'lucide-react';

const DayCard = ({ day, progress, onDayCompletion, onProblemsChange, currentDay, startDate }) => {
  const getStatusColor = () => {
    if (!startDate) return "bg-gray-50 border-gray-200";
    const dayProgress = progress[day.day];
    if (dayProgress?.completed) return "bg-green-100 border-green-300 shadow-green-100";
    if (day.day <= currentDay) return "bg-yellow-50 border-yellow-300 shadow-yellow-100";
    return "bg-gray-50 border-gray-200";
  };

  const getStatusIcon = () => {
    if (!startDate) return <Lock className="w-5 h-5 text-gray-400" />;
    const dayProgress = progress[day.day];
    if (dayProgress?.completed) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    if (day.day <= currentDay) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
    return <Target className="w-5 h-5 text-gray-400" />;
  };

  const problemsSolved = progress[day.day]?.problemsSolved || 0;
  const completionRate = (problemsSolved / day.problems) * 100;

  // Auto-complete/uncomplete based on problems solved
  useEffect(() => {
    if (!startDate) return;
    if (problemsSolved >= day.problems && !progress[day.day]?.completed) {
      onDayCompletion(day.day, true);
    } else if (problemsSolved < day.problems && progress[day.day]?.completed) {
      onDayCompletion(day.day, false);
    }
  }, [problemsSolved, day.problems, day.day, progress, onDayCompletion, startDate]);

  const handleInputChange = (e) => {
    if (!startDate) return;
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === '' || (!isNaN(value) && value >= 0)) {
      onProblemsChange(day.day, value);
    }
  };

  return (
    <div className={`p-5 rounded-lg border-2 transition-all duration-300 card-hover ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-800 text-lg">Day {day.day}</h3>
          {getStatusIcon()}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`day-${day.day}`}
            checked={progress[day.day]?.completed || false}
            onChange={(e) => onDayCompletion(day.day, e.target.checked)}
            disabled={!startDate}
            className={`w-5 h-5 text-green-600 rounded focus:ring-green-500 ${
              !startDate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <label htmlFor={`day-${day.day}`} className={`text-sm text-gray-600 ${
            !startDate ? 'opacity-50' : ''
          }`}>
            Complete
          </label>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 font-medium leading-relaxed">
        {day.topics}
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            <Target className="w-4 h-4" />
            Target: {day.problems} problems
          </span>
          <span className="text-xs text-gray-500">
            {day.hours}h planned
          </span>
        </div>
        
        <div>
          <label className={`block text-xs text-gray-600 mb-1 font-medium ${
            !startDate ? 'opacity-50' : ''
          }`}>
            Problems Solved:
          </label>
          <input
            type="number"
            min="0"
            max={day.problems + 10}
            value={problemsSolved || ''}
            onChange={handleInputChange}
            disabled={!startDate}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !startDate ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
        
        {problemsSolved > 0 && (
          <div className="space-y-2">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  completionRate >= 100 ? 'bg-green-500' : 
                  completionRate >= 70 ? 'bg-blue-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${Math.min(100, completionRate)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-600">
                {completionRate.toFixed(0)}% complete
              </p>
              {completionRate > 100 && (
                <span className="text-xs text-green-600 font-semibold">
                  +{problemsSolved - day.problems} bonus!
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCard;