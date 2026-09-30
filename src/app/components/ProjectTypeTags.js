const frenchTypes = {
  AI: "IA",
  "WEB APP": "APP WEB",
  "DEV TOOLS": "OUTILS DEV",
  REALTIME: "TEMPS RÉEL",
  DATABASE: "BASE DE DONNÉES",
  AUTOMATION: "AUTOMATISATION",
  EVALUATION: "ÉVALUATION",
};

export default function ProjectTypeTags({ types, french }) {
  return <ul className="project-type-tags" aria-label={french ? "Type de projet" : "Project type"}>
    {types.map(type => <li key={type} data-type={type}>{french ? frenchTypes[type] || type : type}</li>)}
  </ul>;
}
