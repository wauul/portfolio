// Skills grouped by engineering discipline, with their project references.
export const skillGroups = [
  {
    id: "full-stack",
    title: ["Full-stack development", "Développement full-stack"],
    description: ["Web applications, backend services and API integrations.", "Applications web, services backend et intégrations API."],
    skills: ["Python", "TypeScript", "JavaScript", "React / Next.js", "Node.js", "FastAPI / Flask", "API integration"],
    evidence: ["QueryOtter · Hooka Relay · Recipe Buddy", "QueryOtter · Hooka Relay · Recipe Buddy"],
  },
  {
    id: "agents",
    title: ["LLM applications & RAG", "Applications LLM & RAG"],
    description: ["Language model workflows and document search.", "Workflows de modèles de langage et recherche documentaire."],
    skills: ["LangChain", "LangGraph", "Azure OpenAI", "Azure AI Search", "Groq", "RAG", "Embeddings", "Reranking", "Pydantic"],
    evidence: ["ROKI · Ragbench · QueryOtter · PatchGoblin", "ROKI · Ragbench · QueryOtter · PatchGoblin"],
  },
  {
    id: "databases",
    title: ["Databases", "Bases de données"],
    description: ["Relational data, vector retrieval and query analysis.", "Données relationnelles, recherche vectorielle et analyse de requêtes."],
    skills: ["SQL", "PostgreSQL", "pgvector", "Prisma"],
    evidence: ["QueryOtter · Study Room · GetRatchet", "QueryOtter · Study Room · GetRatchet"],
  },
  {
    id: "cloud",
    title: ["DevOps & cloud", "DevOps & cloud"],
    description: ["Containers, CI pipelines and cloud deployment.", "Conteneurs, pipelines CI et déploiement cloud."],
    skills: ["Git", "Docker", "GitHub Actions", "Azure", "Cloudflare", "Vercel"],
    evidence: ["PatchGoblin · ROKI · Hooka Relay", "PatchGoblin · ROKI · Hooka Relay"],
  },
  {
    id: "machine-learning",
    title: ["ML & computer vision", "ML & vision par ordinateur"],
    description: ["Adaptive learning and image classification experiments.", "Apprentissage adaptatif et expériences de classification d’images."],
    skills: ["PyTorch", "scikit-learn", "TensorFlow", "Keras", "CNNs", "Transfer learning"],
    evidence: ["SkillTrail · Zoidberg-AI", "SkillTrail · Zoidberg-AI"],
  },
  {
    id: "evaluation",
    title: ["Evaluation & monitoring", "Évaluation & monitoring"],
    description: ["Answer-quality evaluation, tracing and error tracking.", "Évaluation des réponses, traces et suivi des erreurs."],
    skills: ["Ragas", "Langfuse", "Sentry", "OpenTelemetry", "Grafana"],
    evidence: ["Ragbench · GetRatchet · PatchGoblin", "Ragbench · GetRatchet · PatchGoblin"],
  },
];
