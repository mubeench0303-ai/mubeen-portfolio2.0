

// ─────────────────────────────────────────────────────────────
// PLACEHOLDER CONTENT — apni real details yahan edit karo.
// Baaki codebase change karne ki zaroorat nahi.
// GTA-5 themed full-stack developer portfolio.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "YOUR NAME",
  handle: "@yourhandle",
  role: "Full-Stack Web Developer",
  tagline: "Welcome to Los Santos — I build web apps that run the streets.",
  location: "Los Santos, San Andreas",
  email: "you@example.com",
  phone: "+1 (555) 013-3700",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resumeUrl: "#",
  image: "/profile.svg",
  // GTA character-select style bio
  bio: [
    "Full-stack developer aur digital hustler. Empty repo se le kar production tak — main pura game khud khelta hoon.",
    "Backend heists (APIs, databases) se le kar frontend getaways (pixel-perfect UI) tak, har mission clean execute karta hoon. No bugs left behind.",
  ],
};

// ── HUD stats (Hero overlay) ──
export const hud = {
  cash: 137_420, // "GTA$" — projects shipped ka fun counter
  wanted: 5, // star rating (1-5) — experience level
};

// ── CHARACTER STATS (Skills as GTA stat bars) ──
export type Stat = {
  name: string;
  value: number; // 0 - 100
  category: "Backend" | "Frontend" | "Tools";
};

export const stats: Stat[] = [
  { name: "Node.js / Express", value: 92, category: "Backend" },
  { name: "Databases (SQL/NoSQL)", value: 88, category: "Backend" },
  { name: "REST / GraphQL APIs", value: 90, category: "Backend" },
  { name: "Auth & Security", value: 84, category: "Backend" },
  { name: "React / Next.js", value: 95, category: "Frontend" },
  { name: "TypeScript", value: 90, category: "Frontend" },
  { name: "Tailwind / UI", value: 93, category: "Frontend" },
  { name: "Three.js / 3D", value: 80, category: "Frontend" },
  { name: "Git & CI/CD", value: 87, category: "Tools" },
  { name: "Docker / Cloud", value: 82, category: "Tools" },
];

// ── MISSIONS (Projects) ──
export type Mission = {
  id: string;
  code: string; // mission code e.g. "MSN-01"
  name: string;
  brief: string;
  reward: string; // fun "payout"
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
    name: "THE BIG STORE",
    brief:
      "Ek full-stack e-commerce platform — Stripe payments, admin dashboard, order tracking aur email verification ke saath. Poori online empire.",
    reward: "GTA$ 84,000",
    difficulty: 5,
    tags: ["Next.js", "Node", "Stripe", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    status: "COMPLETED",
  },
  {
    id: "msn-02",
    code: "MSN-02",
    name: "DASHBOARD HEIST",
    brief:
      "Real-time analytics dashboard with live charts, websockets aur role-based access control. Data ka poora control aapke haath mein.",
    reward: "GTA$ 52,500",
    difficulty: 4,
    tags: ["React", "WebSocket", "Node", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    status: "COMPLETED",
  },
  {
    id: "msn-03",
    code: "MSN-03",
    name: "THE SOCIAL SCORE",
    brief:
      "Full-featured social app — auth, feeds, notifications aur media uploads. Scalable backend ke saath smooth UX.",
    reward: "GTA$ 61,200",
    difficulty: 4,
    tags: ["Next.js", "TypeScript", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    status: "COMPLETED",
  },
  {
    id: "msn-04",
    code: "MSN-04",
    name: "OPERATION 3D",
    brief:
      "Ye wahi portfolio — GTA-inspired 3D web experience with scroll-driven camera, custom HUD aur cinematic vibes.",
    reward: "GTA$ 40,000",
    difficulty: 5,
    tags: ["Three.js", "R3F", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    status: "IN PROGRESS",
  },
];

// ── WANTED / CAREER (Experience as heist log) ──
export const experience = [
  {
    id: "exp-01",
    role: "Senior Full-Stack Developer",
    org: "Freelance Operations",
    period: "2024 — Present",
    points: [
      "Led end-to-end delivery of production web apps for global clients.",
      "Architected scalable APIs, databases aur CI/CD pipelines.",
    ],
  },
  {
    id: "exp-02",
    role: "Full-Stack Developer",
    org: "Los Santos Tech Co.",
    period: "2022 — 2024",
    points: [
      "Shipped 20+ features across web platform serving 100k+ users.",
      "Optimized performance aur reduced load times by 40%.",
    ],
  },
  {
    id: "exp-03",
    role: "Junior Developer",
    org: "Startup Crew",
    period: "2021 — 2022",
    points: [
      "Built responsive frontends aur maintained REST APIs.",
      "Grew from rookie to core crew member in one year.",
    ],
  },
];

// ── PHONE / CONTACT ──
export const contacts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/you", href: profile.github },
  { label: "LinkedIn", value: "linkedin.com/in/you", href: profile.linkedin },
];

export const social = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

// ── NAV (pause-menu style) ──
export const navItems = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "PROFILE" },
  { id: "skills", label: "STATS" },
  { id: "missions", label: "MISSIONS" },
  { id: "experience", label: "CAREER" },
  { id: "hack", label: "HACK" },
  { id: "contact", label: "PHONE" },
];
