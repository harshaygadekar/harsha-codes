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
    role: "Backend engineer. I build AI systems.",
    location: "Bengaluru, India",
    timezone: "Asia/Kolkata",
    email: "harshaygadekar05@gmail.com",
    phone: "+918660455779",
    summary:
      "I'm a software engineer interested in backend systems and AI.",
    intro: [
      "I'm a software engineer interested in backend systems and AI. Recently finished my term at Nokia. These days, I'm building projects, exploring open source, and learning more about systems and AI.",
      "Based in Bengaluru. Open to work and collabs.",
    ],
    now: "open to work · Bengaluru",
    about:
      "I'm a software engineer interested in backend systems and AI.",
    signature: "Building today. Learning as I go.",
  },
  links: {
    // Google Drive "anyone with the link" view URL (opens in a new tab).
    // Paste your share link here, e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // Until then, the local PDF still opens for viewing (not forced download).
    resume: "/resume.pdf",
    github: "https://github.com/harshaygadekar",
    linkedin: "https://linkedin.com/in/harsha-y-b61b56229",
    x: "https://x.com/HarshaGadekar",
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
      label: "X",
      href: "https://x.com/HarshaGadekar",
      enabled: true,
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
      href: "https://www.nokia.com",
      highlights: [
        "Built systems and statistical models that turn large volumes of network data into clear health and trend signals, making it easier for thousands of end users/customers to identify problems without manually digging through metrics. Also contributed to internal tools for network monitoring and diagnostics.",
      ],
      technologies: ["Java", "Spring Boot", "Python", "FastAPI", "Apache Pinot"],
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
      id: "raguard",
      title: "RAGuard Security",
      summary:
        "Stops RAG apps from leaking private context. Drop it into LangChain or FastAPI. It's on PyPI.",
      highlights: [
        "Catches leaked context with session canary tokens.",
        "Drop-in for LangChain, LlamaIndex, or FastAPI.",
      ],
      technologies: ["Python", "FastAPI", "LangChain", "LlamaIndex", "Redis"],
      year: "2026",
      group: "shipped",
      github: "https://github.com/harshaygadekar/raguard-security",
    },
    {
      id: "ai-news-aggregator",
      title: "AI News Aggregator",
      summary:
        "A Discord bot that watches AI sources and pings you when something real drops, not every rumor.",
      highlights: [
        "Speeds up when a source is hot, backs off when it's quiet.",
        "Tries not to spam you with the same news twice.",
      ],
      technologies: ["Node.js", "SQLite", "Discord.js", "Docker", "AWS", "Groq"],
      year: "2026",
      group: "shipped",
      github: "https://github.com/harshaygadekar/AI-news-aggregator",
    },
    {
      id: "verifyai",
      title: "VerifyAI",
      summary:
        "Looks the web up first, then answers with citations you can actually click.",
      highlights: [
        "Fetches sources before it talks.",
        "Keeps a trail of links for every claim.",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Groq",
        "Firecrawl",
        "Supabase",
      ],
      year: "2026",
      group: "shipped",
      github: "https://github.com/harshaygadekar/VerifyAI",
    },
    {
      id: "prep-ai",
      title: "Prep AI",
      summary:
        "Mock interviews over voice, questions off your resume, scores you pretty much instantly.",
      highlights: [
        "Live voice interviews and a simple score dashboard.",
      ],
      technologies: ["Next.js", "TypeScript", "Supabase", "Prisma", "Groq"],
      year: "2025",
      group: "lab",
      github: "https://github.com/harshaygadekar/prep.ai",
    },
    {
      id: "chat-docs",
      title: "Chat with your documents",
      summary: "Upload a PDF, ask it questions. That's pretty much the whole thing.",
      technologies: ["Python", "LLaMA-3", "Streamlit", "FastEmbed"],
      year: "2024",
      group: "lab",
      github:
        "https://github.com/harshaygadekar/chat-with-your-documents-2",
    },
  ],
  publications: [
    {
      id: "icauc-2026",
      title: "Role-Aware Context Compression in Agentic AI Pipelines",
      venue: "IEEE ICAUC 2026",
      date: "Jan 2026",
      role: "Co-Author",
      note: "Agents pass a lot of junk to each other. We made them pass less, and the answers got better.",
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
    title: "Harsha Gadekar",
    description:
      "Harsha Gadekar — backend engineer in Bengaluru. Builds AI systems.",
    keywords: [
      "Harsha Gadekar",
      "Harsha Y",
      "Backend Engineer",
      "AI systems",
      "Bengaluru",
      "Nokia",
      "FastAPI",
      "Next.js",
    ],
  },
};

export const enabledSocial = portfolio.social.filter((s) => s.enabled);

export const shippedProjects = portfolio.projects.filter(
  (p) => (p.group ?? "shipped") === "shipped",
);

export const labProjects = portfolio.projects.filter((p) => p.group === "lab");

export const techByCategory = {
  backend: portfolio.tech.filter((t) => t.category === "backend"),
  ai: portfolio.tech.filter((t) => t.category === "ai"),
  frontend: portfolio.tech.filter((t) => t.category === "frontend"),
  infrastructure: portfolio.tech.filter((t) => t.category === "infrastructure"),
  databases: portfolio.tech.filter((t) => t.category === "databases"),
} as const;
