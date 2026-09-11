const additionalProjectInfo = {
  "ancestree-back": {
    longDescription:
      "Ancestree-back serves as the backbone for the Ancestree family reunion application, facilitating secure and efficient data management. It ensures the privacy and security of user data through robust encryption methods. This backend system is responsible for handling user accounts, managing encrypted memories shared among family members, and maintaining the network of family connections. Built with Symfony, it leverages Docker for containerization and MySQL for data storage, ensuring scalability and ease of deployment.",
    shortDescription: "Secure backend for a family reunion app.",
    technologiesUsed: ["Symfony", "Docker", "MySQL"],
    type: "Backend",
    screenshots: [],
  },
  "ancestree-front": {
    longDescription:
      "Ancestree-front is the user-facing component of the Ancestree application, crafted with Kotlin Compose to offer a dynamic and responsive UI. It allows family members to engage in a digital space where they can share memories, connect with relatives, and explore their family tree. The application includes features like social sign-on, interactive family trees, voice command integration for accessibility, and a memory-sharing platform reminiscent of popular social media applications, all designed to enhance the user experience.",
    shortDescription: "Interactive front end for a family reunion app.",
    technologiesUsed: ["Kotlin Compose"],
    type: "Frontend",
    screenshots: [],
  },
  avocado: {
    longDescription:
      "Avocado is a desktop application tailored for legal professionals, providing a comprehensive suite of tools to manage their daily operations efficiently. From scheduling appointments to handling case files, Avocado streamlines various administrative tasks. Lawyers can keep track of their meetings, manage client information, oversee ongoing cases, and organize their calendars for better productivity. The application is developed using Java, offering a robust and reliable platform for legal management.",
    shortDescription: "A comprehensive management app for lawyers.",
    technologiesUsed: ["Java"],
    type: "Desktop Application",
    screenshots: [],
  },
  popaye: {
    longDescription:
      "Popaye revolutionizes the checkout process for cashiers with its innovative payment application. Utilizing Kotlin for development, the app enables cashiers to scan products directly from their mobile devices and facilitates NFC payments, making transactions more efficient and user-friendly. The accompanying Spring Boot backend securely handles order processing, stock management, and transaction security. Popaye's modern approach to payment processing is designed to enhance the retail experience for both employees and customers.",
    shortDescription: "A modern payment solution for cashiers.",
    technologiesUsed: ["Kotlin", "Spring Boot", "Docker"],
    type: "Full Stack",
    screenshots: [],
  },
  tripteaze: {
    longDescription:
      "Tripteaze is a comprehensive MERN stack application that simplifies travel planning. By integrating various third-party APIs, it allows users to compare flight prices, book accommodations, and plan activities at their destination, akin to services like Trivago. The project emphasizes Test-Driven Development (TDD) to ensure reliable and maintainable code. Tripteaze is designed to be a one-stop solution for travelers looking to plan their trips with ease and confidence.",
    shortDescription: "Trip planning web app inspired by Trivago.",
    technologiesUsed: ["MongoDB", "Express.js", "React", "Node.js"],
    type: "Full Stack",
    screenshots: [],
  },
  "zoidberg-ai": {
    longDescription:
      "ZOIDBERG-AI is an advanced AI project aimed at diagnosing pneumonia from 2D chest X-ray images. It utilizes three different neural network models, including Convolutional Neural Networks (CNN), VGG16 with transfer learning, and Artificial Neural Networks (ANN), to analyze and classify X-ray images. The project highlights the importance of data preprocessing and the selection of appropriate models to significantly improve diagnostic accuracy, with transfer learning showing superior performance in this application. Developed with Keras and TensorFlow, ZOIDBERG-AI is a testament to the potential of AI in medical imaging.",
    shortDescription: "AI project to detect pneumonia from X-ray images.",
    technologiesUsed: ["TensorFlow", "Keras", "Python"],
    type: "AI/ML",
    screenshots: [],
  },
  studentlife: {
    longDescription:
      "StudentLife is an innovative AI-driven platform designed to support students in achieving a balanced lifestyle, excelling academically while maintaining mental well-being. By harnessing the power of various AI libraries and extensive data analysis, the system provides personalized recommendations tailored to each user's needs and habits. Whether it's suggesting study breaks, social activities, or wellness tips, StudentLife aims to prevent burnout, stress, and mental health issues among students, making it a valuable tool for academic and personal growth.",
    shortDescription:
      "AI model offering lifestyle recommendations for students.",
    technologiesUsed: ["Python", "AI Libraries"],
    type: "AI/ML",
    screenshots: [],
  },
  datavis: {
    longDescription:
      "Datavis is a cutting-edge big data project that leverages a custom Rust scraper to gather CAC40 financial market data, which is then processed through a Kafka messaging system. A Flask server receives the data, logging it into a MariaDB database for historical analysis. Utilizing this data, the project employs regression models to predict market trends for upcoming days. The insights are presented through a React frontend, offering real-time streaming via WebSockets and detailed predictive analytics, showcasing the power of data visualization in financial decision-making.",
    shortDescription: "Big data project for financial market prediction.",
    technologiesUsed: ["Rust", "Kafka", "Flask", "MariaDB", "React", "Docker"],
    type: "Big Data",
    screenshots: [],
  },
  clockorico: {
    longDescription:
      "Clockorico is a comprehensive full-stack application designed to streamline time tracking and management for both employees and managers. The React Native mobile app allows employees to effortlessly clock in and out, monitor their work hours, and manage their schedules. On the other hand, managers have access to a VueJS web application where they can not only track their own time but also oversee their team's timekeeping, with advanced data visualization tools to analyze work patterns and improve productivity. The backend, built with Elixir, ensures robust performance and security.",
    shortDescription: "Clocking app for efficient employee time management.",
    technologiesUsed: ["React Native", "VueJS", "Elixir", "Docker"],
    type: "Full Stack",
    screenshots: [],
  },
  portfolio: {
    longDescription:
      "This portfolio website, crafted with NextJS, serves as a dynamic showcase of my professional journey and accomplishments. It features a sleek design and interactive elements to provide visitors with a comprehensive view of my skills, projects, and experiences. The site includes detailed case studies, testimonials, a blog, and a contact form, all optimized for performance and SEO. It represents my personal brand and serves as a central hub for engaging with potential clients, employers, and collaborators.",
    shortDescription: "Stylish personal portfolio showcasing projects.",
    technologiesUsed: ["NextJS"],
    type: "Web App",
    screenshots: [],
  },
  "travel-ai": {
    longDescription:
      "Travel-AI is a sophisticated AI project designed to optimize train travel planning. It incorporates a speech-to-text feature allowing users to vocally input their travel plans, which are then processed by a Named Entity Recognition (NER) model using SpaCy to extract the desired departure and destination cities. The core of the project lies in its Rust-based A* algorithm, which calculates the most efficient travel path, ensuring a seamless and optimized travel experience. The frontend, built with React, provides a user-friendly interface for interaction.",
    shortDescription: "AI project for finding optimal train paths.",
    technologiesUsed: ["Python", "Spacy", "Rust", "React"],
    type: "AI/ML",
    screenshots: [],
  },
};

// Curated public repository links keep this legacy gallery usable without tokens.
const fetchProjects = async (setProjects, setFilteredProjects) => {
  const entries = [
    ["avocado", "Avocado"],
    ["portfolio", "portfolio"],
    ["clockorico", "Clockoricko"],
  ];
  const projects = entries.map(([key, name]) => ({
    ...additionalProjectInfo[key],
    name,
    githubLink: "https://github.com/wauul/" + name,
    screenshot: "/Images/projects.webp",
  }));
  setProjects(projects);
  setFilteredProjects(projects);
};
export { fetchProjects };
