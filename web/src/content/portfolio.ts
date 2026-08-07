/**
 * App single source of truth for rendered content.
 * Keep in sync with /portfolio-data.md (authoring source).
 */
import type { PortfolioContent } from "@/types/portfolio";

export const portfolio: PortfolioContent = {
  brand: "Harsha.Codes",
  person: {
    fullName: "Harsha Gadekar",
    firstName: "Harsha",
    role: "Backend engineer building AI systems. Independent researcher.",
    location: "Bengaluru, India",
    timezone: "Asia/Kolkata",
    email: "harshaygadekar05@gmail.com",
    phone: "+918660455779",
    summary:
      "I like building software solutions that are simple and reliable. My interests sit at the intersection of backend engineering, AI systems, and open source. Right now I'm exploring distributed systems and ML infrastructure while shipping projects that solve real problems.",
    signature:
      "Building today. Learning every day. Hoping to create and contribute to solutions that outlive me.",
  },
  links: {
    // Google Drive "anyone with the link" view URL (opens in a new tab).
    // Paste your share link here, e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // Until then, the local PDF still opens for viewing (not forced download).
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
        "Built a service that turns raw network counters into clear health trends across 540+ KPI types.",
        "Took trend accuracy to about 95% with validation, quality checks, and safe release gates before anything hit production.",
        "Built a real-time correlation tool that cut root-cause investigation from hours down to minutes.",
        "Delivered a production feature used on live optical-network data, end to end.",
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
    },
    {
      id: "pes-bca",
      school: "PES Institute of Advanced Management Studies",
      degree: "Bachelor of Computer Applications",
      location: "Shimoga",
      start: "Oct 2021",
      end: "Sept 2024",
    },
  ],
  projects: [
    {
      id: "ai-news-aggregator",
      title: "AI News Aggregator",
      summary:
        "A Discord bot that watches 85+ AI sources and posts clean, organized alerts — more release desk than noisy firehose.",
      highlights: [
        "Adaptive polling speeds up on hot sources and backs off when quiet, so coverage stays high without spam.",
        "Cross-checks signals across sources and scores reliability so weak rumors don't drown out real releases.",
        "Ships production-ready with Docker, health checks, and about 97% uptime on AWS.",
      ],
      technologies: ["Node.js", "SQLite", "Discord.js", "Docker", "AWS", "Groq"],
      heroMetric: "85+ sources · 97% uptime",
      github: "https://github.com/harshaygadekar/AI-news-aggregator",
    },
    {
      id: "raguard",
      title: "RAGuard Security",
      summary:
        "A security layer for RAG apps that catches when an AI tries to leak private retrieved context.",
      highlights: [
        "Uses session-specific canary tokens — 100% detection when leaked context shows up in the answer.",
        "Drops into LangChain, LlamaIndex, or FastAPI with under 5ms of extra latency per request.",
        "Open source on PyPI (MIT) so teams can add protection without rewriting their stack.",
      ],
      technologies: ["Python", "FastAPI", "LangChain", "LlamaIndex", "Redis"],
      heroMetric: "<5ms overhead · 100% token detection",
      github: "https://github.com/harshaygadekar/raguard-security",
    },
    {
      id: "verifyai",
      title: "VerifyAI",
      summary:
        "An AI search app that gathers web evidence first, then answers with inline citations you can check.",
      highlights: [
        "Fetch-first design keeps answers grounded in real sources, not model memory alone.",
        "Supports quick search and deeper multi-query research with a clean, minimal UI.",
        "Streams fast answers with Groq and keeps a full reference trail for every claim.",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Groq",
        "Firecrawl",
        "Supabase",
      ],
      github: "https://github.com/harshaygadekar/VerifyAI",
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
      note:
        "Role-aware compression for multi-agent QA (Retriever → Reasoner → Verifier): each handoff keeps only what the next agent needs. ~50% fewer inter-agent tokens and ~37% better precision across seven datasets.",
      github: "https://github.com/harshaygadekar/role-based-context-compression",
    },
  ],
  tech: [
    // icon = simple-icons slug (java is openjdk — "java" 404s on the CDN)
    // Grouped by capability so the list tells a story, not a taxonomy.
    { name: "Java", category: "backend", icon: "openjdk" },
    { name: "Spring Boot", category: "backend", icon: "springboot" },
    { name: "Python", category: "backend", icon: "python" },
    { name: "FastAPI", category: "backend", icon: "fastapi" },
    { name: "Node.js", category: "backend", icon: "nodedotjs" },
    { name: "Flask", category: "backend", icon: "flask" },
    { name: "LangChain", category: "ai", icon: "langchain" },
    { name: "PyTorch", category: "ai", icon: "pytorch" },
    { name: "Scikit-learn", category: "ai", icon: "scikitlearn" },
    { name: "HuggingFace", category: "ai", icon: "huggingface" },
    { name: "Pandas", category: "ai", icon: "pandas" },
    { name: "NumPy", category: "ai", icon: "numpy" },
    { name: "Streamlit", category: "ai", icon: "streamlit" },
    { name: "R", category: "ai", icon: "r" },
    { name: "TypeScript", category: "frontend", icon: "typescript" },
    { name: "Next.js", category: "frontend", icon: "nextdotjs" },
    { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
    { name: "HTML / CSS", category: "frontend", icon: "html5" },
    { name: "Docker", category: "infrastructure", icon: "docker" },
    { name: "AWS", category: "infrastructure", icon: "amazonwebservices" },
    { name: "Linux", category: "infrastructure", icon: "linux" },
    { name: "Jenkins", category: "infrastructure", icon: "jenkins" },
    { name: "Git", category: "infrastructure", icon: "git" },
    { name: "SQL / Postgres", category: "databases", icon: "postgresql" },
    { name: "Apache Pinot", category: "databases", icon: "apache" },
    { name: "Prisma", category: "databases", icon: "prisma" },
  ],
  githubUsername: "harshaygadekar",
  visitorSeed: 1000,
  seo: {
    title: "Harsha Gadekar — Backend Engineer building AI systems",
    description:
      "Portfolio of Harsha Gadekar — backend engineer building AI systems. Independent researcher. Nokia SDE intern · Bengaluru.",
    keywords: [
      "Harsha Gadekar",
      "Harsha Y",
      "Backend Engineer",
      "AI systems",
      "Independent researcher",
      "Bengaluru",
      "Nokia",
      "FastAPI",
      "Next.js",
    ],
  },
};

export const enabledSocial = portfolio.social.filter((s) => s.enabled);

export const techByCategory = {
  backend: portfolio.tech.filter((t) => t.category === "backend"),
  ai: portfolio.tech.filter((t) => t.category === "ai"),
  frontend: portfolio.tech.filter((t) => t.category === "frontend"),
  infrastructure: portfolio.tech.filter((t) => t.category === "infrastructure"),
  databases: portfolio.tech.filter((t) => t.category === "databases"),
} as const;
