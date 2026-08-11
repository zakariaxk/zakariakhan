export type Project = {
  id: string;
  name: string;
  code: string;
  summary: string;
  stack: string[];
  architecture: string[];
  architectureTrace?: {
    boundary: { label: string; action: string }[];
    stages: {
      code: string;
      title: string;
      system: string;
      description: string;
      labels?: string[];
    }[];
  };
  metrics: { value: string; label: string }[];
  details: string[];
  status: string;
};

type Experience = {
  period: string;
  title: string;
  organization: string;
  location: string;
  impact: string | string[];
  tags: string[];
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
    id: "clt-intelligence",
    name: "JPMorganChase Data for Good — CLT Investment Intelligence Platform",
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
      "Engineered a tract scoring pipeline using acquisition cost, displacement risk, and site readiness to rank acquisition targets.",
      "Added address search and spatial mapping for rapid property review.",
    ],
    status: "DECISION ENGINE READY",
  },
  {
    id: "riskweave",
    name: "RiskWeave",
    code: "FI 01",
    summary: "A financial contagion and scenario analysis platform that turns public filings into an auditable knowledge graph of multi-hop exposure.",
    stack: ["FastAPI", "Neo4j", "Gemini", "Next.js", "Cytoscape.js", "PostgreSQL", "Redis", "Docker", "React", "TypeScript", "Python", "Deterministic scoring", "Knowledge graphs", "Financial data", "GitHub"],
    architecture: ["Public financial data", "Evidence extraction", "Knowledge graph", "Deterministic weight derivation", "Scenario propagation", "Interactive contagion UI"],
    architectureTrace: {
      boundary: [
        { label: "LLM", action: "EXTRACTS / INTERPRETS" },
        { label: "DETERMINISTIC CODE", action: "CALCULATES / PROPAGATES" },
      ],
      stages: [
        {
          code: "01 / INGESTION",
          title: "Public Financial Data",
          system: "Ingestion",
          description: "SEC filings, XBRL company facts, macroeconomic data, and curated company relationships enter the ingestion pipeline.",
        },
        {
          code: "02 / EVIDENCE EXTRACTION",
          title: "Gemini",
          system: "LLM extraction",
          description: "Gemini extracts structured relationships and source evidence from unstructured financial documents. It does not generate propagation values.",
        },
        {
          code: "03 / WEIGHT DERIVATION",
          title: "Deterministic Financial Logic",
          system: "Deterministic code",
          description: "Relationship weights are calculated from commodity, concentration, credit, duration, geography, and beta signals.",
          labels: ["COMMODITY", "CONCENTRATION", "CREDIT", "DURATION", "GEOGRAPHY", "BETA"],
        },
        {
          code: "04 / GRAPH ASSEMBLY",
          title: "Neo4j",
          system: "Graph store",
          description: "Companies, exposures, financial relationships, source evidence, and derived edge weights are assembled into the knowledge graph.",
        },
        {
          code: "05 / CONTAGION ENGINE",
          title: "Multi-Hop Propagation",
          system: "Scenario engine",
          description: "Scenario shocks propagate through connected entities using deterministic edge weights to expose indirect and multi-hop risk.",
        },
        {
          code: "06 / AUDIT LAYER",
          title: "Source + Derivation Trace",
          system: "Traceability",
          description: "Every material relationship can be traced back to its supporting evidence and the method used to derive its weight.",
        },
        {
          code: "07 / DELIVERY",
          title: "FastAPI + Next.js + Cytoscape.js",
          system: "Delivery",
          description: "FastAPI serves scenario results to the Next.js interface, where Cytoscape.js renders contagion paths and live severity changes.",
        },
      ],
    },
    metrics: [
      { value: "125", label: "companies modeled" },
      { value: "6", label: "contagion signals" },
      { value: "MULTI-HOP", label: "auditable exposure analysis" },
    ],
    details: [
      "Replaced multi-hour manual filing review by structuring public financial data into a knowledge graph for automated contagion analysis.",
      "Derived contagion weights deterministically from commodity, concentration, credit, duration, geography, and beta signals, keeping LLM-generated values out of propagation logic.",
      "Made each graph relationship traceable to source evidence and derivation, enabling auditable multi-hop exposure analysis.",
      "Modeled 125 companies across CRE and oil-shock scenarios, rendering interactive contagion paths and live severity changes in Cytoscape.js.",
    ],
    status: "CONTAGION MAP ONLINE",
  },
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

export const experience: Experience[] = [
  {
    period: "JUN 2026 to AUG 2026",
    title: "Software Engineer Intern",
    organization: "Bank of New York",
    location: "Lake Mary, Florida",
    impact: [
      "Reduced production ServiceNow incident triage time by 90% with a Python multi-agent root cause analysis tool correlating Splunk logs, GitLab source code, and Jira release history across 68 microservices.",
      "Streamlined fund accountant exception review by ingesting 5 prior/current-day reports into deterministic NAV/yield calculations, with an LLM explaining security-level tolerance breaks.",
      "Automated remediation of 40+ Veracode vulnerabilities by integrating Claude-driven workflows into isolated Ona environments, eliminating local remediation setup for 10+ developers.",
      "Migrated 14 external Feign clients to Spring RestClient, retiring the Spring Cloud OpenFeign dependency from the service.",
    ],
    tags: ["Python", "Java", "Spring Boot", "Spring RestClient", "ServiceNow", "Splunk", "GitLab", "Jira", "Claude Code", "Ona / Gitpod", "Veracode", "JUnit", "Maven", "SonarQube", "Togglz", "Angular", "Hazelcast", "Camunda BPM", "Apache Kafka", "Cucumber", "Swagger / OpenAPI", "Spring Cloud"],
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
  { name: "Languages", skills: ["Java", "Python", "SQL", "C++", "C", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { name: "Application", skills: ["Spring Boot", "FastAPI", "React", "Next.js", "Node.js", "Express", "Socket.IO"] },
  { name: "AI & Agentic Systems", skills: ["Claude Code", "OpenAI Codex", "Gemini API", "RAG", "MCP", "Structured Skills", "Agentic Workflows", "scikit-learn"] },
  { name: "Data & Cloud", skills: ["PostgreSQL", "Supabase", "Redis", "Neo4j", "MongoDB", "MySQL", "SQLite", "AWS"] },
  { name: "Engineering", skills: ["Git", "GitHub", "Docker", "CI/CD", "Linear", "JUnit", "PyTest", "Veracode", "SonarQube", "OpenSpec", "Postman", "Linux"] },
];
