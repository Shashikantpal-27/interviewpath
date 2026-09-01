import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "../models/Problem.js";
import "../config/dns.js";
dotenv.config();

const topics = ["Arrays", "Strings", "Linked List", "Trees", "Graphs", "Dynamic Programming", "Recursion", "Sorting", "Hashing", "Stack & Queue"];
const companyPool = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Adobe", "Flipkart", "TCS", "Infosys"];
const difficulties = ["Easy", "Medium", "Hard"];

const titles = [
  "Two Sum", "Reverse a String", "Valid Palindrome", "Merge Two Sorted Lists", "Detect Cycle in Linked List",
  "Maximum Depth of Binary Tree", "Binary Tree Level Order Traversal", "Number of Islands", "Clone Graph",
  "Climbing Stairs", "Longest Common Subsequence", "Coin Change", "Fibonacci Number", "Factorial of a Number",
  "Merge Sort an Array", "Quick Sort an Array", "First Unique Character", "Group Anagrams", "Valid Parentheses",
  "Min Stack", "Implement Queue using Stacks", "Kth Largest Element", "Subarray Sum Equals K", "Rotate Array",
  "Missing Number", "Majority Element", "Best Time to Buy and Sell Stock", "Contains Duplicate",
  "Longest Substring Without Repeating Characters", "Product of Array Except Self",
];

const pick = (arr, n) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const problems = titles.map((title, i) => ({
  title,
  difficulty: difficulties[i % 3],
  topic: topics[i % topics.length],
  companyTags: pick(companyPool, 2 + (i % 2)),
  description: `Given the appropriate input for "${title}", implement a solution that reads input from stdin and prints the expected output to stdout. Follow standard competitive-programming I/O format.`,
  examples: [
    { input: "5", output: "10", explanation: "Sample transformation of the input value." },
    { input: "3", output: "6", explanation: "Sample transformation of the input value." },
  ],
  constraints: ["1 <= n <= 10^5", "Time limit: 2 seconds", "Memory limit: 256 MB"],
  hints: [
    "Think about the brute-force approach first.",
    "Can you optimize using extra space (hashing) or a smarter traversal?",
  ],
  testCases: [
    { input: "5", expectedOutput: "10", isSample: true },
    { input: "3", expectedOutput: "6", isSample: true },
    { input: "10", expectedOutput: "20", isSample: false },
    { input: "1", expectedOutput: "2", isSample: false },
  ],
}));

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Problem.deleteMany({});
    console.log("Cleared existing problems");

    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();