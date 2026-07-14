/**
 * App single source of truth for rendered content.
 * Keep in sync with /portfolio-data.md (authoring source).
 */
import type { PortfolioContent } from "@/types/portfolio";

export const portfolio: PortfolioContent = {
  brand: "Harsha.Codes",
  person: {
    fullName: "Harsha Y",
    firstName: "Harsha",
    role: "Software Engineer · AI & Backend",
    location: "Bengaluru, India",
    timezone: "Asia/Kolkata",
    email: "harshaygadekar05@gmail.com",
    phone: "+918660455779",
    summary:
      "Software engineer focused on AI systems, backend services, and production automation. Recently completed a 10-month SDE internship at Nokia on production KPI analytics and backend infrastructure. Looking for roles where I can keep building systems that solve real operational problems.",
    signature: "Early-career software engineer with real production AI/backend experience.",
  },
  links: {
    resume: "/resume.pdf",
    github: "https://github.com/harshaygadekar",
    linkedin: "https://linkedin.com/in/harsha-y-b61b56229",
  },
  social: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/harshaygadekar",
      enabled: true,
      metric: "Repos",
      metricLabel: "public work",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/harsha-y-b61b56229",
      enabled: true,
      metric: "Open",
      metricLabel: "to work",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:harshaygadekar05@gmail.com",
      enabled: true,
      metric: "Direct",
      metricLabel: "inbox",
    },
    {
      id: "twitter",
      label: "X / Twitter",
      href: "#",
      enabled: false,
    },
    {
      id: "threads",
      label: "Threads",
      href: "#",
      enabled: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "#",
      enabled: false,
    },
  ],
  experience: [
    {
      id: "nokia",
      company: "Nokia",
      role: "Software Development Engineer Intern",
      location: "Bengaluru",
      start: "Aug 2025",
      end: "May 2026",
      highlights: [
        "Built a stateless KPI trend analysis service (linear regression, EMA, WMA) turning raw counters into explainable health signals across 540+ KPI types.",
        "Hardened a 7-stage pipeline with validation, quality checks, model fit, and semantic enrichment — about 95% trend accuracy, backed by contract tests and deployment gates.",
        "Prototyped a real-time correlation engine with configurable lag controls, cutting root-cause investigation from hours to minutes per optical-network incident.",
        "Shipped a customer-facing KPI trend feature across a 3-tier stack: Java/Spring Boot, Python/FastAPI, Apache Pinot, and React/TypeScript.",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Python",
        "FastAPI",
        "Apache Pinot",
        "React",
        "TypeScript",
      ],
    },
  ],
  education: [
    {
      id: "nhce-mca",
      school: "New Horizon College of Engineering",
      degree: "Master of Computer Applications",
      location: "Bengaluru",
      start: "Dec 2024",
      end: "July 2026",
      cgpa: "8.63",
    },
    {
      id: "pes-bca",
      school: "PES Institute of Advanced Management Studies",
      degree: "Bachelor of Computer Applications",
      location: "Shimoga",
      start: "Oct 2021",
      end: "Sept 2024",
      cgpa: "9.2",
    },
  ],
  projects: [
    {
      id: "ai-news-aggregator",
      title: "AI News Aggregator",
      summary:
        "Web crawler + Discord bot that monitors 85+ AI sources and routes organized alerts into Discord with adaptive scheduling and reliability scoring.",
      highlights: [
        "97% uptime and ~95% data consistency across multi-source polling",
        "Hybrid classification with Groq, event corroboration, and digests",
        "Operational /live, /ready, /health endpoints with SQLite observability",
      ],
      technologies: ["Node.js", "SQLite", "Docker", "AWS", "Discord API", "Groq"],
      heroMetric: "85+ sources · 97% uptime",
      github: "https://github.com/harshaygadekar/AI-news-aggregator",
    },
    {
      id: "raguard",
      title: "RAGuard Security",
      summary:
        "Deterministic security middleware for RAG pipelines. Detects context exfiltration via session-specific canary tokens — MIT-licensed on PyPI.",
      highlights: [
        "100% detection of token-level context exfiltration in output",
        "<5ms latency overhead, <1KB memory per session",
        "Adapters for LangChain, LlamaIndex, and FastAPI",
      ],
      technologies: ["Python", "FastAPI", "LangChain", "LlamaIndex", "Redis"],
      heroMetric: "<5ms overhead · 100% token detection",
      github: "https://github.com/harshaygadekar/raguard-security",
    },
    {
      id: "role-aware-compression",
      title: "Role-Aware Context Compression",
      summary:
        "Multi-agent QA pipeline (Retriever → Reasoner → Verifier) that compresses handoffs by what the next agent needs — IEEE ICAUC 2026 paper.",
      highlights: [
        "~50% inter-agent token reduction and 37% precision improvement",
        "5 compression strategies across 7 QA datasets",
        "3× throughput via multi-GPU evaluation distribution",
      ],
      technologies: ["Python", "PyTorch", "HuggingFace", "CUDA"],
      heroMetric: "50% fewer tokens · 37% better precision",
      github: "https://github.com/harshaygadekar/role-based-context-compression",
      publication: "IEEE ICAUC 2026",
    },
    {
      id: "prep-ai",
      title: "Prep AI",
      summary:
        "Full-stack AI interview prep platform with real-time voice interviews, multi-dimensional scoring, and multi-tenant org isolation.",
      highlights: [
        "Voice interviews via Retell AI with persona interviewers",
        "Sub-second scoring on Groq (Mixtral / Llama 3 70B)",
        "Clerk multi-tenant auth with org-level access control",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Clerk",
        "Groq",
        "Retell",
      ],
      heroMetric: "Sub-second AI scoring · real-time voice",
      github: "https://github.com/harshaygadekar/prep.ai",
    },
    {
      id: "verifyai",
      title: "VerifyAI",
      summary:
        "AI metasearch that fetches multi-source evidence first, then answers with inline citations — fetch first, answer second.",
      highlights: [
        "Firecrawl multi-source evidence (web, news, images)",
        "Source-grounded summaries with reference trail",
        "Latency-optimized via Groq-hosted LLMs",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind", "Firecrawl", "Groq"],
      github: "https://github.com/harshaygadekar/VerifyAI",
    },
    {
      id: "chat-docs",
      title: "Chat With Your Documents",
      summary:
        "Personal document summarizer and chat interface over uploaded PDFs using Meta LLaMA-3 and FastEmbed.",
      highlights: [
        "PDF upload → concise summary → follow-up chat",
        "LLaMA-3 inference with FastEmbed embeddings",
        "Streamlit UI for fast iteration",
      ],
      technologies: ["Python", "LLaMA-3", "Streamlit", "FastEmbed"],
      github: "https://github.com/harshaygadekar/chat-with-your-documents-2",
    },
  ],
  publications: [
    {
      id: "icauc-2026",
      title:
        "Role-Aware Context Compression in Agentic AI Pipelines for Question Answering",
      venue: "IEEE ICAUC 2026",
      date: "Jan 2026",
      role: "Co-Author",
      github: "https://github.com/harshaygadekar/role-based-context-compression",
    },
    {
      id: "neuron-ai-2023",
      title: "Neuron-AI",
      venue: "Tech Horizon 2023, Srinivasa University, Mangalore",
      date: "Dec 2023",
      role: "Co-Author",
      note: "Presented to faculty and industry panel; recognized among 120+ submissions.",
    },
  ],
  tech: [
    { name: "Java", category: "languages", icon: "java" },
    { name: "Python", category: "languages", icon: "python" },
    { name: "TypeScript", category: "languages", icon: "typescript" },
    { name: "SQL / Postgres", category: "languages", icon: "postgresql" },
    { name: "HTML / CSS", category: "languages", icon: "html5" },
    { name: "R", category: "languages", icon: "r" },
    { name: "Next.js", category: "frameworks", icon: "nextdotjs" },
    { name: "Node.js", category: "frameworks", icon: "nodedotjs" },
    { name: "FastAPI", category: "frameworks", icon: "fastapi" },
    { name: "Flask", category: "frameworks", icon: "flask" },
    { name: "Streamlit", category: "frameworks", icon: "streamlit" },
    { name: "Spring Boot", category: "frameworks", icon: "springboot" },
    { name: "Git", category: "tools", icon: "git" },
    { name: "Docker", category: "tools", icon: "docker" },
    { name: "Jenkins", category: "tools", icon: "jenkins" },
    { name: "AWS", category: "tools", icon: "amazonwebservices" },
    { name: "Apache Pinot", category: "tools", icon: "apache" },
    { name: "Linux", category: "tools", icon: "linux" },
    { name: "Pandas", category: "libraries", icon: "pandas" },
    { name: "NumPy", category: "libraries", icon: "numpy" },
    { name: "Scikit-learn", category: "libraries", icon: "scikitlearn" },
    { name: "PyTorch", category: "libraries", icon: "pytorch" },
    { name: "HuggingFace", category: "libraries", icon: "huggingface" },
    { name: "LangChain", category: "libraries", icon: "langchain" },
    { name: "Prisma", category: "libraries", icon: "prisma" },
    { name: "Tailwind CSS", category: "libraries", icon: "tailwindcss" },
  ],
  githubUsername: "harshaygadekar",
  visitorSeed: 1000,
  seo: {
    title: "Harsha Y — Software Engineer · AI & Backend",
    description:
      "Portfolio of Harsha Y — software engineer focused on AI systems, backend services, and production automation. Nokia SDE intern · Bengaluru.",
    keywords: [
      "Harsha Y",
      "Software Engineer",
      "Backend Engineer",
      "AI Engineer",
      "Bengaluru",
      "Nokia",
      "FastAPI",
      "Next.js",
    ],
  },
};

export const enabledSocial = portfolio.social.filter((s) => s.enabled);

export const techByCategory = {
  languages: portfolio.tech.filter((t) => t.category === "languages"),
  frameworks: portfolio.tech.filter((t) => t.category === "frameworks"),
  tools: portfolio.tech.filter((t) => t.category === "tools"),
  libraries: portfolio.tech.filter((t) => t.category === "libraries"),
} as const;
