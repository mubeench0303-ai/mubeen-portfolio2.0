// ─────────────────────────────────────────────────────────────
// MUBEEN — GTA-5 THEMED FULL-STACK DEVELOPER PORTFOLIO
// Personal information, skills, projects and experience.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "MUBEEN Chaudhary",
  handle: "@mubeench0303",
  role: "Full-Stack Web Developer",

  tagline:
    "Welcome to my digital Los Santos — I build modern interfaces, powerful APIs and full-stack web experiences.",

  location: "Lahore, Pakistan",

  // Apna real email add kar dena
  email: "mubeen.ch.0303@gmail.com",

  // Apna phone number add kar dena
  phone: "+92 303 5240303",

  github: "https://github.com/mubeench0303-ai",

  // Apna exact LinkedIn URL add kar dena
  linkedin: "https://www.linkedin.com/in/mubeen-ch",

  // Instagram profile URL add kar dena
  instagram: "https://instagram.com/your_username",

  // Resume PDF ko public folder mein rakh kar:
  // resumeUrl: "/Mubeen-Resume.pdf"
  resumeUrl: "/Muhammad_Mubeen_Resume.pdf",

  // Apni image public folder mein profile.jpg naam se add karo
  image: "/pic5.jpg.jpeg",

  // GTA character-select style bio
  bio: [
    "Full-stack developer with a strong foundation in frontend engineering and growing expertise in backend development. I build modern interfaces with React and Next.js, and power them with robust systems built in Go and databases.",

    "From responsive UIs and smooth animations to REST APIs, authentication, databases, payments and production deployment — I turn ideas into complete, functional and scalable web applications.",
  ],
};

// ── HUD STATS — Hero overlay ──

export const hud = {
  // GTA$ — projects aur development progress ka fun counter
  cash: 137_420,

  // Portfolio theme ke liye GTA wanted level
  wanted: 5,
};

// ── CHARACTER STATS ──
// Skills displayed as GTA-style progress bars

export type Stat = {
  name: string;
  value: number;
  category: "Backend" | "Frontend" | "Tools";
};

export const stats: Stat[] = [
  // ── BACKEND ──

  {
    name: "Go / Golang",
    value: 85,
    category: "Backend",
  },

  {
    name: "REST API Development",
    value: 88,
    category: "Backend",
  },

  {
    name: "Chi Router",
    value: 84,
    category: "Backend",
  },

  {
    name: "JWT Authentication",
    value: 85,
    category: "Backend",
  },

  {
    name: "MySQL",
    value: 85,
    category: "Backend",
  },

  {
    name: "MongoDB",
    value: 78,
    category: "Backend",
  },

  {
    name: "Database Design",
    value: 80,
    category: "Backend",
  },

  // ── FRONTEND ──

  {
    name: "HTML / CSS",
    value: 94,
    category: "Frontend",
  },

  {
    name: "JavaScript",
    value: 90,
    category: "Frontend",
  },

  {
    name: "React.js",
    value: 91,
    category: "Frontend",
  },

  {
    name: "Next.js",
    value: 88,
    category: "Frontend",
  },

  {
    name: "TypeScript",
    value: 82,
    category: "Frontend",
  },

  {
    name: "Tailwind CSS",
    value: 92,
    category: "Frontend",
  },

  {
    name: "Responsive UI",
    value: 94,
    category: "Frontend",
  },

  {
    name: "Framer Motion / Animations",
    value: 80,
    category: "Frontend",
  },

  {
    name: "Three.js / React Three Fiber",
    value: 70,
    category: "Frontend",
  },

  // ── TOOLS ──

  {
    name: "Git / GitHub",
    value: 86,
    category: "Tools",
  },

  {
    name: "Docker / Docker Compose",
    value: 78,
    category: "Tools",
  },

  {
    name: "Postman",
    value: 86,
    category: "Tools",
  },

  {
    name: "Vercel / Railway",
    value: 84,
    category: "Tools",
  },
];

// ── MISSIONS — FEATURED PROJECTS ──

export type Mission = {
  id: string;
  code: string;
  name: string;
  brief: string;
  reward: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  status: "COMPLETED" | "IN PROGRESS";
};

export const missions: Mission[] = [
  {
    id: "msn-01",

    code: "MSN-01",

    name: "THE APPLE STORE HEIST",

    brief:
      "An Apple-inspired full-stack e-commerce platform where users can explore products, create accounts, manage a shopping cart and complete secure checkout. This mission includes JWT authentication, email verification, password recovery, Stripe payments, order management and admin features.",

    reward: "GTA$ 100,000",

    difficulty: 5,

    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Go",
      "Chi Router",
      "MySQL",
      "JWT",
      "Stripe",
      "Brevo",
    ],

    liveUrl: "https://apple-store-mubeen.vercel.app/",

    githubUrl: "https://github.com/mubeench0303-ai/AppleStore",

    status: "COMPLETED",
  },

  {
    id: "msn-02",

    code: "MSN-02",

    name: "MOVIE EXPLORER",

    brief:
      "A responsive movie discovery application that retrieves real-time movie data from the OMDb API. Users can search for movies and explore movie information through dynamic results.",

    reward: "GTA$ 45,000",

    difficulty: 3,

    tags: [
      "React",
      "JavaScript",
      "Vite",
      "CSS",
      "OMDb API",
    ],

    // Agar live link available ho to yahan add karna
    liveUrl: "#",

    // Agar GitHub repository available ho to yahan add karna
    githubUrl: "#",

    status: "COMPLETED",
  },

  {
    id: "msn-03",

    code: "MSN-03",

    name: "THE SHORT LINK JOB",

    brief:
      "A Go-based URL shortening application that converts long URLs into compact, shareable links. Hashing and backend storage are used to generate unique short URLs.",

    reward: "GTA$ 35,000",

    difficulty: 3,

    tags: [
      "Go",
      "REST API",
      "HTTP",
      "JSON",
      "MD5 Hashing",
    ],

    // Apna URL Shortener live URL add karna
    liveUrl: "#",

    // Apna repository URL add karna
    githubUrl: "#",

    status: "COMPLETED",
  },

  {
    id: "msn-04",

    code: "MSN-04",

    name: "SHOWROOM OPERATIONS",

    brief:
      "A Go-based showroom management application that manages vehicle records. The application uses Go structs, methods, interfaces, JSON serialization and persistent file storage.",

    reward: "GTA$ 30,000",

    difficulty: 3,

    tags: [
      "Go",
      "Structs",
      "Interfaces",
      "JSON",
      "File Handling",
    ],

    // Live deployment available nahi ho to # rehne do
    liveUrl: "#",

    // Apna GitHub repository URL add karna
    githubUrl: "#",

    status: "COMPLETED",
  },

  {
    id: "msn-05",

    code: "MSN-05",

    name: "OPERATION LOS SANTOS",

    brief:
      "GTA-inspired interactive developer portfolio with cinematic visuals, character statistics, mission-style projects, animated sections aur immersive web interactions.",

    reward: "GTA$ 75,000",

    difficulty: 5,

    tags: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
    ],

    // Portfolio deploy karne ke baad live link add karna
    liveUrl: "https://mubeench-gold.vercel.app/",

    // Portfolio GitHub par push karne ke baad repository link add karna
    githubUrl: "#",

    status: "IN PROGRESS",
  },
];

// ── WANTED / CAREER ──
// Learning and development journey as GTA heist logs

export const experience = [
  {
    id: "exp-01",

    role: "Full-Stack Web Developer",

    org: "Independent Projects",

    period: "2025 — Present",

    points: [
      "Building complete web applications using Next.js, React, Go, MySQL and MongoDB.",

      "Implemented REST APIs, JWT authentication, email verification, Stripe payments, database migrations and production deployments.",

      "Deployed frontend applications on Vercel and Go backend services with MySQL databases on Railway.",
    ],
  },

  {
    id: "exp-02",

    role: "Go Backend Developer",

    org: "Backend Development Journey",

    period: "2025 — Present",

    points: [
      "Developing REST APIs using Go, Chi Router, JSON, middleware and structured backend architecture.",

      "Working with MySQL, MongoDB, JWT authentication, password hashing and database integration.",

      "Learning Docker, Redis, clean architecture and scalable backend development patterns.",
    ],
  },

  {
    id: "exp-03",

    role: "Frontend Web Developer",

    org: "Web Development Journey",

    period: "2023 — Present",

    points: [
      "Building responsive and interactive user interfaces using HTML, CSS, JavaScript, React and Next.js.",

      "Creating reusable components and responsive layouts using Tailwind CSS, shadcn/ui and Radix UI.",

      "Working with Framer Motion, GSAP, Three.js and modern web animation techniques.",
    ],
  },
];

// ── EDUCATION ──
// Agar portfolio mein education section supported ho
// to ye data use kar sakte ho.

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",

    institute: "Islamia University of Bahawalpur",

    period: "2022 — 2026",

    status: "COMPLETED",
  },

  {
    degree: "Intermediate in Computer Science — ICS",

    institute: "Swot College, Liaquat Pur",

    period: "2019 — 2021",

    status: "COMPLETED",
  },
];

// ── PHONE / CONTACT ──

export const contacts = [
  {
    label: "Email",

    value: profile.email,

    href: `mailto:${profile.email}`,
  },

  {
    label: "GitHub",

    value: "github.com/mubeench0303-ai",

    href: profile.github,
  },

  {
    label: "LinkedIn",

    // Exact LinkedIn username add kar dena
    value: "www.linkedin.com/in/mubeen-ch",

    href: profile.linkedin,
  },

  {
    label: "Instagram",

    value: "instagram.com/your_username",

    href: profile.instagram,
  },
];

// ── SOCIAL LINKS ──

export const social = [
  {
    label: "GitHub",

    href: profile.github,
  },

  {
    label: "LinkedIn",

    href: profile.linkedin,
  },

  {
    label: "Email",

    href: `mailto:${profile.email}`,
  },
];

// ── NAVIGATION — GTA PAUSE-MENU STYLE ──

export const navItems = [
  {
    id: "hero",

    label: "HOME",
  },

  {
    id: "about",

    label: "PROFILE",
  },

  {
    id: "skills",

    label: "STATS",
  },

  {
    id: "missions",

    label: "MISSIONS",
  },

  {
    id: "experience",

    label: "CAREER",
  },

  {
    id: "hack",

    label: "HACK",
  },

  {
    id: "contact",

    label: "PHONE",
  },
];