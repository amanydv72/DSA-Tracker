export const dsaPlan = [
  // Week 1: Foundation - Arrays, Sorting, Searching
  { day: 1, topics: "Time & Space Complexity + Basics of Arrays", problems: 13, week: 1, hours: 8 },
  { day: 2, topics: "Arrays Easy Level (Traversal, Basic Manipulations)", problems: 13, week: 1, hours: 8 },
  { day: 3, topics: "Arrays Medium Level (Kadane’s, Majority, etc.)", problems: 13, week: 1, hours: 8 },
  { day: 4, topics: "2D Arrays + Prefix Sum + Advanced Manipulations", problems: 13, week: 1, hours: 8 },
  { day: 5, topics: "Sorting Algorithms (Selection, Bubble, Insertion, Merge)", problems: 13, week: 1, hours: 8 },
  { day: 6, topics: "Binary Search Basics + Variants on 1D Arrays", problems: 13, week: 1, hours: 8 },
  { day: 7, topics: "Binary Search on Answer + Practice & Revision", problems: 13, week: 1, hours: 8 },

  // Week 2: Recursion, Backtracking, Linked Lists, Stacks & Queues
  { day: 8, topics: "Recursion Basics (Print, Backtrack, Factorial, Fibonacci)", problems: 13, week: 2, hours: 8 },
  { day: 9, topics: "Advanced Recursion + Backtracking (N-Queens, Subsets)", problems: 13, week: 2, hours: 8 },
  { day: 10, topics: "Singly Linked List Basics (Insertion, Deletion, Traverse)", problems: 13, week: 2, hours: 8 },
  { day: 11, topics: "Advanced Linked List (Reverse, Cycle Detection, Merge)", problems: 13, week: 2, hours: 8 },
  { day: 12, topics: "Stack & Queue Basics + Implementations (Infix, Prefix)", problems: 13, week: 2, hours: 8 },
  { day: 13, topics: "Monotonic Stack + Sliding Window Maximum/Minimum", problems: 13, week: 2, hours: 8 },
  { day: 14, topics: "Linked List & Recursion Revision + Practice", problems: 13, week: 2, hours: 8 },

  // Week 3: Trees, BST, Heaps, Tries, Hashing
  { day: 15, topics: "Trees Basics (DFS, BFS, Height, Diameter)", problems: 13, week: 3, hours: 8 },
  { day: 16, topics: "Binary Tree Traversals + Advanced (LCA, Path Sum)", problems: 13, week: 3, hours: 8 },
  { day: 17, topics: "Binary Search Tree (BST) - Operations & Properties", problems: 13, week: 3, hours: 8 },
  { day: 18, topics: "Heaps (Min/Max), Heap Sort, K-Largest Elements", problems: 13, week: 3, hours: 8 },
  { day: 19, topics: "Tries Basics (Insert/Search Words, Prefix Problems)", problems: 13, week: 3, hours: 8 },
  { day: 20, topics: "Hashing Techniques (Map, Set, Count, Frequency)", problems: 13, week: 3, hours: 8 },
  { day: 21, topics: "Tree, BST & Hashing Revision + Practice", problems: 13, week: 3, hours: 8 },

  // Week 4: Graphs, DP, Greedy
  { day: 22, topics: "Graphs Basics (BFS, DFS, Adjacency List/Matrix)", problems: 13, week: 4, hours: 8 },
  { day: 23, topics: "Topological Sort + Union Find + Cycle Detection", problems: 13, week: 4, hours: 8 },
  { day: 24, topics: "Dijkstra, Prim’s, Kruskal’s (MST + Shortest Paths)", problems: 13, week: 4, hours: 8 },
  { day: 25, topics: "Greedy Algorithms (Activity Selection, Job Sequencing)", problems: 13, week: 4, hours: 8 },
  { day: 26, topics: "Dynamic Programming Basics (0/1 Knapsack, Fibonacci)", problems: 13, week: 4, hours: 8 },
  { day: 27, topics: "DP Medium (LIS, Subset Sum, Partition Equal Subset)", problems: 13, week: 4, hours: 8 },
  { day: 28, topics: "DP Hard (Palindromic Substrings, MCM, DP on Trees)", problems: 13, week: 4, hours: 8 },

  // Week 5: Advanced Topics and Practice
  { day: 29, topics: "Bit Manipulation + Mathematics (GCD, Primes, XOR)", problems: 13, week: 5, hours: 8 },
  { day: 30, topics: "Sliding Window + Two Pointer Advanced (Min Substring, K Distinct)", problems: 13, week: 5, hours: 8 },
  { day: 31, topics: "String Algorithms (Z-Algorithm, KMP, Rabin Karp)", problems: 13, week: 5, hours: 8 },
  { day: 32, topics: "Advanced Arrays (Spiral, Next Permutation, Trapping Rain)", problems: 13, week: 5, hours: 8 },
  { day: 33, topics: "Advanced Trees (Serialization, Views, Boundary, Zigzag)", problems: 13, week: 5, hours: 8 },
  { day: 34, topics: "Hard Graph Problems (Bridges, Articulation Points, DP on Graphs)", problems: 13, week: 5, hours: 8 },
  { day: 35, topics: "Final Practice, Full Mock DSA Set + Weak Areas", problems: 13, week: 5, hours: 8 }
];


export const weekTitles = {
  1: "Foundation - Arrays, Sorting & Binary Search",
  2: "Recursion, Backtracking, Linked Lists, Stack & Queues",
  3: "Trees, BST, Heaps, Tries, Hashing",
  4: "Graphs, DP, and Greedy Algorithms",
  5: "Advanced Topics, Bit Magic, and Final Practice"
};

export const totalProblems = dsaPlan.reduce((sum, day) => sum + day.problems, 0);
export const totalHours = dsaPlan.reduce((sum, day) => sum + day.hours, 0);

export const getWeekProblems = (week) => {
  return dsaPlan.filter(day => day.week === week).reduce((sum, day) => sum + day.problems, 0);
};

export const getDaysByWeek = (week) => {
  return dsaPlan.filter(day => day.week === week);
};