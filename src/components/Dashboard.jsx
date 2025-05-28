import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart3, Target, Calendar, Clock, AlertTriangle, TrendingUp, 
  TrendingDown, Award, Zap, Brain, CheckCircle, XCircle, 
  RotateCcw, BookOpen, Timer, FlameIcon, Star, Activity,
  Lightbulb, Download, Upload, ExternalLink
} from 'lucide-react';
import StatsCard from './StatsCard';
import { useTheme } from '../context/ThemeContext';
import codingFacts from './codingFacts';
import { exportProgressData, importProgressData } from '../utils/dataExport';

const Dashboard = ({ 
  progress, 
  dsaPlan, 
  totalProblems, 
  startDate, 
  daysSinceStart, 
  handleImportData, 
  handleStartDateSubmit,
  getIndiaDateString,
  getIndiaDate 
}) => {
  const { isDarkMode } = useTheme();
  // Start with a random fact on every load
  const [currentFactIndex, setCurrentFactIndex] = useState(() => Math.floor(Math.random() * codingFacts.length));
  const [isLoading, setIsLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  const [shownFacts, setShownFacts] = useState(new Set([currentFactIndex]));

  // Rotate facts every 30 seconds with improved selection logic
  useEffect(() => {
    const getNextFactIndex = () => {
      // If we've shown all facts, reset the shown facts
      if (shownFacts.size >= codingFacts.length) {
        setShownFacts(new Set());
      }

      // Get all indices that haven't been shown yet
      const availableIndices = Array.from(
        { length: codingFacts.length }, 
        (_, i) => i
      ).filter(i => !shownFacts.has(i));

      // If all facts have been shown, pick a random one
      if (availableIndices.length === 0) {
        return Math.floor(Math.random() * codingFacts.length);
      }

      // Pick a random fact from the available ones
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const nextIndex = availableIndices[randomIndex];
      
      // Add the selected fact to shown facts
      setShownFacts(prev => new Set([...prev, nextIndex]));
      
      return nextIndex;
    };

    const interval = setInterval(() => {
      setCurrentFactIndex(getNextFactIndex);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [shownFacts]);

  // Enhanced calculations with memoization for better performance
  const statistics = useMemo(() => {
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
    const daysRemaining = Math.max(0, 35 - completedDays);
  const avgProblemsPerDay = completedDays > 0 ? totalSolvedProblems / completedDays : 0;

    // Enhanced schedule calculations
    const expectedDaysCompleted = Math.min(35, daysSinceStart);
    const isAheadOfSchedule = completedDays > expectedDaysCompleted;
    const isBehindSchedule = completedDays < expectedDaysCompleted;

    const expectedProblemsByNow = expectedProblemsUpToToday(expectedDaysCompleted);
    const problemLag = Math.max(0, expectedProblemsByNow - totalSolvedProblems);
  const timeLag = completedDays > 0 ? (problemLag / Math.max(avgProblemsPerDay, 1)) : 0;

    const remainingDays = Math.max(0, 35 - daysSinceStart);
  const remainingProblems = totalProblems - totalSolvedProblems;
    const requiredDailyRate = remainingDays > 0 ? (remainingProblems / remainingDays) : 0;
    const currentRate = daysSinceStart > 0 ? (totalSolvedProblems / daysSinceStart) : 0;

    // Streak calculation
    const calculateStreak = () => {
      const sortedDays = Object.entries(progress)
        .filter(([_, data]) => data?.completed && data?.completedAt)
        .sort(([a], [b]) => parseInt(b) - parseInt(a));
      
      let streak = 0;
      for (let i = 0; i < sortedDays.length; i++) {
        const expectedDay = completedDays - i;
        if (parseInt(sortedDays[i][0]) === expectedDay) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    };

    // Performance metrics
    const consistencyScore = completedDays > 0 ? (completedDays / daysSinceStart) * 100 : 0;
    const efficiencyScore = expectedProblemsByNow > 0 ? (totalSolvedProblems / expectedProblemsByNow) * 100 : 0;
    const velocityTrend = calculateVelocityTrend();

    function calculateVelocityTrend() {
      const last7Days = Object.entries(progress)
        .filter(([day, data]) => data?.completed && parseInt(day) > completedDays - 7)
        .reduce((sum, [_, data]) => sum + (data.problemsSolved || 0), 0);
      
      const prev7Days = Object.entries(progress)
        .filter(([day, data]) => data?.completed && parseInt(day) <= completedDays - 7 && parseInt(day) > completedDays - 14)
        .reduce((sum, [_, data]) => sum + (data.problemsSolved || 0), 0);
      
      return prev7Days > 0 ? ((last7Days - prev7Days) / prev7Days) * 100 : 0;
    }

    // Calculate estimated completion date
    const estimatedDaysToComplete = avgProblemsPerDay > 0 ? 
      Math.ceil(remainingProblems / avgProblemsPerDay) : 35;
    
    const estimatedCompletionDate = startDate ? 
      new Date(new Date(startDate).getTime() + ((daysSinceStart + estimatedDaysToComplete - 1) * 24 * 60 * 60 * 1000)) : null;

    return {
      completedDays,
      totalSolvedProblems,
      expectedProblemsToday,
      progressPercentage,
      daysRemaining,
      avgProblemsPerDay,
      expectedDaysCompleted,
      isAheadOfSchedule,
      isBehindSchedule,
      expectedProblemsByNow,
      problemLag,
      timeLag,
      remainingDays,
      remainingProblems,
      requiredDailyRate,
      currentRate,
      streak: calculateStreak(),
      consistencyScore,
      efficiencyScore,
      velocityTrend,
      currentDay,
      estimatedDaysToComplete,
      estimatedCompletionDate
    };
  }, [progress, dsaPlan, totalProblems, daysSinceStart, startDate]);

  // Status indicators
  const getStatusColor = (value, threshold, reverse = false) => {
    const isGood = reverse ? value < threshold : value >= threshold;
    return isGood ? 'green' : value >= threshold * 0.7 ? 'yellow' : 'red';
  };

  // Format dates
  const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not started';

  const endDate = startDate ? new Date(new Date(startDate).getTime() + (34 * 24 * 60 * 60 * 1000)) : null;
  const formattedEndDate = endDate ? endDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not started';

  const formattedEstimatedDate = statistics.estimatedCompletionDate ? 
    statistics.estimatedCompletionDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'Not available';

  const isChallengeCompleted = statistics.completedDays >= 35;
  const isChallengeExpired = daysSinceStart > 35 && !isChallengeCompleted;

  const handleExport = () => {
    exportProgressData(progress, startDate);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setImportError(null);
      const data = await importProgressData(file);
      handleImportData(data);
    } catch (error) {
      setImportError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If no start date is set, show the start journey section
  if (!startDate) {
    return (
      <div className={`${
        isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-blue-600 to-purple-600'
      } rounded-xl p-6 shadow-lg text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Start Your DSA Journey! 🚀</h2>
            <p className="text-lg mb-8 opacity-90">
              Begin your 35-day DSA challenge and track your progress towards mastering data structures and algorithms.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Choose Your Start Date</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleStartDateSubmit(getIndiaDate())}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Start Today
                  </button>
                  <div className="relative">
                    <input
                      type="date"
                      className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors cursor-pointer"
                      defaultValue={getIndiaDateString()}
                      max={getIndiaDateString()}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        handleStartDateSubmit(date);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <h4 className="font-semibold mb-2">📚 455 Problems</h4>
                <p className="text-sm opacity-80">Comprehensive coverage of DSA topics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <h4 className="font-semibold mb-2">⏱️ 35 Days</h4>
                <p className="text-sm opacity-80">Structured daily learning schedule</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                <h4 className="font-semibold mb-2">🎯 Track Progress</h4>
                <p className="text-sm opacity-80">Monitor your daily achievements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular dashboard content when start date is set
  return (
    <div className="space-y-6" role="main" aria-label="DSA Challenge Dashboard">
      {/* Hero Section with Journey Overview */}
      <div className={`${
        isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-blue-600 to-purple-600'
      } rounded-xl p-6 shadow-lg text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2" id="dashboard-title">
                DSA Challenge Dashboard
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base" aria-labelledby="dashboard-title">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Started: {formattedStartDate}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" aria-hidden="true" />
                  <span>Target: {formattedEndDate}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="w-4 h-4" aria-hidden="true" />
                  <span>Day {daysSinceStart} of 35</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Data Export/Import Buttons and Sheet Link */}
              <div className="flex gap-2">
                <a
                  href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  } text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                  aria-label="View original A2Z DSA Sheet"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">A2Z Sheet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={handleExport}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  } text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                  aria-label="Export progress data"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export Data</span>
                </button>
                
                <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  } text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}>
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Import Data</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    aria-label="Import progress data"
                  />
                </label>
              </div>

              {/* Overall Progress Circle */}
              <div className="relative w-20 h-20 md:w-24 md:h-24" role="progressbar" aria-valuenow={statistics.progressPercentage} aria-valuemin="0" aria-valuemax="100">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${statistics.progressPercentage * 2.51}, 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold">
                    {statistics.progressPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="flex flex-col justify-center">
                {isChallengeCompleted ? (
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full" role="status">
                    <Award className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">Completed!</span>
                  </div>
                ) : isChallengeExpired ? (
                  <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full" role="status">
                    <XCircle className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">Expired</span>
                  </div>
                ) : statistics.isAheadOfSchedule ? (
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full" role="status">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">Ahead</span>
                  </div>
                ) : statistics.isBehindSchedule ? (
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full" role="status">
                    <TrendingDown className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">Behind</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full" role="status">
                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-semibold">On Track</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Alerts */}
      {statistics.problemLag > 5 && (
        <div className={`${
          isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'
        } border rounded-xl p-6 shadow-lg`} role="alert">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h3 className={`font-bold text-lg mb-2 ${
                isDarkMode ? 'text-red-300' : 'text-red-800'
              }`}>
                Action Required: Behind Schedule
              </h3>
              <div className={`space-y-2 ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
                <p>You're <strong>{statistics.problemLag} problems</strong> behind schedule.</p>
                <div className={`mt-4 p-4 rounded-lg ${
                  isDarkMode ? 'bg-red-800/30' : 'bg-red-100'
                }`}>
                  <h4 className="font-semibold mb-3">Quick Recovery Plan:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>+{Math.ceil(statistics.problemLag / statistics.remainingDays)} problems/day</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <span>Start with basics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" aria-hidden="true" />
                      <span>Add 1-2 hours daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {statistics.totalSolvedProblems > statistics.expectedProblemsByNow && (
        <div className={`${
          isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'
        } border rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center gap-4">
            <Star className="w-6 h-6 text-green-500" />
            <div>
              <h3 className={`font-bold text-lg ${
                isDarkMode ? 'text-green-300' : 'text-green-800'
              }`}>
                Outstanding Progress! 🎉
              </h3>
              <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                You're <strong>{statistics.totalSolvedProblems - statistics.expectedProblemsByNow} problems</strong> ahead of schedule. 
                Keep up the excellent work!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Import Error Alert */}
      {importError && (
        <div className={`${
          isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'
        } border rounded-xl p-4 shadow-lg backdrop-blur-sm`} role="alert">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h3 className={`font-bold text-lg mb-2 ${
                isDarkMode ? 'text-red-300' : 'text-red-800'
              }`}>
                Import Failed
              </h3>
              <p className={`${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
                {importError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Statistics">
        <StatsCard
          title="Problems Solved"
          value={`${statistics.totalSolvedProblems}`}
          icon={Target}
          color="blue"
          subtitle={`${statistics.totalSolvedProblems}/${totalProblems} total`}
          progress={statistics.progressPercentage}
          trend={statistics.velocityTrend > 0 ? 'up' : statistics.velocityTrend < 0 ? 'down' : 'stable'}
        />

        <StatsCard
          title="Days Completed"
          value={`${statistics.completedDays}`}
          icon={Calendar}
          color="green"
          subtitle={`${statistics.daysRemaining} days left`}
          progress={(statistics.completedDays / 35) * 100}
        />

        <StatsCard
          title="Est. Completion"
          value={formattedEstimatedDate}
          icon={Clock}
          color="orange"
          subtitle={`${statistics.estimatedDaysToComplete} days remaining`}
        />

        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-100/20' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-100'
        } rounded-xl p-6 shadow-lg border backdrop-blur-sm relative overflow-hidden`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${
              isDarkMode ? 'bg-blue-400/10' : 'bg-blue-400/20'
            } blur-2xl animate-pulse`}></div>
            <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full ${
              isDarkMode ? 'bg-purple-400/10' : 'bg-purple-400/20'
            } blur-2xl animate-pulse delay-1000`}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-blue-100/20' : 'bg-blue-100'
              }`}>
                <Lightbulb className={`w-5 h-5 ${
                  isDarkMode ? 'text-blue-600' : 'text-blue-600'
                } animate-pulse`} aria-hidden="true" />
              </div>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-blue-900' : 'text-blue-900'
              }`}>
                Daily Coding Fact
              </h3>
            </div>

            <div className={`relative min-h-[80px] transition-all duration-500 transform hover:scale-[1.02] ${
              isDarkMode ? 'text-blue-900' : 'text-blue-900'
            }`}>
              <p className="text-base leading-relaxed">
                {isLoading ? (
                  <span className="animate-pulse" role="status">Loading...</span>
                ) : (
                  <span className={`inline-block ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' 
                      : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                  } bg-clip-text text-transparent font-medium`}>
                    {codingFacts[currentFactIndex].content}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Performance Metrics">
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl p-6 shadow-lg border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Consistency Score
            </h3>
            <Brain className={`w-5 h-5 ${
              statistics.consistencyScore >= 80 ? 'text-green-500' : 
              statistics.consistencyScore >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`} aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${
                statistics.consistencyScore >= 80 ? 'text-green-500' : 
                statistics.consistencyScore >= 60 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {statistics.consistencyScore.toFixed(1)}%
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {statistics.completedDays}/{daysSinceStart} days
              </span>
            </div>
            <div className={`w-full bg-gray-200 ${isDarkMode ? 'dark:bg-gray-700' : ''} rounded-full h-2`} role="progressbar" aria-valuenow={statistics.consistencyScore} aria-valuemin="0" aria-valuemax="100">
              <div 
                className={`h-2 rounded-full ${
                  statistics.consistencyScore >= 80 ? 'bg-green-500' : 
                  statistics.consistencyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(statistics.consistencyScore, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl p-6 shadow-lg border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Efficiency Score
            </h3>
            <Zap className={`w-5 h-5 ${
              statistics.efficiencyScore >= 100 ? 'text-green-500' : 
              statistics.efficiencyScore >= 80 ? 'text-yellow-500' : 'text-red-500'
            }`} aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${
                statistics.efficiencyScore >= 100 ? 'text-green-500' : 
                statistics.efficiencyScore >= 80 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {statistics.efficiencyScore.toFixed(1)}%
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                vs expected
              </span>
            </div>
            <div className={`w-full bg-gray-200 ${isDarkMode ? 'dark:bg-gray-700' : ''} rounded-full h-2`}>
              <div 
                className={`h-2 rounded-full ${
                  statistics.efficiencyScore >= 100 ? 'bg-green-500' : 
                  statistics.efficiencyScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(statistics.efficiencyScore, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl p-6 shadow-lg border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Velocity Trend
            </h3>
            {statistics.velocityTrend > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : statistics.velocityTrend < 0 ? (
              <TrendingDown className="w-5 h-5 text-red-500" />
            ) : (
              <Activity className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${
                statistics.velocityTrend > 0 ? 'text-green-500' : 
                statistics.velocityTrend < 0 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {statistics.velocityTrend > 0 ? '+' : ''}{statistics.velocityTrend.toFixed(1)}%
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                last 7 days
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {statistics.velocityTrend > 0 ? 'Accelerating' : 
               statistics.velocityTrend < 0 ? 'Slowing down' : 'Steady pace'}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl p-6 shadow-lg border`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Current Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Day:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Day {daysSinceStart} of 35
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expected Problems:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {statistics.expectedProblemsByNow}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actual Problems:</span>
              <span className={`font-semibold ${
                statistics.totalSolvedProblems >= statistics.expectedProblemsByNow ? 'text-green-500' : 'text-red-500'
              }`}>
                {statistics.totalSolvedProblems}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Rate:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {statistics.currentRate.toFixed(1)} problems/day
              </span>
            </div>
          </div>
        </div>

        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl p-6 shadow-lg border`}>
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Projections & Requirements
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Target Rate:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                13 problems/day
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Required Rate:</span>
              <span className={`font-semibold ${
                statistics.requiredDailyRate <= 13 ? 'text-green-500' : 'text-red-500'
              }`}>
                {statistics.remainingDays > 0 ? statistics.requiredDailyRate.toFixed(1) : 'N/A'} problems/day
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Est. Completion:</span>
              <span className={`font-semibold ${
                statistics.estimatedDaysToComplete <= 35 ? 'text-green-500' : 'text-orange-500'
              }`}>
                {statistics.estimatedDaysToComplete} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remaining:</span>
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {statistics.remainingProblems} problems
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
