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

  // Free download (served by an authenticated route)
  notes: {
    title: "Blockchain Dev and Memecoin Fundamentals",
    file: "/api/notes/download",
    blurb:
      "63 pages of lecture notes from beginner to intermediate: labs on testnet, quizzes, and a 30-day content plan. Free.",
  },
};

// TODO: replace the descriptions with your own wording. Add a `href` to show a link.
export const projects = [
  {
    name: "PayHold",
    tag: "Founder project",
    text: "A fintech platform built around escrow, with delivery and real estate use cases.",
    stack: ["Next.js", "React Native", "Payments"],
    href: null,
  },
  {
    name: "CasualCrave",
    tag: "Early access",
    text: "A mood-powered discovery platform, now in early access.",
    stack: ["Next.js", "Mobile"],
    href: null,
  },
  {
    name: "Token Due-Diligence Dashboard",
    tag: "In progress",
    text: "A read-only Solana tool that checks a token's authorities and top holders. Built in public.",
    stack: ["Next.js", "Solana", "web3.js"],
    href: null,
  },
];

export const services = [
  {
    title: "Web apps",
    text: "Fast, clean products and sites built with Next.js.",
    points: ["Landing pages and marketing sites", "Dashboards and internal tools", "Payments and sign-in"],
  },
  {
    title: "Mobile apps",
    text: "Cross-platform apps with React Native and Expo.",
    points: ["iOS and Android from one codebase", "Push notifications and sign-in", "App Store and Play Store launch"],
  },
  {
    title: "Web3 integrations",
    text: "Practical, safe blockchain features for real products.",
    points: ["Wallet connect and read-only dashboards", "Token and on-chain data tools", "Monitoring and alerts, never holding your funds"],
  },
];

export const journey = [
  { n: "01", title: "Blockchain basics", text: "What a blockchain really is, with a tiny one you build yourself." },
  { n: "02", title: "Wallets + staying safe", text: "Keys, seed phrases, and the habits that stop you getting drained." },
  { n: "03", title: "How memecoins really work", text: "Liquidity pools, bonding curves and price impact, on testnet." },
  { n: "04", title: "Spotting rugs + risks", text: "How scams are built, so you can recognise them." },
  { n: "05", title: "Building + shipping projects", text: "Tokens, trackers and dashboards you can put in a portfolio." },
];
