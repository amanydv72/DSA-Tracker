// codingFacts.js

const codingFacts = [
  {
    content:
      "Binary search reduces search time from O(n) to O(log n). Use it on sorted arrays for efficiency.",
    author: "DSA Tip",
  },
  {
    content:
      "Hash tables provide O(1) average lookup time, making them ideal for quick searches.",
    author: "DSA Tip",
  },
  {
    content:
      "Merge sort guarantees O(n log n) time, making it reliable for large datasets.",
    author: "DSA Tip",
  },
  {
    content:
      "Quick sort is faster on average but can degrade to O(n²) in the worst case.",
    author: "DSA Tip",
  },
  {
    content:
      "Heap sort is in-place and has O(n log n) time, but is usually slower than quick sort in practice.",
    author: "DSA Tip",
  },
  {
    content:
      "Breadth-first search (BFS) finds the shortest path in unweighted graphs in O(V+E) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Depth-first search (DFS) is great for exploring all paths and detecting cycles in O(V+E) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Dijkstra's algorithm finds shortest paths in weighted graphs with non-negative weights in O(E + V log V) using a min-heap.",
    author: "DSA Tip",
  },
  {
    content:
      "Bellman-Ford handles negative weights but is slower than Dijkstra: O(VE) time.",
    author: "DSA Tip",
  },
  {
    content: "Floyd-Warshall computes all-pairs shortest paths in O(V³) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Union-Find efficiently handles dynamic connectivity queries in O(α(n)) per operation.",
    author: "DSA Tip",
  },
  {
    content:
      "Trie data structures are perfect for prefix-based string operations, with O(L) time for search/insert.",
    author: "DSA Tip",
  },
  {
    content: "Segment trees allow range queries and updates in O(log n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Fenwick trees (Binary Indexed Trees) are simpler than segment trees for prefix sums, with O(log n) operations.",
    author: "DSA Tip",
  },
  {
    content:
      "Dynamic programming (DP) turns exponential problems into polynomial ones by storing subproblem results.",
    author: "DSA Tip",
  },
  {
    content:
      "Memoization is top-down DP; tabulation is bottom-up. Choose based on recursion depth and stack limits.",
    author: "DSA Tip",
  },
  {
    content:
      "Greedy algorithms make locally optimal choices, but don't always yield global optimum. Use when proven optimal.",
    author: "DSA Tip",
  },
  {
    content:
      "The two-pointer technique solves many array problems in O(n) time, especially for sorted arrays.",
    author: "DSA Tip",
  },
  {
    content:
      "Sliding window is perfect for substring and subarray problems, reducing time from O(n²) to O(n).",
    author: "DSA Tip",
  },
  {
    content:
      "Backtracking explores all possibilities by trying and undoing choices. Useful for permutations and combinations.",
    author: "DSA Tip",
  },
  {
    content:
      "Topological sorting works only on directed acyclic graphs (DAGs) and is O(V+E).",
    author: "DSA Tip",
  },
  {
    content:
      "Kruskal's and Prim's algorithms both find minimum spanning trees in O(E log V) time.",
    author: "DSA Tip",
  },
  {
    content:
      "The knapsack problem is NP-complete; DP provides pseudo-polynomial solutions.",
    author: "DSA Tip",
  },
  {
    content:
      "Edit distance (Levenshtein) measures string similarity in O(mn) time using DP.",
    author: "DSA Tip",
  },
  {
    content:
      "Longest common subsequence (LCS) is a classic DP problem with O(mn) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Bit manipulation can solve problems with incredible space and time efficiency.",
    author: "DSA Tip",
  },
  {
    content:
      "Stack follows LIFO (Last In, First Out); useful for parsing and backtracking.",
    author: "DSA Tip",
  },
  {
    content:
      "Queue follows FIFO (First In, First Out); used in BFS and scheduling.",
    author: "DSA Tip",
  },
  {
    content:
      "Linked lists allow O(1) insertion/deletion but O(n) random access.",
    author: "DSA Tip",
  },
  {
    content: "Arrays provide O(1) random access but O(n) insertion/deletion.",
    author: "DSA Tip",
  },
  {
    content:
      "Balanced BSTs (like AVL, Red-Black) guarantee O(log n) operations.",
    author: "DSA Tip",
  },
  {
    content: "Hash collisions are resolved by chaining or open addressing.",
    author: "DSA Tip",
  },
  {
    content:
      "Priority queues are often implemented with heaps for O(log n) insert and O(1) peek.",
    author: "DSA Tip",
  },
  {
    content:
      "Graph coloring determines if a graph can be colored with k colors. It's NP-complete for k > 2.",
    author: "DSA Tip",
  },
  {
    content:
      "Minimum spanning tree connects all nodes with minimum total edge weight.",
    author: "DSA Tip",
  },
  {
    content: "DFS is better than BFS for topological sort and cycle detection.",
    author: "DSA Tip",
  },
  {
    content: "BFS is better for finding shortest paths in unweighted graphs.",
    author: "DSA Tip",
  },
  {
    content:
      "Use adjacency lists for sparse graphs and adjacency matrices for dense graphs.",
    author: "DSA Tip",
  },
  {
    content:
      "Floyd-Warshall is simple but slow for large graphs; use Dijkstra for single-source shortest path.",
    author: "DSA Tip",
  },
  {
    content:
      "Disjoint Set Union (DSU) with path compression is nearly constant time per operation.",
    author: "DSA Tip",
  },
  {
    content:
      "KMP algorithm finds substrings in O(n + m) time, better than naive O(nm).",
    author: "DSA Tip",
  },
  {
    content:
      "Rabin-Karp uses hashing for substring search, efficient for multiple patterns.",
    author: "DSA Tip",
  },
  {
    content:
      "Trie is better than hash map for prefix queries but uses more space.",
    author: "DSA Tip",
  },
  {
    content:
      "DP is better than recursion for overlapping subproblems to avoid recomputation.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary lifting for fast ancestor queries in trees (O(log n) per query).",
    author: "DSA Tip",
  },
  {
    content:
      "Mo's algorithm answers range queries offline in O((n + q)√n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Sparse Table allows O(1) range minimum queries after O(n log n) preprocessing.",
    author: "DSA Tip",
  },
  {
    content:
      "Suffix arrays and trees are powerful for advanced string matching.",
    author: "DSA Tip",
  },
  {
    content:
      "Manacher's algorithm finds longest palindromic substring in O(n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Tarjan's algorithm finds strongly connected components in O(V+E) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Kosaraju's algorithm is another way to find strongly connected components.",
    author: "DSA Tip",
  },
  {
    content:
      "Floyd's cycle detection (tortoise and hare) finds cycles in O(n) time, O(1) space.",
    author: "DSA Tip",
  },
  {
    content: "Use bitmasks for subset enumeration in O(2^n * n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Meet-in-the-middle technique splits problems for O(2^(n/2)) solutions.",
    author: "DSA Tip",
  },
  {
    content: "Heavy-Light Decomposition is advanced for tree path queries.",
    author: "DSA Tip",
  },
  {
    content:
      "Always analyze time and space complexity before choosing a DSA technique!",
    author: "DSA Tip",
  },
  // Extended Facts
  {
    content:
      "Binary trees have max nodes = 2^h - 1 for height h, and min height = log₂(n+1).",
    author: "DSA Tip",
  },
  {
    content: "Inorder traversal of BST gives sorted order of elements.",
    author: "DSA Tip",
  },
  {
    content:
      "Balanced binary trees (like AVL) maintain O(log n) height for fast operations.",
    author: "DSA Tip",
  },
  {
    content: "Postorder traversal is ideal for deleting a binary tree.",
    author: "DSA Tip",
  },
  {
    content:
      "Recursion is best when the problem can be divided into smaller similar subproblems.",
    author: "DSA Tip",
  },
  {
    content:
      "Backtracking solves constraint satisfaction problems like N-Queens and Sudoku.",
    author: "DSA Tip",
  },
  {
    content:
      "Subset sum and combination problems are best handled with recursion or DP.",
    author: "DSA Tip",
  },
  {
    content: "Kadane’s algorithm finds maximum subarray sum in O(n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Greedy algorithms work well for interval scheduling, activity selection, and Huffman coding.",
    author: "DSA Tip",
  },
  {
    content:
      "Greedy fails for 0/1 Knapsack, but works for Fractional Knapsack.",
    author: "DSA Tip",
  },
  {
    content:
      "In Binary Tree, the diameter is the longest path between any two nodes.",
    author: "DSA Tip",
  },
  {
    content:
      "Lowest Common Ancestor (LCA) can be found using binary lifting in O(log n).",
    author: "DSA Tip",
  },
  {
    content:
      "Heap is best for constant time max/min retrieval, great for priority queues.",
    author: "DSA Tip",
  },
  {
    content: "Z-algorithm computes pattern matches in O(n + m) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Binary search can be used on answer space, known as 'Binary Search on Answers'.",
    author: "DSA Tip",
  },
  {
    content: "Matrix exponentiation reduces recurrence relations to O(log n).",
    author: "DSA Tip",
  },
  {
    content:
      "Top-down DP (memoization) is easier to implement; bottom-up DP (tabulation) is more memory-efficient.",
    author: "DSA Tip",
  },
  {
    content:
      "Greedy + Sorting is a common trick for solving interval-based problems.",
    author: "DSA Tip",
  },
  {
    content:
      "To detect a cycle in a directed graph, use DFS with recursion stack or Kahn’s algorithm.",
    author: "DSA Tip",
  },
  {
    content:
      "0/1 BFS on unweighted graphs with edge weights 0 or 1 works in O(V + E) using deque.",
    author: "DSA Tip",
  },
  {
    content:
      "Multisource BFS starts from multiple nodes at once, useful for grid-based problems.",
    author: "DSA Tip",
  },
  {
    content:
      "Monotonic queues optimize sliding window max/min problems in O(n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "The LIS (Longest Increasing Subsequence) problem has an O(n log n) solution using binary search.",
    author: "DSA Tip",
  },
  {
    content:
      "Matrix chain multiplication and palindromic partitioning are classic DP problems.",
    author: "DSA Tip",
  },
  {
    content:
      "Bitmask DP is ideal for traveling salesman and subset-based problems.",
    author: "DSA Tip",
  },
  {
    content:
      "DFS-based subtree DP is powerful for tree DP problems like counting paths or maximizing scores.",
    author: "DSA Tip",
  },
  {
    content:
      "Difference arrays help with range updates in O(1) and final array construction in O(n).",
    author: "DSA Tip",
  },
  {
    content: "Sliding window maximum can be solved using deque in O(n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Disjoint Set Union (DSU) can be used for Kruskal’s MST, connectivity, and merging components.",
    author: "DSA Tip",
  },
  {
    content:
      "Always dry-run edge cases: empty input, duplicates, all same elements, max/min values.",
    author: "DSA Tip",
  },
  {
    content:
      "Always analyze time and space complexity before choosing a DSA technique!",
    author: "DSA Tip",
  },
  {
    content:
      "Sieve of Eratosthenes finds all primes up to n in O(n log log n) time.",
    author: "DSA Tip",
  },
  {
    content:
      "Prefix sums enable O(1) range sum queries after O(n) preprocessing.",
    author: "DSA Tip",
  },
  {
    content: "Monotonic stacks help solve span/next greater problems in O(n).",
    author: "DSA Tip",
  },
  {
    content:
      "Modular exponentiation computes a^b % m in O(log b) time using binary exponentiation.",
    author: "DSA Tip",
  },
  {
    content:
      "Euclidean Algorithm finds GCD of two numbers in O(log(min(a, b))).",
    author: "DSA Tip",
  },
  {
    content:
      "Sieve + prefix sum is a powerful combo for solving number theory problems efficiently.",
    author: "DSA Tip",
  },
  {
    content:
      "Use hashmap + sliding window to count distinct elements in subarrays efficiently.",
    author: "DSA Tip",
  },
  {
    content:
      "Binary Trees use inorder, preorder, and postorder traversals for various applications.",
    author: "DSA Tip",
  },
  {
    content:
      "LRU Cache is best implemented with hashmap + doubly linked list for O(1) operations.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the first element greater than or equal to x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the last element less than or equal to x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the first element greater than x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the last element less than x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the first element greater than or equal to x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the last element less than or equal to x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the first element greater than x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Use binary search to find the last element less than x in a sorted array.",
    author: "DSA Tip",
  },
  {
    content:
      "Bubble Sort: O(n^2), stable. Swaps adjacent elements until sorted.",
    author: "Sorting",
  },
  {
    content:
      "Selection Sort: O(n^2), unstable. Selects the smallest and swaps.",
    author: "Sorting",
  },
  {
    content: "Insertion Sort: O(n^2), stable. Good for nearly sorted arrays.",
    author: "Sorting",
  },
  {
    content: "Merge Sort: O(n log n), stable. Uses divide and conquer.",
    author: "Sorting",
  },
  {
    content:
      "Quick Sort: O(n log n) avg, O(n^2) worst. Not stable, uses pivot partitioning.",
    author: "Sorting",
  },
  {
    content: "Heap Sort: O(n log n), unstable. Uses heap data structure.",
    author: "Sorting",
  },
  {
    content:
      "Counting Sort: O(n + k), only works with integers. Stable and fast for small ranges.",
    author: "Sorting",
  },
  {
    content: "Radix Sort: O(nk), used for fixed-length digit sorting. Stable.",
    author: "Sorting",
  },
  {
    content: "Bucket Sort: O(n + k), used for uniformly distributed data.",
    author: "Sorting",
  },

  // ✅ Searching Algorithms
  {
    content: "Linear Search: O(n). Check each element sequentially.",
    author: "Searching",
  },
  {
    content: "Binary Search: O(log n). Requires sorted array.",
    author: "Searching",
  },
  {
    content: "Ternary Search: O(log n), useful in unimodal functions.",
    author: "Searching",
  },
  {
    content: "Exponential Search: O(log i), for unbounded sorted arrays.",
    author: "Searching",
  },
  {
    content:
      "Fibonacci Search: Similar to binary search, uses Fibonacci numbers.",
    author: "Searching",
  },

  // ✅ Arrays & Strings
  {
    content:
      "Two Pointer Technique solves problems like pair sum, reverse, and partitioning efficiently.",
    author: "Array",
  },
  {
    content:
      "Sliding Window Technique reduces complexity in substring, max sum subarray problems.",
    author: "Array",
  },
  {
    content:
      "Prefix Sum allows O(1) range sum queries after O(n) precomputation.",
    author: "Array",
  },
  { content: "Difference Array supports O(1) range updates.", author: "Array" },
  { content: "Kadane's Algorithm: O(n) max subarray sum.", author: "Array" },
  {
    content: "Z-Algorithm: Computes longest common prefix in linear time.",
    author: "String",
  },
  {
    content: "Rabin-Karp: O(n + m), uses rolling hash for string matching.",
    author: "String",
  },
  {
    content:
      "KMP Algorithm: O(n + m), prefix function avoids re-checking characters.",
    author: "String",
  },
  {
    content:
      "Manacher’s Algorithm: Finds longest palindromic substring in O(n).",
    author: "String",
  },

  // ✅ Linked List
  {
    content: "Singly Linked List supports O(1) insert at head, O(n) at tail.",
    author: "Linked List",
  },
  {
    content: "Doubly Linked List supports O(1) insert/delete at both ends.",
    author: "Linked List",
  },
  {
    content:
      "Floyd's Cycle Detection (Tortoise and Hare) detects loops in O(n).",
    author: "Linked List",
  },

  // ✅ Stack and Queue
  {
    content: "Stack: LIFO, used in expression parsing, DFS, function calls.",
    author: "Stack",
  },
  { content: "Queue: FIFO, used in BFS, scheduling, etc.", author: "Queue" },
  {
    content: "Deque supports insertion/removal from both ends in O(1).",
    author: "Queue",
  },
  {
    content: "Monotonic Stack: Helps in next greater/smaller element problems.",
    author: "Stack",
  },
  {
    content: "Monotonic Queue: Used in sliding window max/min in O(n).",
    author: "Queue",
  },

  // ✅ Trees and Binary Trees
  {
    content:
      "Binary Tree has max 2 children; Binary Search Tree (BST) maintains order: left < root < right.",
    author: "Tree",
  },
  {
    content:
      "AVL Tree: Self-balancing BST with rotations. Keeps height ~log n.",
    author: "Tree",
  },
  {
    content: "Segment Tree: Efficient range queries and updates in O(log n).",
    author: "Tree",
  },
  {
    content: "Fenwick Tree (BIT): Simpler than segment tree for prefix sums.",
    author: "Tree",
  },
  {
    content:
      "Trie: Tree-like structure for prefix matching, O(length) operations.",
    author: "Tree",
  },
  {
    content: "Binary Lifting: O(log n) ancestor queries in trees.",
    author: "Tree",
  },
  {
    content: "Lowest Common Ancestor (LCA) algorithms optimize tree queries.",
    author: "Tree",
  },

  // ✅ Graphs
  {
    content: "DFS explores as deep as possible; used in cycles, components.",
    author: "Graph",
  },
  {
    content: "BFS finds shortest path in unweighted graph. O(V + E).",
    author: "Graph",
  },
  {
    content:
      "Dijkstra's Algorithm: O(E log V), for shortest path with non-negative weights.",
    author: "Graph",
  },
  {
    content: "Bellman-Ford: O(VE), handles negative weights.",
    author: "Graph",
  },
  {
    content: "Floyd-Warshall: O(V^3), all-pairs shortest path.",
    author: "Graph",
  },
  {
    content: "Union-Find (DSU): O(α(n)) for union/find. Used in Kruskal’s MST.",
    author: "Graph",
  },
  {
    content: "Topological Sort orders tasks with dependencies in a DAG.",
    author: "Graph",
  },
  {
    content:
      "Kosaraju’s Algorithm: O(V + E) to find strongly connected components.",
    author: "Graph",
  },
  {
    content:
      "Tarjan's Algorithm finds bridges and articulation points in O(V + E).",
    author: "Graph",
  },

  // ✅ Dynamic Programming
  { content: "Memoization: Top-down approach with caching.", author: "DP" },
  {
    content:
      "Tabulation: Bottom-up approach, often faster and uses less stack.",
    author: "DP",
  },
  {
    content: "Knapsack 0/1 Problem: Classic DP problem with state dp[i][w].",
    author: "DP",
  },
  {
    content: "LCS: O(n*m) DP to find longest common subsequence.",
    author: "DP",
  },
  {
    content:
      "Edit Distance: O(n*m), uses DP to transform one string to another.",
    author: "DP",
  },
  {
    content:
      "Bitmask DP: Used in problems with subsets/permutations up to 2^n.",
    author: "DP",
  },
  {
    content:
      "Matrix Exponentiation: O(log n) for fast Fibonacci and recurrence solutions.",
    author: "DP",
  },

  // ✅ Recursion and Backtracking
  {
    content:
      "Backtracking undoes decisions. Used in N-Queens, Sudoku, Subsets.",
    author: "Backtracking",
  },
  {
    content:
      "Recursive Tree explores all states; avoid recomputation via memoization.",
    author: "Recursion",
  },

  // ✅ Bit Manipulation
  {
    content: "x & (x-1) clears the lowest set bit.",
    author: "Bit Manipulation",
  },
  {
    content: "Check if n is power of 2: n > 0 && (n & (n-1)) == 0.",
    author: "Bit Manipulation",
  },
  {
    content:
      "XOR of all elements gives unique element when others are repeated.",
    author: "Bit Manipulation",
  },
  {
    content: "Bitmasking is used for subset generation and DP states.",
    author: "Bit Manipulation",
  },

  // ✅ Math and Number Theory
  {
    content:
      "Sieve of Eratosthenes generates primes up to n in O(n log log n).",
    author: "Math",
  },
  {
    content: "GCD(a, b) = GCD(b, a % b); computed in O(log min(a, b)).",
    author: "Math",
  },
  { content: "LCM(a, b) = a*b / GCD(a, b).", author: "Math" },
  {
    content: "Modular exponentiation computes a^b % m in O(log b).",
    author: "Math",
  },
  {
    content: "Modular inverse using Fermat’s Little Theorem if mod is prime.",
    author: "Math",
  },

  // ✅ Greedy Algorithms
  {
    content:
      "Greedy works when local optimal = global optimal. E.g., Activity Selection.",
    author: "Greedy",
  },
  {
    content: "Huffman Coding uses greedy strategy for optimal encoding.",
    author: "Greedy",
  },

  // ✅ Caching & LRU
  {
    content: "LRU Cache uses HashMap + Doubly Linked List for O(1) operations.",
    author: "System Design",
  },

  // ✅ Geometry
  {
    content: "Graham Scan/Monotone Chain find convex hull in O(n log n).",
    author: "Geometry",
  },
  {
    content:
      "Cross product determines turn direction: left, right, or colinear.",
    author: "Geometry",
  },

  // ✅ Divide and Conquer
  {
    content: "Merge Sort and Quick Sort use divide and conquer for efficiency.",
    author: "Divide & Conquer",
  },
  {
    content: "Matrix Multiplication can be sped up using Strassen’s Algorithm.",
    author: "Divide & Conquer",
  },

  // ✅ Miscellaneous
  {
    content:
      "Meet-in-the-middle: O(2^(n/2)) for subset problems when n is small.",
    author: "Advanced",
  },
  {
    content:
      "Reservoir Sampling selects k random items from stream of unknown size.",
    author: "Advanced",
  },
  {
    content:
      "Binary Search on Answer: Apply binary search to range of answers.",
    author: "Advanced",
  },
];

export default codingFacts;
