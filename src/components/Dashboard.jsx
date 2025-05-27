import React from 'react';
import { BarChart3, Target, Calendar, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

const Dashboard = ({ progress, dsaPlan, totalProblems, startDate, daysSinceStart }) => {
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

  // Calculate expected progress based on start date
  const expectedDaysCompleted = Math.min(35, daysSinceStart);
  const isAheadOfSchedule = completedDays > expectedDaysCompleted;
  const isBehindSchedule = completedDays < expectedDaysCompleted;

  // Calculate expected problems based on start date
  const expectedProblemsByNow = expectedProblemsUpToToday(expectedDaysCompleted);
  const problemLag = Math.max(0, expectedProblemsByNow - totalSolvedProblems);
  const timeLag = completedDays > 0 ? (problemLag / Math.max(avgProblemsPerDay, 1)) : 0;

  // Calculate remaining days and problems based on start date
  const remainingDays = Math.max(0, 35 - daysSinceStart);
  const remainingProblems = totalProblems - totalSolvedProblems;
  const requiredDailyRate = remainingDays > 0 ? (remainingProblems / remainingDays) : 0;

  // Calculate current rate based on start date
  const currentRate = daysSinceStart > 0 ? (totalSolvedProblems / daysSinceStart) : 0;

  // Calculate recovery options
  const getRecoveryOptions = () => {
    const remainingDays = 35 - daysSinceStart;
    if (remainingDays <= 0) return null;

    const dailyCatchup = Math.ceil(problemLag / remainingDays);
    const weeklyCatchup = Math.ceil(problemLag / Math.ceil(remainingDays / 7));
    const intensiveDays = Math.ceil(problemLag / (13 * 2)); // Assuming 2x normal pace during intensive days

    return {
      dailyCatchup,
      weeklyCatchup,
      intensiveDays
    };
  };

  const recoveryOptions = getRecoveryOptions();

  // Estimated completion
  const estimatedDaysToComplete = avgProblemsPerDay > 0 ? Math.ceil(remainingProblems / avgProblemsPerDay) : 35;

  // Performance indicators
  const isOnTrack = problemLag <= 5; // Allow 5 problems tolerance
  const isAhead = totalSolvedProblems > expectedProblemsToday;

  // Format start date
  const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not started';

  return (
    <div className="space-y-6">
      {/* Start Date Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Journey Started</h3>
            <p className="text-gray-600 dark:text-gray-300">{formattedStartDate}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Days into journey</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{daysSinceStart}</p>
          </div>
        </div>
      </div>

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

      {/* Schedule Status */}
      {(isAheadOfSchedule || isBehindSchedule) && (
        <div className={`rounded-xl p-6 shadow-lg ${
          isAheadOfSchedule 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-center gap-4">
            {isAheadOfSchedule ? (
              <TrendingUp className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            )}
            <div>
              <h3 className={`font-bold text-lg ${
                isAheadOfSchedule ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {isAheadOfSchedule ? 'Ahead of Schedule!' : 'Behind Schedule'}
              </h3>
              <p className={`${
                isAheadOfSchedule ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {isAheadOfSchedule 
                  ? `You're ${completedDays - expectedDaysCompleted} days ahead of your start date schedule.`
                  : `You're ${expectedDaysCompleted - completedDays} days behind your start date schedule.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

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
                {recoveryOptions && (
                  <div className="mt-4 p-4 bg-red-100 rounded-lg">
                    <h4 className="font-semibold mb-2">Recovery Options:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Add +{recoveryOptions.dailyCatchup} problems to each remaining day</li>
                      <li>• Add +{recoveryOptions.weeklyCatchup} problems to each remaining week</li>
                      <li>• Allocate {recoveryOptions.intensiveDays} intensive days (2x normal pace)</li>
                    </ul>
                  </div>
                )}
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
                You're {totalSolvedProblems - expectedProblemsByNow} problems ahead of schedule. 
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
              <span className="font-semibold">Day {daysSinceStart}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expected Problems by Today:</span>
              <span className="font-semibold">{expectedProblemsByNow}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Actual Problems Solved:</span>
              <span className={`font-semibold ${totalSolvedProblems >= expectedProblemsByNow ? 'text-green-600' : 'text-red-600'}`}>
                {totalSolvedProblems}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Average:</span>
              <span className="font-semibold">{currentRate.toFixed(1)} problems/day</span>
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
              <span className={`font-semibold ${currentRate >= 13 ? 'text-green-600' : 'text-red-600'}`}>
                {currentRate.toFixed(1)} problems/day
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Remaining Problems:</span>
              <span className="font-semibold">{remainingProblems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Required Rate (Remaining):</span>
              <span className="font-semibold">
                {remainingDays > 0 ? requiredDailyRate.toFixed(1) : 'N/A'} problems/day
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;