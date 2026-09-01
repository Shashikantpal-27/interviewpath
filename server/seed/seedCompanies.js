import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "../models/Company.js";
import "../config/dns.js";
dotenv.config();

const companies = [
  {
    name: "Google",
    industry: "Technology",
    difficulty: "Hard",
    description: "Search, cloud, and AI products at massive scale.",
    overview:
      "Google's interview process emphasizes strong DSA fundamentals, clean code, and scalable system design, alongside Googleyness/behavioral rounds.",
    popularRoles: ["SDE", "SRE", "Data Scientist", "Product Manager"],
    interviewRounds: [
      { name: "Online Assessment", description: "2 DSA problems, 90 minutes" },
      { name: "Phone Screen", description: "1-2 rounds of live coding" },
      { name: "Onsite - Coding", description: "2-3 rounds of DSA + problem solving" },
      { name: "Onsite - System Design", description: "For SDE II and above" },
      { name: "Googleyness & Leadership", description: "Behavioral round" },
    ],
    topics: {
      DSA: ["Arrays", "Graphs", "Dynamic Programming", "Trees"],
      DBMS: ["Indexing", "Transactions"],
      OS: ["Concurrency", "Memory Management"],
      OOP: ["Design Patterns"],
      "System Design": ["Distributed Systems", "Load Balancing", "Caching"],
    },
    behavioralQuestions: [
      "Tell me about a time you disagreed with a teammate.",
      "Describe a challenging project you led.",
    ],
    codingQuestionsCount: 6,
  },
  {
    name: "Amazon",
    industry: "E-commerce",
    difficulty: "Medium",
    description: "Global e-commerce and cloud computing (AWS).",
    overview:
      "Amazon interviews are heavily driven by their Leadership Principles combined with strong DSA rounds.",
    popularRoles: ["SDE", "Cloud Support Engineer", "Data Engineer"],
    interviewRounds: [
      { name: "Online Assessment", description: "2 DSA + Work Simulation" },
      { name: "Phone Screen", description: "1 DSA round + LP questions" },
      { name: "Onsite Loop", description: "4-5 rounds mixing DSA, design, LPs" },
      { name: "Bar Raiser", description: "Deep-dive LP focused round" },
    ],
    topics: {
      DSA: ["Arrays", "Strings", "Trees", "Heaps"],
      DBMS: ["SQL Joins", "Normalization"],
      OS: ["Threads", "Scheduling"],
      OOP: ["Encapsulation", "Inheritance"],
      "System Design": ["Scalability", "Microservices"],
    },
    behavioralQuestions: [
      "Tell me about a time you took ownership of a failure.",
      "Describe a time you had to deliver results under pressure.",
    ],
    codingQuestionsCount: 5,
  },
  {
    name: "Microsoft",
    industry: "Technology",
    difficulty: "Medium",
    description: "Cloud (Azure), productivity software, and OS.",
    overview:
      "Microsoft interviews focus on problem-solving ability, code quality, and collaboration, with growth-mindset behavioral questions.",
    popularRoles: ["SDE", "Program Manager", "Data Scientist"],
    interviewRounds: [
      { name: "Online Assessment", description: "DSA + MCQs" },
      { name: "Phone Screen", description: "1 live coding round" },
      { name: "Onsite Loop", description: "3-4 rounds: coding, design, behavioral" },
      { name: "As Appropriate (AA) Round", description: "Final hiring manager round" },
    ],
    topics: {
      DSA: ["Linked Lists", "Trees", "Recursion"],
      DBMS: ["Indexing", "Query Optimization"],
      OS: ["Deadlocks", "Virtual Memory"],
      OOP: ["Polymorphism", "SOLID Principles"],
      "System Design": ["API Design", "Caching"],
    },
    behavioralQuestions: [
      "Tell me about a time you learned something new quickly.",
      "Describe a conflict with a coworker and how you resolved it.",
    ],
    codingQuestionsCount: 4,
  },
  {
    name: "Meta",
    industry: "Social Media",
    difficulty: "Hard",
    description: "Social networking, VR/AR, and ad tech.",
    overview:
      "Meta interviews are fast-paced, emphasizing coding speed, product sense, and behavioral rounds tied to their core values.",
    popularRoles: ["SDE", "Product Manager", "Data Engineer"],
    interviewRounds: [
      { name: "Recruiter Screen", description: "Background discussion" },
      { name: "Technical Screen", description: "1-2 DSA rounds" },
      { name: "Onsite - Coding", description: "2 rounds of DSA" },
      { name: "Onsite - System Design", description: "For mid+ level" },
      { name: "Behavioral", description: "Values-based interview" },
    ],
    topics: {
      DSA: ["Arrays", "Graphs", "Dynamic Programming"],
      DBMS: ["Sharding", "Replication"],
      OS: ["Concurrency"],
      OOP: ["Design Patterns"],
      "System Design": ["News Feed Design", "Chat Systems"],
    },
    behavioralQuestions: [
      "Tell me about a time you moved fast and broke something.",
      "Describe a time you had to influence without authority.",
    ],
    codingQuestionsCount: 5,
  },
  {
    name: "Apple",
    industry: "Technology",
    difficulty: "Hard",
    description: "Consumer hardware, software, and services.",
    overview:
      "Apple interviews emphasize deep technical expertise, attention to detail, and a strong product-craft mindset.",
    popularRoles: ["SDE", "iOS Engineer", "Hardware Engineer"],
    interviewRounds: [
      { name: "Recruiter Screen", description: "Background + role fit" },
      { name: "Technical Phone Screen", description: "1-2 DSA rounds" },
      { name: "Onsite Loop", description: "4-6 rounds across teams" },
    ],
    topics: {
      DSA: ["Arrays", "Strings", "Trees"],
      DBMS: ["Basic SQL"],
      OS: ["Memory Management", "Multithreading"],
      OOP: ["Design Patterns", "Abstraction"],
      "System Design": ["Mobile App Architecture"],
    },
    behavioralQuestions: [
      "Tell me about a project where attention to detail mattered.",
      "Describe how you handle ambiguous requirements.",
    ],
    codingQuestionsCount: 3,
  },
  {
    name: "Netflix",
    industry: "Entertainment",
    difficulty: "Hard",
    description: "Streaming platform with large-scale distributed systems.",
    overview:
      "Netflix interviews value senior-level ownership, strong system design, and culture-fit ('Freedom & Responsibility').",
    popularRoles: ["Senior SDE", "Data Engineer", "SRE"],
    interviewRounds: [
      { name: "Recruiter Screen", description: "Culture and background fit" },
      { name: "Technical Screen", description: "Coding + design discussion" },
      { name: "Onsite Loop", description: "System design + coding + culture" },
    ],
    topics: {
      DSA: ["Graphs", "Dynamic Programming"],
      DBMS: ["Distributed Databases"],
      OS: ["Concurrency"],
      OOP: ["Design Patterns"],
      "System Design": ["Video Streaming", "Recommendation Systems"],
    },
    behavioralQuestions: [
      "Tell me about a time you made a high-stakes decision independently.",
      "Describe your approach to giving direct feedback.",
    ],
    codingQuestionsCount: 3,
  },
  {
    name: "Adobe",
    industry: "Software",
    difficulty: "Medium",
    description: "Creative software and digital experience platforms.",
    overview: "Adobe focuses on strong CS fundamentals, coding, and system design for senior roles.",
    popularRoles: ["SDE", "QA Engineer", "Data Scientist"],
    interviewRounds: [
      { name: "Online Assessment", description: "2 DSA problems" },
      { name: "Technical Interview", description: "1-2 coding rounds" },
      { name: "Onsite/Virtual Loop", description: "Design + behavioral" },
    ],
    topics: {
      DSA: ["Arrays", "Strings", "Trees"],
      DBMS: ["Normalization", "Indexing"],
      OS: ["Process Management"],
      OOP: ["Inheritance", "Polymorphism"],
      "System Design": ["File Storage Systems"],
    },
    behavioralQuestions: ["Tell me about a time you solved a tough bug.", "Describe your ideal team environment."],
    codingQuestionsCount: 2,
  },
  {
    name: "Flipkart",
    industry: "E-commerce",
    difficulty: "Medium",
    description: "India's leading e-commerce marketplace.",
    overview: "Flipkart interviews cover DSA, LLD, and system design with a strong focus on real-world problems.",
    popularRoles: ["SDE", "Data Analyst", "Product Manager"],
    interviewRounds: [
      { name: "Online Assessment", description: "DSA + Aptitude" },
      { name: "Technical Round 1", description: "DSA problem solving" },
      { name: "Technical Round 2", description: "LLD/HLD design" },
      { name: "Hiring Manager Round", description: "Behavioral + role fit" },
    ],
    topics: {
      DSA: ["Arrays", "Strings", "Graphs"],
      DBMS: ["SQL Queries", "Transactions"],
      OS: ["Scheduling"],
      OOP: ["LLD", "Design Patterns"],
      "System Design": ["Inventory Systems", "Order Management"],
    },
    behavioralQuestions: ["Tell me about a time you handled a production issue.", "Why Flipkart?"],
    codingQuestionsCount: 2,
  },
  {
    name: "TCS",
    industry: "IT Services",
    difficulty: "Easy",
    description: "Global IT services and consulting.",
    overview: "TCS interviews are entry-level friendly, focusing on programming basics, aptitude, and communication.",
    popularRoles: ["Software Engineer", "System Engineer", "Analyst"],
    interviewRounds: [
      { name: "Aptitude Test", description: "Quant, logical reasoning, verbal" },
      { name: "Technical Interview", description: "Basic DSA + programming fundamentals" },
      { name: "HR Interview", description: "Communication and fit" },
    ],
    topics: {
      DSA: ["Arrays", "Basic Recursion"],
      DBMS: ["Basic SQL"],
      OS: ["Basics of Processes"],
      OOP: ["Fundamentals of OOP"],
      "System Design": [],
    },
    behavioralQuestions: ["Tell me about yourself.", "Why do you want to join TCS?"],
    codingQuestionsCount: 2,
  },
  {
    name: "Infosys",
    industry: "IT Services",
    difficulty: "Easy",
    description: "Global IT consulting and digital services.",
    overview: "Infosys interviews focus on foundational programming skills, pseudocode, and communication.",
    popularRoles: ["Systems Engineer", "Power Programmer", "Analyst"],
    interviewRounds: [
      { name: "Online Test", description: "Aptitude + pseudocode" },
      { name: "Technical Interview", description: "Basic DSA + OOP concepts" },
      { name: "HR Interview", description: "Fit and communication" },
    ],
    topics: {
      DSA: ["Arrays", "Sorting Basics"],
      DBMS: ["Basic SQL"],
      OS: ["Basics"],
      OOP: ["Classes", "Objects"],
      "System Design": [],
    },
    behavioralQuestions: ["Tell me about yourself.", "Describe a project you're proud of."],
    codingQuestionsCount: 1,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Company.deleteMany({});
    console.log("Cleared existing companies");

    await Company.insertMany(companies);
    console.log(`Seeded ${companies.length} companies`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();