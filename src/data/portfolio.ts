export type Project = {
  id: string;
  name: string;
  code: string;
  summary: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  details: string[];
  status: string;
};

export const identity = {
  name: "Zakaria Khan",
  role: "Software Engineer and AI Systems Builder",
  statement: "I build intelligent systems that turn complex signals into decisive action.",
  bio: "Computer Science student at the University of Central Florida with a 3.82 GPA and experience building agentic AI, resilient backend services, computer vision pipelines, and real time products. I am drawn to systems where reliability, intelligence, and human judgment have to work together.",
  email: "zakariaak05@gmail.com",
  linkedin: "https://www.linkedin.com/in/zakaria-khan1",
  github: "https://github.com/zakariaxk",
};

export const projects: Project[] = [
  {
    id: "stabilitynet",
    name: "StabilityNet",
    code: "CV 01",
    summary: "A fall risk and mobility analysis system that converts video streams into interpretable movement intelligence.",
    stack: ["YOLO26n", "PyTorch", "OpenCV", "FastAPI", "Next.js", "SORT"],
    metrics: [
      { value: "22", label: "frames per second" },
      { value: "2 to 5s", label: "motion windows" },
      { value: "3", label: "risk features" },
    ],
    details: [
      "Engineered person detection and SORT tracking to preserve identity across frames.",
      "Extracted dwell time, speed, and motion variance to identify instability patterns.",
      "Built async inference and an event review interface for operational analysis.",
    ],
    status: "VISION SYSTEM ONLINE",
  },
  {
    id: "waypoints",
    name: "Waypoints",
    code: "RT 02",
    summary: "A social location platform designed for high frequency GPS updates, reconnect safety, and reliable shared routes.",
    stack: ["React Native", "Node.js", "WebSockets", "Socket.IO", "GPS"],
    metrics: [
      { value: "500+", label: "concurrent sessions" },
      { value: "10+", label: "updates per second" },
      { value: "99.9%", label: "uptime" },
    ],
    details: [
      "Architected stateless backend services for scalable presence and route state.",
      "Implemented event driven synchronization through reconnects and network instability.",
      "Improved route reliability by 40 percent under active mobile usage.",
    ],
    status: "REAL TIME LINK STABLE",
  },
  {
    id: "clt-intelligence",
    name: "CLT Intelligence",
    code: "DS 03",
    summary: "A decision support platform that prioritizes affordable housing opportunities through evidence based scoring and spatial analysis.",
    stack: ["FastAPI", "Pandas", "NumPy", "Leaflet", "Census Data", "Geocoding"],
    metrics: [
      { value: "< 3s", label: "evaluation time" },
      { value: "5+ min", label: "previous workflow" },
      { value: "1", label: "unified scoring pipeline" },
    ],
    details: [
      "Standardized federal census housing data into tract level decision signals.",
      "Designed a multi factor scoring model for property acquisition prioritization.",
      "Added address search and spatial mapping for rapid property review.",
    ],
    status: "DECISION ENGINE READY",
  },
];

export const experience = [
  {
    period: "JUN 2026 to AUG 2026",
    title: "Software Engineer Intern",
    organization: "Bank of New York",
    location: "Lake Mary, Florida",
    impact: "Built a Python multi agent RAG platform with MCP across 68 microservices, cutting incident triage time by 70 percent. Connected ServiceNow, Splunk, GitLab, and Jira data for automated root cause analysis and grounded NAV exception support.",
    tags: ["Python", "MCP", "RAG", "Enterprise APIs"],
  },
  {
    period: "JAN 2026 to APR 2026",
    title: "Software Engineer Intern",
    organization: "Minoria Tech",
    location: "Orlando, Florida",
    impact: "Implemented consistent state transitions for quotes, orders, and invoices, integrated live pricing and inventory APIs, and enforced multi tenant relational integrity with Drizzle ORM and Zod.",
    tags: ["TypeScript", "Drizzle ORM", "Zod", "APIs"],
  },
  {
    period: "AUG 2025 to DEC 2025",
    title: "Software Engineer Intern",
    organization: "Bank of New York",
    location: "Lake Mary, Florida",
    impact: "Built monitoring and remediation services with Python and Spring Boot. Reduced false alerts by 30 percent, routed events through Redis with sub second latency, and automated audited recovery actions with Docker agents and Gemini.",
    tags: ["Spring Boot", "Redis", "Isolation Forest", "Docker"],
  },
  {
    period: "MAY 2024 to MAY 2026",
    title: "Registered Pharmacy Technician",
    organization: "Publix Pharmacy",
    location: "Florida",
    impact: "Worked in a high trust healthcare environment where precision, privacy, clear communication, and reliable execution mattered every day.",
    tags: ["Patient Service", "Accuracy", "Operations"],
  },
  {
    period: "JUN 2023 to MAY 2024",
    title: "Front Service Clerk",
    organization: "Publix",
    location: "Florida",
    impact: "Built an early foundation in customer service, teamwork, and staying composed in a fast moving operational environment.",
    tags: ["Service", "Teamwork", "Operations"],
  },
];

export const skillGroups = [
  { name: "Languages", skills: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"] },
  { name: "Application", skills: ["React", "Next.js", "Node.js", "Express", "Spring Boot", "FastAPI", "Socket.IO"] },
  { name: "Intelligence", skills: ["PyTorch", "TensorFlow", "scikit-learn", "YOLO26", "Gemini API", "Google ADK", "Agentic AI"] },
  { name: "Data and Cloud", skills: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "SQLite", "Redis", "AWS"] },
  { name: "Engineering", skills: ["Docker", "Git", "GitHub", "Jenkins", "CI/CD", "REST APIs", "MCP", "Linux"] },
];
