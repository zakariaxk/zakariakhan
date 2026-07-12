export type Project = {
  id: string;
  name: string;
  signal: string;
  summary: string;
  role: string;
  stack: string[];
  challenge: string;
  outcome: string;
  github?: string;
  live?: string;
  featured: boolean;
  position: [number, number, number];
};

export const identity = {
  name: "Zakaria Khan",
  designation: "SIGNAL SEEKER / SYSTEMS BUILDER",
  statement: "Mapping difficult systems at the edge of what I know.",
  bio: "I build software where ambiguity is high and the path is not obvious. My work moves across intelligent systems, real-time platforms, quantitative tools, and full-stack products—always driven by the same instinct: understand the signal, make the system legible, and keep moving toward harder questions.",
};

export const projects: Project[] = [
  {
    id: "stabilitynet",
    name: "StabilityNet",
    signal: "MOBILITY INTELLIGENCE / 01",
    summary: "A temporal behavior modeling system for mobility analysis and fall-risk detection from video.",
    role: "Machine Learning Engineer",
    stack: ["Python", "Computer Vision", "Temporal Modeling", "ML"],
    challenge: "Translate continuous human motion into reliable temporal signals without reducing complex behavior to isolated frames.",
    outcome: "A research-oriented pipeline that connects video observations to interpretable mobility and risk patterns.",
    github: "https://github.com/zakariaxk/StabilityNet-Mobility-Behavior-Analysis",
    featured: true,
    position: [-3.4, 1.2, -1.1],
  },
  {
    id: "waypoints",
    name: "Waypoints",
    signal: "REAL-TIME SYSTEM / 02",
    summary: "A social location platform engineered for low-latency GPS synchronization and resilient session presence.",
    role: "Full-Stack Engineer",
    stack: ["React Native", "TypeScript", "Node.js", "WebSockets"],
    challenge: "Maintain coherent live state across unstable mobile connections, reconnects, and concurrent location updates.",
    outcome: "A reconnect-safe event model supporting responsive location sharing and dependable presence management.",
    featured: true,
    position: [3.15, 0.7, -0.4],
  },
  {
    id: "options-forecast",
    name: "Options Forecast",
    signal: "QUANTITATIVE MODEL / 03",
    summary: "A machine-learning toolkit for option-price forecasting and historical strategy backtesting.",
    role: "ML / Quantitative Developer",
    stack: ["Python", "Machine Learning", "Time Series", "Backtesting"],
    challenge: "Separate predictive signal from market noise while keeping the evaluation grounded in historical strategy performance.",
    outcome: "An experimentation system combining forecasts with advanced metrics and repeatable backtest analysis.",
    github: "https://github.com/zakariaxk/options-forecast-backtest",
    featured: true,
    position: [0.35, -2.1, -1.8],
  },
  {
    id: "watchlist",
    name: "Watchlist",
    signal: "PRODUCT SYSTEM / 04",
    summary: "A TypeScript application for organizing and tracking films through a focused product interface.",
    role: "Frontend / Product Engineer",
    stack: ["TypeScript", "React", "Product Design"],
    challenge: "Shape a familiar content workflow into a fast, coherent interface with clean state management.",
    outcome: "A product-focused application demonstrating typed frontend architecture and interaction design.",
    github: "https://github.com/zakariaxk/watchlist-app",
    featured: false,
    position: [-4.45, -1.75, -2.9],
  },
  {
    id: "ledgerlite",
    name: "LedgerLite",
    signal: "FINANCIAL TOOL / 05",
    summary: "A lightweight Python system for making everyday financial records easier to understand and maintain.",
    role: "Python Developer",
    stack: ["Python", "Data Modeling", "Automation"],
    challenge: "Keep financial bookkeeping structured and useful without allowing operational complexity to overwhelm the workflow.",
    outcome: "A compact foundation for readable records and repeatable financial operations.",
    github: "https://github.com/zakariaxk/LedgerLite",
    featured: false,
    position: [4.7, -1.4, -3.2],
  },
  {
    id: "colors-lamp",
    name: "Colors LAMP",
    signal: "FULL-STACK ARCHIVE / 06",
    summary: "A LAMP application with authentication and end-to-end CRUD through PHP REST endpoints.",
    role: "Full-Stack Developer",
    stack: ["JavaScript", "PHP", "MySQL", "REST"],
    challenge: "Connect browser interactions, authenticated server behavior, and persistent records through a clear API boundary.",
    outcome: "A complete full-stack reference spanning identity, REST operations, data persistence, and client behavior.",
    github: "https://github.com/zakariaxk/colors-lamp",
    featured: false,
    position: [0.05, 3.2, -3.8],
  },
];

export const experience = [
  {
    period: "CURRENT",
    title: "Independent Systems Builder",
    organization: "Research & Product Practice",
    impact: "Building intelligent, real-time, and data-intensive systems while deepening the engineering discipline behind each layer.",
    tags: ["AI / ML", "Full Stack", "Systems"],
  },
  {
    period: "2025 — 2026",
    title: "Machine Learning Explorer",
    organization: "Applied Research",
    impact: "Developed temporal behavior analysis and quantitative forecasting projects that turn uncertain inputs into testable signals.",
    tags: ["Python", "Modeling", "Research"],
  },
  {
    period: "2024 — 2025",
    title: "Full-Stack Developer",
    organization: "Product Systems",
    impact: "Built authenticated applications, typed interfaces, and real-time data flows across web and mobile environments.",
    tags: ["React", "Node.js", "APIs"],
  },
  {
    period: "ORIGIN",
    title: "Software Engineering Student",
    organization: "Foundational Practice",
    impact: "Learned to treat code as a system of decisions—observable, testable, and improved through deliberate iteration.",
    tags: ["Computer Science", "Problem Solving", "Growth"],
  },
];

export const skillGroups = [
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "React Native", "Three.js"] },
  { name: "Backend", skills: ["Node.js", "Python", "PHP", "REST APIs", "WebSockets"] },
  { name: "AI / ML", skills: ["Computer Vision", "Temporal Models", "Forecasting", "Scikit-learn"] },
  { name: "Data", skills: ["SQL", "MySQL", "Pandas", "Time Series", "Data Modeling"] },
  { name: "Infrastructure", skills: ["Git", "Docker", "CI / CD", "Cloud Deployments"] },
  { name: "Design / Tools", skills: ["Figma", "Prototyping", "Interaction Design", "Technical Writing"] },
];

export const channels = [
  { label: "Email", value: "zakaria@example.com", href: "mailto:zakaria@example.com" },
  { label: "GitHub", value: "@zakariaxk", href: "https://github.com/zakariaxk" },
  { label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/zakaria-khan" },
];
