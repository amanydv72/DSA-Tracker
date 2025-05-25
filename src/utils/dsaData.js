export const dsaPlan = [
  { day: 1, topics: "Basics + Arrays Easy", problems: 10, week: 1, hours: 8 },
  { day: 2, topics: "Arrays Medium", problems: 12, week: 1, hours: 8 },
  { day: 3, topics: "Arrays Hard + 2D Arrays", problems: 12, week: 1, hours: 8 },
  { day: 4, topics: "Sorting Techniques", problems: 10, week: 1, hours: 8 },
  { day: 5, topics: "Binary Search 1D", problems: 10, week: 1, hours: 8 },
  { day: 6, topics: "Binary Search on Answer", problems: 10, week: 1, hours: 8 },
  { day: 7, topics: "Practice + Revision", problems: 16, week: 1, hours: 8 },
  
  { day: 8, topics: "Recursion Basic", problems: 10, week: 2, hours: 8 },
  { day: 9, topics: "Recursion Advanced + Backtracking", problems: 15, week: 2, hours: 8 },
  { day: 10, topics: "Linked List Basics", problems: 12, week: 2, hours: 8 },
  { day: 11, topics: "LL Advanced (Cycle, Merge, Reverse)", problems: 13, week: 2, hours: 8 },
  { day: 12, topics: "Stack + Queue", problems: 15, week: 2, hours: 8 },
  { day: 13, topics: "Monotonic Stack / Sliding Window", problems: 12, week: 2, hours: 8 },
  { day: 14, topics: "Practice + Revision", problems: 13, week: 2, hours: 8 },
  
  { day: 15, topics: "Trees Basics (DFS, Traversals)", problems: 12, week: 3, hours: 8 },
  { day: 16, topics: "Trees Hard (Diameter, LCA, etc)", problems: 12, week: 3, hours: 8 },
  { day: 17, topics: "BST Basic + Advanced", problems: 15, week: 3, hours: 8 },
  { day: 18, topics: "Heaps + Priority Queue", problems: 12, week: 3, hours: 8 },
  { day: 19, topics: "Tries + Hashing Basics", problems: 14, week: 3, hours: 8 },
  { day: 20, topics: "HashMaps Advanced + Practice", problems: 15, week: 3, hours: 8 },
  { day: 21, topics: "Practice + Revision", problems: 20, week: 3, hours: 8 },
  
  { day: 22, topics: "Graph Basics (BFS, DFS)", problems: 15, week: 4, hours: 8 },
  { day: 23, topics: "Graph Advanced (Dijkstra, Union Find)", problems: 15, week: 4, hours: 8 },
  { day: 24, topics: "Topo Sort + MST", problems: 10, week: 4, hours: 8 },
  { day: 25, topics: "Greedy Techniques", problems: 15, week: 4, hours: 8 },
  { day: 26, topics: "DP Basics (0/1 Knapsack, Fib, etc)", problems: 18, week: 4, hours: 8 },
  { day: 27, topics: "DP Medium (LIS, Subset Sum)", problems: 20, week: 4, hours: 8 },
  { day: 28, topics: "DP Hard (Partitions, Palindromes, etc)", problems: 20, week: 4, hours: 8 },
  { day: 29, topics: "Miscellaneous (Bit Manip, Sliding Window, Math)", problems: 20, week: 4, hours: 8 },
  { day: 30, topics: "Practice + Revision + Mock", problems: 25, week: 4, hours: 8 }
];

export const weekTitles = {
  1: "Foundation - Arrays, Sorting, Searching",
  2: "Recursion, Backtracking, Linked Lists, Stacks & Queues", 
  3: "Trees, BST, Heaps, Tries, Hashing",
  4: "Graphs, DP, Greedy, Miscellaneous"
};

export const totalProblems = dsaPlan.reduce((sum, day) => sum + day.problems, 0);
export const totalHours = dsaPlan.reduce((sum, day) => sum + day.hours, 0);

export const getWeekProblems = (week) => {
  return dsaPlan.filter(day => day.week === week).reduce((sum, day) => sum + day.problems, 0);
};

export const getDaysByWeek = (week) => {
  return dsaPlan.filter(day => day.week === week);
};