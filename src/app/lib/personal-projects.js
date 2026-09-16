export const personalProjects = [
  {
    id: "rag-bench", name: "RAG Bench", symbol: "◈", category: ["AI evaluation", "Évaluation IA"],
    description: ["A playground for comparing document retrieval pipelines. Tune chunking, embeddings and reranking, then inspect generated answers, source passages and Ragas evaluation metrics side by side.", "Un laboratoire pour comparer des pipelines de recherche documentaire. Ajustez le découpage, les embeddings et le reclassement, puis comparez les réponses, les sources et les métriques Ragas."],
    skills: ["Python", "FastAPI", "Streamlit", "Chroma", "Ragas", "Sentence Transformers"],
    github: "https://github.com/wauul/rag-bench", live: "https://wauul-rag-bench-dashboardapp-peuvxw.streamlit.app/", demo: "/demos/rag-bench.gif",
  },
  {
    id: "study-room", name: "Study Room", symbol: "✳", category: ["Collaborative learning", "Apprentissage collaboratif"],
    description: ["A shared study space that turns documents into conversations. Ask source-grounded questions, take synchronized quizzes and explore a live discussion heatmap with a personalized session recap.", "Un espace d’étude partagé qui transforme les documents en conversations. Posez des questions ancrées dans vos sources, participez à des quiz synchronisés et retrouvez une carte des discussions et un bilan personnalisé."],
    skills: ["TypeScript", "Next.js", "Socket.io", "PostgreSQL", "pgvector", "RAG"],
    github: "https://github.com/wauul/study-room", live: "https://study-room-ten-blond.vercel.app", demo: "/demos/study-room.gif",
  },
  {
    id: "watchtower", name: "Watchtower", symbol: "⌁", category: ["Product monitoring", "Suivi de produits"],
    description: ["A price and restock tracker that keeps an eye on products for you. Scheduled checks collect price history, AI helps extract product information, and email alerts flag changes worth a look.", "Un outil qui surveille les prix et les retours en stock. Des vérifications planifiées construisent l’historique des prix, l’IA aide à extraire les informations et des alertes e-mail signalent les changements."],
    skills: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Cheerio", "Groq", "Resend"],
    github: "https://github.com/wauul/watchtower", live: "https://watchtower-six-umber.vercel.app", demo: "/demos/watchtower.gif",
  },
  {
    id: "are-we-vibing", name: "R We Vibing?", symbol: "♫", category: ["Music & connection", "Musique & rencontres"],
    description: ["Two music tastes, one playful compatibility check. Share an invite, compare favorite tracks, and discover an AI-generated verdict, genre breakdown, recommendations and a shareable result card.", "Deux univers musicaux, un test de compatibilité ludique. Partagez une invitation, comparez vos morceaux favoris et découvrez un verdict généré par IA, vos genres, des recommandations et une carte à partager."],
    skills: ["TypeScript", "Next.js", "Prisma", "Groq", "YouTube API", "Capacitor"],
    github: "https://github.com/wauul/are-we-vibing", live: "https://are-we-vibing.vercel.app", demo: "/demos/are-we-vibing.gif",
  },
  {
    id: "recipe-buddy", name: "Recipe Buddy", symbol: "♧", category: ["Everyday cooking", "Cuisine au quotidien"],
    description: ["A personal recipe box with an AI sous-chef. Save recipes, import them from text or a link, search by mood and turn selected dishes into a combined shopping list.", "Un carnet de recettes personnel avec un sous-chef IA. Enregistrez vos recettes, importez-les depuis un texte ou un lien, recherchez selon vos envies et réunissez les ingrédients dans une liste de courses."],
    skills: ["TypeScript", "Next.js", "React", "Prisma", "PostgreSQL", "Groq", "NextAuth"],
    github: "https://github.com/wauul/recipe-buddy", live: "https://recipe-buddy.vercel.app", demo: "/demos/recipe-buddy.gif",
  },
  {
    id: "hooka-relay", name: "Hooka Relay", symbol: "⇄", category: ["Developer infrastructure", "Infrastructure développeur"],
    description: ["A webhook delivery service built around reliability. Queue events, sign deliveries, retry failures and replay attempts from a dashboard, with circuit breakers and AI-assisted failure diagnosis.", "Un service de livraison de webhooks axé sur la fiabilité. Mettez les événements en file, signez les envois et relancez les tentatives depuis un tableau de bord, avec coupe-circuits et diagnostic assisté par IA."],
    skills: ["TypeScript", "Next.js", "Node.js", "RabbitMQ", "PostgreSQL", "Docker"],
    github: "https://github.com/wauul/hooka-relay", live: "https://hooka-relay.vercel.app", demo: "/demos/hooka-relay.gif",
  },
];
