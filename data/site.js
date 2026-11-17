// ============================================================================
// EDIT ME. Almost everything you see on the site comes from this file.
// Items marked TODO are placeholders to replace before you launch.
// ============================================================================

export const site = {
  handle: "jayraidxyz",

  // Hero text
  heroLine1: "I build web + mobile apps.",
  heroLine2: "Learning Web3 in public.",
  sub: "Self-taught full-stack dev and founder of PayHold. Testnet-first, no hype.",

  // TODO: use a public contact email on your own domain (not your personal inbox).
  email: "hello@example.com",

  // Optional looping hero background. Put an .mp4 in /public and set it here,
  // for example "/hero.mp4". Keep it under ~8 MB. Leave null for a plain dark hero.
  heroVideo: null,

  // TODO: check each link points to your real account.
  socials: [
    { label: "X", href: "https://x.com/jayraidxyz" },
    { label: "TikTok", href: "https://www.tiktok.com/@jayraidxyz" },
    { label: "Instagram", href: "https://www.instagram.com/jayraidxyz" },
  ],
  xFollowHref: "https://x.com/intent/follow?screen_name=jayraidxyz",

  github: "https://github.com/jayraidxyz",

  // Free download
  notes: {
    title: "Blockchain Dev and Memecoin Fundamentals",
    file: "/api/notes/download",
    blurb:
      "63 pages of lecture notes from beginner to intermediate: labs on testnet, quizzes, and a 30-day content plan. Free.",
  },
};

export const projects = [
  {
    slug: "payhold",
    name: "PayHold",
    tag: "Founder project",
    text: "A fintech platform built around escrow, with delivery and real estate use cases.",
    stack: ["Next.js", "React Native", "Payments"],
    image: "/assets/aistudio/Screenshot_From_2026-11-16_22-15-14_42dcaef0.png",
    imageAlt: "PayHold mobile escrow sign-in screen showing Deliver Safely. Pay Confidently.",
    imageClass: "origin-left scale-[1.03] object-cover object-[20%_top] group-hover:scale-[1.05]",
    href: "https://payhold.vercel.app",
    githubUrl: "https://github.com/jayraidxyz",
  },
  {
    slug: "nsuk-spg-website",
    name: "NSUK SPG Website",
    tag: "Web platform",
    text: "A dedicated web portal built for NSUK School of Postgraduate Studies with navigation, announcements, and resources.",
    stack: ["Next.js", "Web"],
    image: "/assets/aistudio/Screenshot_From_2026-11-17_03-15-43_67aaa0ff.png",
    imageAlt: "NSUK SPG Website interface preview",
    imageClass: "object-cover object-top group-hover:scale-[1.02]",
    href: "https://spgs.nsuk.edu.ng/",
    githubUrl: "https://github.com/jayraidxyz",
  },
  {
    slug: "feed-and-fodder-africa",
    name: "Africa Feed & Fodder MSP",
    tag: "Web platform",
    text: "Multi-stakeholder web platform connecting feed and fodder partners and resources across Africa.",
    stack: ["Next.js", "Web"],
    image: "/assets/aistudio/Screenshot_From_2026-11-17_03-28-14_4c09bd27.png",
    imageAlt: "Africa Feed and Fodder Multi Stakeholder Platform preview",
    imageClass: "object-cover object-left-top group-hover:scale-[1.02]",
    href: "https://feedandfodder.africa/",
    githubUrl: "https://github.com/jayraidxyz",
  },
];

export const services = [
  {
    title: "Full-stack web, mobile & Web3 apps",
    text: "End-to-end products built with Next.js, React Native, and safe testnet-first Web3 integrations — shipped cleanly from idea to production.",
    points: [
      "Fast web apps, landing pages, and internal dashboards in Next.js",
      "Cross-platform iOS & Android apps with React Native and Expo",
      "Authentication, escrow/payment flows, and backend APIs",
      "Read-only Web3 dashboards, wallet connect, and on-chain monitoring",
    ],
  },
];

export const journey = [
  { n: "01", title: "Blockchain basics", text: "What a blockchain really is, with a tiny one you build yourself." },
  { n: "02", title: "Wallets + staying safe", text: "Keys, seed phrases, and the habits that stop you getting drained." },
  { n: "03", title: "How memecoins really work", text: "Liquidity pools, bonding curves and price impact, on testnet." },
  { n: "04", title: "Spotting rugs + risks", text: "How scams are built, so you can recognise them." },
  { n: "05", title: "Building + shipping projects", text: "Tokens, trackers and dashboards you can put in a portfolio." },
];
