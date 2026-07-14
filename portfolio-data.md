# Harsha Y — Portfolio Source Document

> Compiled from career-ops user-layer files. Generated for personal portfolio website use.

---

## Contact & Biodata

- **Full name:** Harsha Y
- **Email:** harshaygadekar05@gmail.com
- **Phone:** +918660455779
- **Location:** Bengaluru, India
- **Timezone:** Asia/Kolkata
- **LinkedIn:** [linkedin.com/in/harsha-y-b61b56229](https://linkedin.com/in/harsha-y-b61b56229)
- **GitHub:** [github.com/harshaygadekar](https://github.com/harshaygadekar)
- **Portfolio/Website:** (not set in profile)
- **Twitter/X:** (not set in profile)
- **Visa/work authorization:** Authorized to work in India; no current work visa for roles abroad

---

## Professional Summary

Software engineer focused on AI systems, backend services, and production automation. Recently completed a 10-month Software Development Engineer internship at Nokia, where I worked on production KPI analytics and backend infrastructure. I am now looking for software engineering roles where I can keep building systems that solve real operational problems.

**Signature framing:** Early-career software engineer with real production AI/backend experience.

---

## Target Roles & Archetypes

**Primary targets:** Backend Engineer, Software Development Engineer, Software Engineer, AI Engineer  
**Secondary targets:** MLOps Engineer, Full Stack Engineer

| Archetype | What I emphasize | Proof point sources |
|-----------|----------------|---------------------|
| Backend Engineer / SDE | APIs, services, Java/Spring Boot, Python/FastAPI, databases | Nokia production backend work, KPI analytics services |
| Software Engineer | Problem solving, clean implementation, production ownership | Nokia internship + project portfolio |
| AI Engineer | LLM pipelines, AI/ML systems, evaluation, applied AI | Role-aware context compression, AI news bot, RAGuard |
| MLOps / Platform | Experiment pipelines, model reliability, deployment, monitoring | Multi-GPU experiments, caching, profiling, deployment gates |
| Full Stack Engineer | Next.js, TypeScript, backend APIs, product delivery | Prep AI, VerifyAI |

**Compensation target:** 6–10 LPA INR  
**Location flexibility:** Open to onsite, hybrid, and remote roles  
**Preferred location:** Bengaluru or remote India  
**Notice period:** 30 days

---

## What Excites Me

- Solving problems with AI/ML
- System design
- Core infrastructure
- Integration and deployment technology stacks

## What Drains Me

- Slow-moving teams
- Poor management
- Little room for work-life balance

## Deal Breakers

- Bad work culture
- Poor employee reviews

**Best professional achievement so far:** Completed a 10-month Nokia internship and consistently built useful projects that solve real problems.

---

## Work Experience

### Nokia — Software Development Engineer Intern

**Location:** Bengaluru  
**Dates:** Aug. 2025 – May 2026

- Engineered a stateless KPI trend analysis service with models such as linear regression, EMA, and WMA, replacing raw counters with explainable health signals across 540+ KPI types.
- Improved trend accuracy to about 95% by hardening a 7-stage pipeline with data validation, DB resolution, quality checks, preprocessing, model fit, and semantic enrichment, backed by contract tests and deployment gates.
- Analyzed and prototyped a real-time correlation analysis engine with configurable lag controls and preprocessing hooks, cutting root-cause investigation from hours to minutes per incident across optical network KPIs.
- Shipped a KPI trend analysis feature to customers and operators by contributing to backend infrastructure across a 3-tier production stack: Java/Spring Boot, Python/FastAPI, Apache Pinot, and React/TypeScript.

---

## Education

### New Horizon College of Engineering

**Degree:** Master of Computer Applications  
**CGPA:** 8.63  
**Location:** Bengaluru  
**Dates:** Dec. 2024 – July 2026

### PES Institute of Advanced Management Studies

**Degree:** Bachelor of Computer Applications  
**CGPA:** 9.2  
**Location:** Shimoga  
**Dates:** Oct. 2021 – Sept. 2024

---

## Technical Skills

- **Languages:** Java, Python, TypeScript, SQL/Postgres, HTML/CSS, R
- **Frameworks:** Next.js, Node.js, Flask, Streamlit, FastAPI
- **Tools and Technologies:** Git, Docker, Jenkins, AWS, Apache Pinot, Linux, Cursor/Copilot, IntelliJ
- **Libraries:** Pandas, NumPy, Matplotlib, HuggingFace Transformers, Scikit-learn, LangChain, Prisma ORM, Tailwind CSS

---

## Research Publications

### Co-Author | IEEE, ICAUC 2026

**Title:** Role-Aware Context Compression in Agentic AI Pipelines for Question Answering  
**Date:** Jan. 2026

### Co-Author | Tech Horizon 2023, Srinivasa University, Mangalore

**Title:** Neuron-AI  
**Date:** Dec. 2023  
**Note:** Presented to faculty and industry panel; recognized among 120+ submissions.

---

## Featured Projects

### AI-news-aggregator

- **Repo:** [github.com/harshaygadekar/AI-news-aggregator](https://github.com/harshaygadekar/AI-news-aggregator)
- **Stack:** JavaScript, Node.js, SQLite, Docker, AWS, Discord API, Groq API
- **Hero metric:** 85+ sources monitored with 97% uptime and about 95% data consistency
- **GitHub stars:** 0

A web crawler + Discord bot that monitors AI labs, model registries, code hosts, social feeds, research sources, and rumor surfaces for new model activity, then routes organized alerts into Discord channels.

Built as a Node.js CommonJS app with adaptive multi-source polling, SQLite-backed state and observability, hybrid classification with Groq, event corroboration and source reliability scoring, digest generation for breaking signals/papers/weekly summaries, optional GitHub webhook ingestion, and health/readiness endpoints.

**Key design ideas:** adaptive scheduling (sources speed up when hot and back off when quiet/unhealthy), URL/title similarity dedup, freshness gates, relevance filtering, organized Discord delivery, and operational `/live`, `/ready`, `/health` endpoints.

**Highlights from the implementation:**

- Pipeline: `src/index.js` builds adapters → `src/services/scheduler.js` runs them with adaptive timing → adapters emit normalized items → `src/services/filter.js` classifies and links observations/events → `src/services/notifier.js` enqueues delivery and posts to Discord → `src/db/database.js` persists items, queue state, papers, events, health metrics, reliability scores, and webhook receipts.
- Auto-creates an `🤖 AI Tracker` Discord category with dedicated channels for major releases, model updates, tech news, community buzz, leaderboard updates, research papers, weekly digest, major events, rumors/leaks, China AI, talent moves, and bot status.

### RAGuard Security

- **Repo:** [github.com/harshaygadekar/raguard-security](https://github.com/harshaygadekar/raguard-security)
- **PyPI package:** `raguard-security` (MIT licensed)
- **Stack:** Python, FastAPI, LangChain, LlamaIndex, Redis, pytest, CI/CD
- **Hero metric:** <5ms latency overhead, <1KB memory per session, 100% detection of token-level context exfiltration
- **GitHub stars:** 0

Deterministic security middleware for RAG pipelines. Detects context exfiltration via indirect prompt injection using session-specific canary tokens. Works as a deterministic tripwire: inject a unique token into retrieved context, then scan the LLM output for that token. Drop-in integrations for LangChain, LlamaIndex, and FastAPI.

**Key features:**

- 100% detection of token-level exfiltration when the token appears in LLM output
- Zero-width stealth mode using invisible Unicode sequences (`U+200B`, `U+200C`, etc.) to hide canary tokens from attackers
- Framework-agnostic core; first-class adapters for LangChain, LlamaIndex, and FastAPI
- <5ms latency overhead and minimal memory footprint per request
- Redis-backed token store for multi-worker deployments

### Role-Aware Context Compression

- **Repo:** [github.com/harshaygadekar/role-based-context-compression](https://github.com/harshaygadekar/role-based-context-compression)
- **Stack:** Python, HuggingFace Transformers, CUDA, PyTorch
- **Hero metric:** About 50% inter-agent token reduction, 37% precision improvement, 3x experiment throughput
- **GitHub stars:** 1
- **Publication:** Co-authored paper accepted at IEEE ICAUC 2026

A multi-agent QA system with role-aware context compression — a **Retriever → Reasoner → Verifier** pipeline that filters what each agent sees, benchmarked across 7 datasets with 5 compression strategies.

The core idea is that each handoff between agents can optionally be compressed using a role-specific strategy that scores and selects content based on what the *next* agent actually needs, rather than applying blind truncation.

**Notable capabilities:**

- Three-agent pipeline with shared model weights (single GPU load)
- Five compression strategies: none, fixed-ratio, role-specific, semantic, dynamic
- Seven dataset loaders: NarrativeQA, SQuAD, HotpotQA, DROP, CNN/DailyMail, ELI5, QASPER
- Multi-turn conversation support with anaphora resolution
- Ablation framework to isolate component contributions
- Multi-GPU parallel runner for sweeping compression types concurrently
- Publication-quality visualizations
- File-based result cache to avoid redundant inference

**Impact I report:**

- About 50% reduction in inter-agent token volume
- 37% improvement in answer precision
- 3x throughput scaling via multi-GPU evaluation distribution
- 25% improvement in pipeline stability through hash-based result caching, real-time GPU memory profiling, and automated error categorization

### Prep AI

- **Repo:** [github.com/harshaygadekar/prep.ai](https://github.com/harshaygadekar/prep.ai)
- **Stack:** Next.js 14, PostgreSQL/Supabase, TypeScript, Groq API, Retell API, Clerk Auth, Prisma ORM, Tailwind CSS, shadcn/ui
- **Hero metric:** Multi-tenant auth with org-level isolation, sub-second AI scoring, real-time voice interviews
- **GitHub stars:** 0

A full-stack AI-powered interview preparation platform.

**Features:**

- Real-time voice interviews powered by Retell AI
- AI scoring across multiple dimensions using Groq inference (mixtral-8x7b-32768, llama3-70b-8192)
- Resume-based tailored interview questions
- Multiple AI interviewer personas
- Performance analytics dashboard
- Multi-tenant authentication with org-level access control via Clerk

### VerifyAI

- **Repo:** [github.com/harshaygadekar/VerifyAI](https://github.com/harshaygadekar/VerifyAI)
- **Stack:** TypeScript, Next.js, TailwindCSS, Firecrawl API, Groq API
- **GitHub stars:** 0

An AI-powered metasearch app that fetches multi-source evidence (web pages, news, images) via Firecrawl, then generates fast, source-grounded summaries and answers using Groq-hosted LLMs. Delivers concise responses with inline citations, result cards, and a reference trail.

**Design philosophy:** fetch first, answer second; always cite sources; optimize latency with Groq.

### Chat With Your Documents 2

- **Repo:** [github.com/harshaygadekar/chat-with-your-documents-2](https://github.com/harshaygadekar/chat-with-your-documents-2)
- **Stack:** Python, Meta LLaMA-3, Streamlit, FastEmbed, Pillow
- **GitHub stars:** 0

An LLM-powered personal document summarizer. Users upload PDF documents, generate concise summaries, and interact with the content via a chat interface for follow-up questions. Built with Meta LLaMA-3 and FastEmbed for embeddings, and Streamlit for the UI. Earlier experiments include a LangChain-based version.

---

## Full Project Inventory

| Project | Language | Stack / Tags | Hero Metric | CV Priority | Stars | Updated |
|---------|----------|--------------|-------------|-------------|-------|---------|
| AI-news-aggregator | JavaScript | Node.js, SQLite, Docker, AWS, Discord API, Groq API | 85+ sources, 97% uptime, ~95% data consistency | high | 0 | 2026-06-29 |
| raguard-security | Python | FastAPI, LangChain, LlamaIndex, Redis, pytest, CI/CD | <5ms latency, <1KB memory/session, 100% token exfiltration detection | high | 0 | 2026-06-24 |
| role-based-context-compression | Python | HuggingFace Transformers, CUDA, PyTorch | ~50% token reduction, 37% precision improvement, 3x throughput | high | 1 | 2026-06-01 |
| chapter | — | — | — | skip | 0 | 2026-05-24 |
| best-ai-humanizer | HTML | HTML, PowerShell | — | skip | 0 | 2026-05-19 |
| media-downloader | Python | Python, batch | — | skip | 0 | 2026-04-06 |
| PureShare | TypeScript | TypeScript, text, bash | — | skip | 0 | 2026-03-13 |
| NuanceBench | — | — | — | skip | 0 | 2026-03-11 |
| prmpt | TypeScript | TypeScript | — | skip | 0 | 2026-03-04 |
| dl-from-scratch | Python | NumPy, bash | — | skip | 0 | 2026-02-10 |
| VerifyAI | TypeScript | Next.js, TailwindCSS, Firecrawl, Groq | — | high | 0 | 2026-01-11 |
| DataStructures | — | — | — | skip | 0 | 2025-11-20 |
| Filx | Python | Python, bash | — | skip | 0 | 2025-11-18 |
| prep.ai | TypeScript | Next.js 14, PostgreSQL, Supabase, Groq API, Retell API, Clerk | Multi-tenant auth, sub-second AI scoring, real-time voice interviews | high | 0 | 2025-11-15 |
| llm-resource-hub | TypeScript | TypeScript, bash | — | skip | 0 | 2025-05-07 |
| json-data-annonymization-script | Jupyter Notebook | Jupyter Notebook, bash | — | skip | 0 | 2024-10-05 |
| EsophagealCancerPrediction | Jupyter Notebook | TensorFlow, EfficientNetB7, bash | — | skip | 0 | 2024-07-20 |
| chat-with-your-documents-2 | Python | Meta LLaMA-3, Streamlit, FastEmbed | — | high | 0 | 2024-07-20 |
| ChatWithYourDocuments_UsingLangchain | Jupyter Notebook | Jupyter Notebook | — | skip | 0 | 2024-05-07 |
| Me | — | — | — | skip | 0 | 2024-05-07 |

---

## Job Search Activity (Applications Tracker Snapshot)

- **Total applications submitted:** 3
- **Current average score:** 3.9/5
- **Role family focus:** Software Engineer, Software Development Engineer, Backend Engineer, Backend Developer, Developer
- **Common stack signal:** Java/Spring Boot, REST APIs, SQL/Postgres, Docker, Jenkins, AWS, AI/automation

| # | Date | Company | Role | Score | Status | Notes |
|---|------|---------|------|-------|--------|-------|
| 5 | 2026-06-26 | Wells Fargo | Software Engineer (Gen AI) | 3.1/5 | Evaluated | Bengaluru GCC, 2-4 yrs; YOE gap and BFSI gap; strong GenAI/LangChain/React proof points but below band |
| 4 | 2026-06-26 | Microsoft | Software Engineering Intern | 4.6/5 | Evaluated | Fits as production-experienced intern (Nokia SDE + IEEE paper); top-tier intern comp; MS-specific stack gap |
| 3 | 2026-06-18 | IDFC FIRST Bank | Developer | 3.3/5 | Evaluated | Seniority-mismatched backend role |
| 2 | 2026-06-18 | Target | Engineer | 4.1/5 | Evaluated | Good early-career SDE/backend fit |
| 1 | 2026-06-17 | Nike | Software Engineer I, ITC | 4.3/5 | Evaluated | Strong early-career Bengaluru software role |

---

## Interview Story Bank

A quick-reference list of the same proof points I use when interviewing.

| Story | Best used to show | Result |
|-------|-------------------|--------|
| Nokia KPI trend analysis service | Backend systems, production ownership, scalable software | Explainable health signals across 540+ KPI types |
| Nokia 7-stage pipeline hardening | Testing, deployment gates, data quality | About 95% trend accuracy |
| Nokia real-time correlation analysis engine | Root-cause investigation speed, incident response | Investigation time cut from hours to minutes per incident |
| Nokia cross-stack feature delivery | Stakeholder collaboration, full-stack GenAI-adjacent work | Customer-facing KPI feature on Java + Python + Pinot + React |
| Role Aware Context Compression | AI/ML preferred experience, performance optimization | About 50% token reduction and 37% precision improvement; published at IEEE ICAUC 2026 |
| AI News Aggregator Bot | Monitoring, cloud deployment, operational excellence, data structures, reliability | 85+ sources, 97% uptime, about 95% data consistency |
| Prep AI | Full-stack product engineering, REST APIs, auth, dashboards | Real-time AI scoring with sub-second inference |

---

## Voice & Writing Style Notes

When writing portfolio copy or case studies, the intended voice is:

- Short paragraphs. Get to the point.
- Specific details, numbers, names.
- Active voice, direct address.
- Natural uncertainty when uncertain (`I think`, `probably`).
- Avoid AI-buzzword vocabulary: delve, harness, unlock, revolutionize, cutting-edge, etc.
- Avoid negative parallelisms (`This isn't X, this is Y`).
- Avoid mechanical transitions (`Furthermore`, `Moreover`, `That being said`).

See `voice-dna.md` for the full style guide.

---

## Source Files Used

- `cv.md` — canonical CV
- `config/profile.yml` — contact details, targets, prefs, comp
- `modes/_profile.md` — archetypes, framing, negotiation scripts
- `article-digest.md` — full project inventory from GitHub
- `projects/*.md` — detailed per-project notes
- `interview-prep/story-bank.md` — STAR+R story index
- `data/applications.md` — application tracker
- `voice-dna.md` — writing voice guide
