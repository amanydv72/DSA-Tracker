import React from 'react';
import { BarChart3, Target, Calendar, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

const Dashboard = ({ progress, dsaPlan, totalProblems }) => {
  // Calculate statistics
  const completedDays = Object.keys(progress).filter(day => progress[day]?.completed).length;
  const totalSolvedProblems = Object.keys(progress).reduce((sum, day) => {
    return sum + (progress[day]?.problemsSolved || 0);
  }, 0);

  const expectedProblemsUpToToday = (day) => {
    return dsaPlan.slice(0, day).reduce((sum, d) => sum + d.problems, 0);
  };

  const currentDay = Math.min(35, Math.max(1, completedDays + 1));
  const expectedProblemsToday = expectedProblemsUpToToday(currentDay);
  const progressPercentage = (totalSolvedProblems / totalProblems) * 100;
  const daysRemaining = 35 - completedDays;
  const avgProblemsPerDay = completedDays > 0 ? totalSolvedProblems / completedDays : 0;

  // Lag calculation
  const problemLag = Math.max(0, expectedProblemsToday - totalSolvedProblems);
  const timeLag = completedDays > 0 ? (problemLag / Math.max(avgProblemsPerDay, 1)) : 0;

  // Estimated completion
  const remainingProblems = totalProblems - totalSolvedProblems;
  const estimatedDaysToComplete = avgProblemsPerDay > 0 ? Math.ceil(remainingProblems / avgProblemsPerDay) : 35;

  // Performance indicators
  const isOnTrack = problemLag <= 5; // Allow 5 problems tolerance
  const isAhead = totalSolvedProblems > expectedProblemsToday;

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Overall Progress"
          value={`${progressPercentage.toFixed(1)}%`}
          icon={BarChart3}
          color="blue"
          subtitle={`${totalSolvedProblems}/${totalProblems} problems`}
          progress={progressPercentage}
        />

        <StatsCard
          title="Problems Solved"
          value={`${totalSolvedProblems}/${totalProblems}`}
          icon={Target}
          color="green"
          subtitle={`Avg: ${avgProblemsPerDay.toFixed(1)}/day`}
        />

        <StatsCard
          title="Days Completed"
          value={`${completedDays}/35`}
          icon={Calendar}
          color="purple"
          subtitle={`${daysRemaining} days remaining`}
          progress={(completedDays / 35) * 100}
        />

        <StatsCard
          title="Est. Completion"
          value={`${estimatedDaysToComplete}d`}
          icon={Clock}
          color={estimatedDaysToComplete <= 35 ? "green" : "orange"}
          subtitle={estimatedDaysToComplete <= 35 ? "On track!" : `${estimatedDaysToComplete - 35}d over`}
        />
      </div>

      {/* Performance Alerts */}
      {problemLag > 5 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-red-800 text-lg mb-2">You're Behind Schedule!</h3>
              <div className="space-y-2 text-red-700">
                <p>
                  <strong>Problem Gap:</strong> You're {problemLag} problems behind the expected pace.
                </p>
                <p>
                  <strong>Time Impact:</strong> This represents approximately {timeLag.toFixed(1)} days of work.
                </p>
                <div className="mt-4 p-4 bg-red-100 rounded-lg">
                  <h4 className="font-semibold mb-2">Recovery Options:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Add +{Math.ceil(problemLag / 7)} problems to each of the next 7 days</li>
                    <li>• Allocate 10-12 hours for the next 2-3 days to catch up</li>
                    <li>• Use weekend as intensive catch-up sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAhead && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="font-bold text-green-800 text-lg">Excellent Progress!</h3>
              <p className="text-green-700">
                You're {totalSolvedProblems - expectedProblemsToday} problems ahead of schedule. 
                Keep up the great work!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Day:</span>
              <span className="font-semibold">Day {currentDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expected Problems Today:</span>
              <span className="font-semibold">{expectedProblemsToday}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Actual Problems Solved:</span>
              <span className={`font-semibold ${totalSolvedProblems >= expectedProblemsToday ? 'text-green-600' : 'text-red-600'}`}>
                {totalSolvedProblems}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Average:</span>
              <span className="font-semibold">{avgProblemsPerDay.toFixed(1)} problems/day</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pace Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Required Daily Rate:</span>
              <span className="font-semibold">13 problems/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Current Rate:</span>
              <span className={`font-semibold ${avgProblemsPerDay >= 13 ? 'text-green-600' : 'text-red-600'}`}>
                {avgProblemsPerDay.toFixed(1)} problems/day
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Remaining Problems:</span>
              <span className="font-semibold">{remainingProblems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Required Rate (Remaining):</span>
              <span className="font-semibold">
                {daysRemaining > 0 ? (remainingProblems / daysRemaining).toFixed(1) : 'N/A'} problems/day
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;