export const projects = [
  {
    id: "01",
    category: "Product engineering",
    types: ["WEB APP", "PLUGIN", "API"],
    title: "A clearer picture of teamwork.",
    name: "Architecture team planner",
    description:
      "An interactive planning tool that brings teams, tasks and time into one timeline. Built in vanilla JavaScript as a custom Bubble plugin.",
    tags: ["JavaScript", "Bubble plugin", "Lucca API"],
    type: "timeline",
    details: [
      "Drag, drop and resize tasks; manage phases and key dates across teams.",
      "Respect weekends, public holidays and leave imported from Lucca.",
      "Send declared time to Lucca when a task is marked done, with PDF export for planning reviews.",
    ],
  },
  {
    id: "02",
    category: "Applied AI",
    types: ["AI", "WEB APP", "RAG"],
    title: "From documents to answers.",
    name: "Enterprise knowledge assistant",
    description:
      "A conversational assistant connecting company knowledge to natural-language questions through retrieval-augmented generation.",
    tags: ["Azure OpenAI", "Azure AI Search", "RAG", "Docker"],
    type: "ai",
    details: [
      "Built an enterprise chatbot at ROKI using OpenAI on Azure and Bubble.",
      "Used Azure AI Search to retrieve relevant company-document passages for the RAG workflow.",
      "Connected the AI experience to the application through service integrations.",
    ],
  },
  {
    id: "03",
    category: "Systems integration",
    types: ["AI", "WEB APP", "API"],
    title: "One connected workspace.",
    name: "Microsoft & business workflows",
    description:
      "SSO and Microsoft tool integrations, alongside a Bubble application for the everyday flow of stock, orders and deliveries.",
    tags: ["SAML SSO", "Microsoft", "API integration", "Bubble"],
    type: "integration",
    details: [
      "Implemented Microsoft SSO using SAML and integrations with Outlook, Word, Excel and PowerPoint.",
      "Integrated AI capabilities through Microsoft OpenAI services.",
      "Built a separate Bubble application to manage inventory, orders and deliveries.",
    ],
  },
];
export const experiences = [
  {
    date: "2024 — Present",
    company: "Independent",
    role: "Freelance full-stack & AI developer",
    text: "Building business applications from interface to integration: architecture team planning, Lucca synchronisation, Microsoft SAML SSO, AI features and stock-management workflows.",
    tags: "JavaScript · TypeScript · APIs · Microsoft · Bubble",
  },
  {
    date: "2022 — 2024",
    company: "ROKI · Marseille",
    role: "Full-stack & AI developer · Apprenticeship",
    text: "Developed an Azure RAG chatbot, a Python/Flask job-distribution module, and business applications using Node.js, PostgreSQL and AWS. Connected advertising and CRM tools including Google, Facebook and HubSpot.",
    tags: "Python · Flask · Azure OpenAI · Azure AI Search · Node.js",
  },
  {
    date: "2016 — 2021",
    company: "Freelance · Alongside studies",
    role: "Web & mobile developer",
    text: "Delivered web and mobile projects through Fiverr while studying, working with React, Angular, Flutter and Java.",
    tags: "React · Angular · Flutter · Java",
  },
];
