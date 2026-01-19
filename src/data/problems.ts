export type Difficulty = "Easy" | "Medium" | "Hard";

export interface SampleIO {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemConfig {
  id: string;
  slug: string;
  title: string;
  number: number;
  difficulty: Difficulty;
  description: string;
  samples: SampleIO[];
  constraints: string[];
  edgeCases: string[];
  tags: string[];
  acceptance: string;
  locked: boolean;
  hints?: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  companies?: string[];
  relatedProblems?: number[];
}

export const problems: ProblemConfig[] = [
  {
    id: "two-sum",
    slug: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    acceptance: "49.2%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Microsoft"],
    relatedProblems: [15, 167],
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may not use the same element twice and you can return the answer in any order.",
    samples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10^4",
      "-10^9 ≤ nums[i] ≤ 10^9",
      "-10^9 ≤ target ≤ 10^9",
      "Only one valid answer exists",
    ],
    edgeCases: [
      "Array with negative numbers",
      "Target is zero",
      "Large array size",
    ],
    hints: [
      "Try using a hash map to store numbers you've seen",
      "For each number, check if target - number exists in the map",
    ],
  },
  {
    id: "add-two-numbers",
    slug: "add-two-numbers",
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"],
    acceptance: "41.8%",
    locked: false,
    timeComplexity: "O(max(m, n))",
    spaceComplexity: "O(max(m, n))",
    companies: ["Amazon", "Microsoft", "Apple"],
    relatedProblems: [445, 43],
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    samples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807",
      },
      {
        input: "l1 = [9,9,9,9], l2 = [9,9,9,9,9,9,9]",
        output: "[8,9,9,9,0,0,0,1]",
        explanation: "9999 + 9999999 = 10009998",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 ≤ Node.val ≤ 9",
      "It is guaranteed that the list represents a number that does not have leading zeros",
    ],
    edgeCases: [
      "Lists of different lengths",
      "Carry propagates to create new node",
      "One list is [0]",
    ],
    hints: [
      "Don't forget about the carry when adding digits",
      "Handle the case where one list is longer than the other",
    ],
  },
  {
    id: "longest-substring",
    slug: "longest-substring-without-repeating-characters",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptance: "34.1%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m))",
    companies: ["Amazon", "Google", "Facebook"],
    relatedProblems: [159, 340],
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    samples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3',
      },
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces",
    ],
    edgeCases: [
      "Empty string",
      "All characters are the same",
      "No repeating characters",
    ],
    hints: [
      "Use the sliding window technique",
      "Keep track of character positions in a hash map",
    ],
  },
  {
    id: "median-sorted-arrays",
    slug: "median-of-two-sorted-arrays",
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptance: "38.7%",
    locked: false,
    timeComplexity: "O(log(min(m, n)))",
    spaceComplexity: "O(1)",
    companies: ["Google", "Microsoft", "Amazon"],
    relatedProblems: [295, 462],
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    samples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m ≤ 1000",
      "0 ≤ n ≤ 1000",
      "1 ≤ m + n ≤ 2000",
      "-10^6 ≤ nums1[i], nums2[i] ≤ 10^6",
    ],
    edgeCases: [
      "One array is empty",
      "Arrays of vastly different sizes",
      "All elements in one array are smaller",
    ],
    hints: [
      "Use binary search on the smaller array",
      "Find the correct partition point in both arrays",
    ],
  },
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    number: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    acceptance: "40.5%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft", "Facebook"],
    relatedProblems: [22, 32],
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and open brackets must be closed in the correct order.",
    samples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string is valid",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly closed",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Mismatched bracket types",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10^4",
      "s consists of parentheses only '()[]{}'",
    ],
    edgeCases: [
      "Single opening bracket",
      "Mismatched closing bracket",
      "Odd length string",
    ],
    hints: [
      "Use a stack to keep track of opening brackets",
      "When you see a closing bracket, check if it matches the top of the stack",
    ],
  },
  {
    id: "merge-intervals",
    slug: "merge-intervals",
    number: 56,
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    acceptance: "46.8%",
    locked: false,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Google", "Bloomberg"],
    relatedProblems: [57, 252, 253],
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    samples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10^4",
      "intervals[i].length == 2",
      "0 ≤ starti ≤ endi ≤ 10^4",
    ],
    edgeCases: [
      "All intervals overlap",
      "No overlapping intervals",
      "Single interval",
    ],
    hints: [
      "Start by sorting intervals by their start time",
      "Iterate through sorted intervals and merge when they overlap",
    ],
  },
  {
    id: "climbing-stairs",
    slug: "climbing-stairs",
    number: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    acceptance: "52.1%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Adobe", "Apple"],
    relatedProblems: [746, 509],
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    samples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways: 1 step + 1 step, or 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "Three ways: 1+1+1, 1+2, or 2+1",
      },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    edgeCases: [
      "n = 1 (only one way)",
      "Large n requiring optimization",
    ],
    hints: [
      "This is essentially a Fibonacci sequence problem",
      "Use dynamic programming to avoid recalculating values",
    ],
  },
  {
    id: "reverse-linked-list",
    slug: "reverse-linked-list",
    number: 206,
    title: "Reverse Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptance: "73.4%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) iterative, O(n) recursive",
    companies: ["Amazon", "Microsoft", "Apple"],
    relatedProblems: [92, 25],
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    samples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The list is reversed",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "Simple two-node reversal",
      },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000]",
      "-5000 ≤ Node.val ≤ 5000",
    ],
    edgeCases: [
      "Empty list (null)",
      "Single node",
      "Two nodes",
    ],
    hints: [
      "Try solving it iteratively with three pointers",
      "Can you solve it recursively?",
    ],
  },
  {
    id: "binary-tree-inorder",
    slug: "binary-tree-inorder-traversal",
    number: 94,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    tags: ["Tree", "Stack", "DFS"],
    acceptance: "74.3%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    companies: ["Amazon", "Microsoft", "Facebook"],
    relatedProblems: [144, 145],
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    samples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder traversal: left -> root -> right",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100]",
      "-100 ≤ Node.val ≤ 100",
    ],
    edgeCases: [
      "Empty tree",
      "Single node tree",
      "Only left children",
    ],
    hints: [
      "Recursion is the easiest approach",
      "Can you do it iteratively using a stack?",
    ],
  },
  {
    id: "maximum-subarray",
    slug: "maximum-subarray",
    number: 53,
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    acceptance: "50.6%",
    locked: false,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    companies: ["Amazon", "Microsoft", "LinkedIn"],
    relatedProblems: [121, 152],
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    samples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10^5",
      "-10^4 ≤ nums[i] ≤ 10^4",
    ],
    edgeCases: [
      "All negative numbers",
      "Single element",
      "All positive numbers",
    ],
    hints: [
      "Try using Kadane's algorithm",
      "Keep track of the maximum sum ending at each position",
    ],
  },
  {
    id: "regular-expression",
    slug: "regular-expression-matching",
    number: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    tags: ["String", "Dynamic Programming", "Recursion"],
    acceptance: "28.5%",
    locked: true,
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    companies: ["Google", "Facebook", "Amazon"],
    relatedProblems: [44, 65],
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
    samples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa"',
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: '"*" means zero or more of the preceding element, \'a\', therefore it matches "aa"',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 20",
      "1 ≤ p.length ≤ 20",
      "s contains only lowercase English letters",
      "p contains only lowercase English letters, '.', and '*'",
    ],
    edgeCases: [
      "Empty string with pattern",
      "Pattern with multiple consecutive stars",
      "Pattern longer than string",
    ],
    hints: [
      "This is a classic dynamic programming problem",
      "Consider using a 2D DP table",
    ],
  },
];

// ✅ KEEP AS ARRAYS (not functions)
export const allTags = [...new Set(problems.flatMap((p) => p.tags))].sort();

export const allCompanies = [
  ...new Set(problems.flatMap((p) => p.companies || [])),
].sort();

export const getDifficultyCount = () => {
  return {
    Easy: problems.filter((p) => p.difficulty === "Easy").length,
    Medium: problems.filter((p) => p.difficulty === "Medium").length,
    Hard: problems.filter((p) => p.difficulty === "Hard").length,
  };
};

export const getProblemsByDifficulty = (difficulty: Difficulty) => {
  return problems.filter((p) => p.difficulty === difficulty);
};

export const getProblemsByTag = (tag: string) => {
  return problems.filter((p) => p.tags.includes(tag));
};

export const getProblemsByCompany = (company: string) => {
  return problems.filter((p) => p.companies?.includes(company));
};

export const getRelatedProblems = (problemNumber: number) => {
  const problem = problems.find((p) => p.number === problemNumber);
  if (!problem || !problem.relatedProblems) return [];
  
  return problems.filter((p) => problem.relatedProblems?.includes(p.number));
};
