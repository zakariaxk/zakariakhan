export type Project = {
  id: string;
  name: string;
  code: string;
  summary: string;
  stack: string[];
  architecture: string[];
  metrics: { value: string; label: string }[];
  details: string[];
  status: string;
};

export const identity = {
  name: "Zakaria Khan",
  role: "Software Engineer",
  statement: "I build intelligent systems engineered for measurable, real-world impact.",
  bio: "Computer Science student at the University of Central Florida with a 3.82 GPA and experience building agentic AI, resilient backend services, computer vision pipelines, and real-time products. I care about intelligence that survives contact with the real world: systems that are reliable, legible, and genuinely useful to the people making consequential decisions.",
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
    stack: ["Python", "YOLO26n", "PyTorch", "OpenCV", "SORT", "NumPy", "Pandas", "FastAPI", "Pydantic", "Uvicorn", "Next.js", "React", "TypeScript", "REST APIs", "Async inference", "Docker"],
    architecture: ["Video ingestion", "Person detection", "Multi-object tracking", "Temporal feature extraction", "Risk scoring", "Event review UI"],
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
    stack: ["React Native", "React", "TypeScript", "Node.js", "Express", "Socket.IO", "WebSockets", "REST APIs", "GPS / Geolocation", "Event-driven architecture", "Stateless services", "Mobile session recovery", "Docker"],
    architecture: ["Mobile GPS client", "Presence gateway", "Realtime event bus", "Route-state service", "Reconnect reconciliation", "Shared map UI"],
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
    stack: ["Python", "FastAPI", "Pydantic", "Pandas", "NumPy", "GeoJSON", "Leaflet", "React", "TypeScript", "REST APIs", "U.S. Census ACS", "Geocoding", "Spatial scoring", "Data normalization"],
    architecture: ["Public-data ingestion", "Schema normalization", "Multi-factor scoring", "Geocoding", "Spatial API", "Interactive acquisition map"],
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
  {
    id: "options-forecast",
    name: "Options Forecast",
    code: "QT 04",
    summary: "A quantitative research system that forecasts option prices and tests whether model signal survives realistic historical strategy evaluation.",
    stack: ["Python", "scikit-learn", "Pandas", "NumPy", "SciPy", "yfinance", "Time-series features", "Supervised learning", "Options analytics", "Historical backtesting", "Risk metrics", "Matplotlib", "Jupyter", "Git"],
    architecture: ["Market-data ingestion", "Feature engineering", "Forecast model", "Signal generation", "Strategy simulator", "Performance and risk analytics"],
    metrics: [
      { value: "2", label: "research layers" },
      { value: "E2E", label: "forecast to backtest" },
      { value: "∞", label: "strategy experiments" },
    ],
    details: [
      "Built a repeatable pipeline from historical market data through feature generation and model evaluation.",
      "Connected predictions to a backtesting layer so accuracy is judged against strategy behavior, not a model score alone.",
      "Instrumented performance with return, drawdown, volatility, and risk-adjusted analysis for honest comparison.",
    ],
    status: "MARKET SIGNAL ACQUIRED",
  },
  {
    id: "clearview",
    name: "ClearView",
    code: "AI 05",
    summary: "An AI-assisted software inventory intelligence platform that turns inconsistent asset exports into lifecycle, compliance, and risk visibility.",
    stack: ["Next.js", "React", "TypeScript", "JavaScript", "Node.js", "Gemini API", "Axios", "Tailwind CSS", "Vite", "CSV parsing", "Rule-based inference", "Interactive dashboards", "Local-first processing", "Postman", "Git"],
    architecture: ["CSV / text ingestion", "AI normalization", "EOS rules engine", "Lifecycle risk classification", "KPI dashboard", "Audit-ready export"],
    metrics: [
      { value: "AI", label: "inventory normalization" },
      { value: "6", label: "pipeline stages" },
      { value: "LOCAL", label: "processing model" },
    ],
    details: [
      "Used Gemini-assisted normalization to reconcile inconsistent vendor, product, and version naming.",
      "Combined rule-based end-of-support prediction with lifecycle risk classification for explainable results.",
      "Designed an interactive dashboard and cleaned export workflow for IT audits and compliance review.",
    ],
    status: "LIFECYCLE MAP RESOLVED",
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
