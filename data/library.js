// ============================================================================
// THE LIBRARY. Every post shown on /resources and /library/[slug] comes from here.
// To add a post: put images in public/library/<slug>/ (slide-1.webp, slide-2.webp...),
// optionally video.mp4, then add one object below. Newest first.
//
// type:    "Explainer" | "Carousel" | "Reel" | "Notes"
// aspect:  slide ratio, "4/5" for carousels or "9/16" for reels
// body:    reading-page blocks. Use { h }, { p }, { ul: [] } or { note }.
// ============================================================================

export const library = [
  {
    slug: "dtcc-solana",
    type: "Explainer",
    date: "2026-11-13",
    title: "DTCC is connecting to Solana",
    summary:
      "The firm behind much of traditional market infrastructure plans to connect its Tokenization Service to Solana in H2 2027.",
    tags: ["Solana", "Tokenization", "TradFi"],
    aspect: "4/5",
    slides: 7,
    cover: "dtcc-solana/cover.webp",
    video: "dtcc-solana/video.mp4",
    readMinutes: 3,
    body: [
      { h: "What was announced" },
      {
        p: "DTCC, the Depository Trust & Clearing Corporation, announced plans to connect its Tokenization Service to Solana. The integration is expected in the second half of 2027.",
      },
      { h: "What tokenization means here" },
      {
        p: "Eligible traditional assets held at DTC could be converted into tokenized form on a blockchain. The tokens are a digital version of the same asset, not a new asset.",
      },
      {
        ul: [
          "Eligible DTC-custodied assets are the starting point",
          "The tokenized version is described as having the same entitlements as the original",
          "Solana would be one of the blockchains the service connects to",
        ],
      },
      { h: "The part that matters most" },
      {
        p: "The announcement says tokenized assets would keep the same investor protections and ownership rights as the traditional asset. For tokenization to be useful to regular investors, that is the condition that has to hold.",
      },
      { h: "A plan, not a launch" },
      {
        p: "This is a planned integration with a target window, not a product you can use today. Timelines in finance move, so treat H2 2027 as the intention.",
      },
      { h: "What I'm watching" },
      {
        ul: [
          "Which assets qualify as eligible",
          "How DTCC approves blockchains for the service",
          "Whether the timeline holds",
        ],
      },
      {
        note: "Educational only. Not financial advice. I'm a developer learning in public, and I can be wrong.",
      },
    ],
    sources: [
      { label: "Solana: DTCC Tokenization Service to Connect with Solana", href: "https://solana.com/news/dtcc-tokenization-service-to-connect-with-solana" },
      { label: "DTCC: Paving the Way to Tokenized DTC-Custodied Assets", href: "https://www.dtcc.com/news/2025/december/11/paving-the-way-to-tokenized-dtc-custodied-assets" },
    ],
    captions: [
      { platform: "X", text: "DTCC has announced plans to connect its Tokenization Service to Solana, expected in H2 2027.\n\nThe announcement says tokenized assets would keep the same investor protections and ownership rights.\n\nA plan, not a launch yet. I'm documenting what I learn as it develops.\n\nWeb3 Log. Not financial advice." },
      { platform: "Instagram", text: "Traditional finance meets blockchain.\n\nDTCC has announced plans to connect its Tokenization Service to Solana in H2 2027. An interesting development in the evolution of tokenized assets.\n\nI'm documenting the technology and learning as the ecosystem develops.\n\nEducational only. Not financial advice." },
    ],
  },
  {
    slug: "solana-privacy-rings",
    type: "Explainer",
    date: "2026-11-13",
    title: "Can a public blockchain keep a secret?",
    summary:
      "Helius launched Solana Privacy Rings: encrypted balances and private transfers, with wallet addresses still visible.",
    tags: ["Solana", "Privacy", "Programmable privacy"],
    aspect: "4/5",
    slides: 8,
    cover: "solana-privacy-rings/cover.webp",
    video: "solana-privacy-rings/video.mp4",
    readMinutes: 3,
    body: [
      { h: "The problem" },
      {
        p: "Public blockchains are transparent by design. Wallet balances and transaction histories can often be viewed by anyone, which is a real obstacle for personal finance and for businesses.",
      },
      { h: "What launched" },
      {
        p: "Helius launched Solana Privacy Rings on Solana mainnet on November 10, 2026. Per the Solana Foundation announcement, assets and amounts are encrypted while wallet addresses remain visible.",
      },
      {
        ul: [
          "Balances: encrypted",
          "Transfer amounts: encrypted",
          "Wallet addresses: still visible",
          "Only the owner can decrypt balances, using a viewing key",
        ],
      },
      { h: "What \"programmable privacy\" means" },
      {
        p: "Solana programs can hold encrypted balances and release funds when conditions are met, like a private escrow. Private transactions can also work with other Solana programs in one transaction.",
      },
      { h: "What's still early" },
      {
        ul: [
          "Formal verification of the core programs and circuits is still underway",
          "Compliance-focused Custom Rings are not live yet",
          "Helius's own page describes stronger hiding (sender, recipient, asset and amount), so read both sources before relying on a detail",
        ],
      },
      {
        note: "Educational only. Not financial advice. This is new technology and details may change.",
      },
    ],
    sources: [
      { label: "Solana Foundation: Solana Privacy Rings Bring Programmable Privacy Onchain", href: "https://solana.com/news/solana-privacy-rings-bring-programmable-privacy-onchain" },
      { label: "Helius: Solana Privacy Rings", href: "https://www.helius.dev/privacy" },
    ],
    captions: [
      { platform: "X", text: "Public blockchains are transparent by design. Anyone can often see wallet balances and transaction histories.\n\nHelius just launched Solana Privacy Rings on mainnet: encrypted balances and private transfers, with wallet addresses still visible.\n\nIt's early, but programmable privacy is worth understanding.\n\nWeb3 Log. Not financial advice." },
      { platform: "Instagram", text: "Blockchain transparency is powerful, but privacy matters too.\n\nSolana Privacy Rings, launched by Helius, introduces programmable privacy through encrypted balances and private transfers. A fascinating area of Web3 development worth exploring.\n\nStill early, so I'm learning as it develops. Educational only. Not financial advice." },
    ],
  },
  {
    slug: "hype-post-red-flags",
    type: "Carousel",
    date: "2026-11-08",
    title: "\"Made $29,000 in 24 hours.\" Read this first.",
    summary:
      "Three red flags in a typical profit-claim post, and three questions to ask before you click any link.",
    tags: ["Scam awareness", "Memecoins", "Safety"],
    aspect: "4/5",
    slides: 7,
    cover: "hype-post-red-flags/slide-1.webp",
    readMinutes: 2,
    body: [
      { h: "How these posts are built" },
      {
        p: "A viral post claims a huge result in a short time, asks you to comment a keyword for the strategy, and places a link at the top. The pattern is common, and each part is worth examining.",
      },
      { h: "Red flag 1: a number you can't check" },
      {
        p: "No wallet address and no transaction history, just a claim or a screenshot. Real trades are public on-chain. If the wallet isn't shown, treat the number as a story.",
      },
      { h: "Red flag 2: \"comment GUIDE and I'll send it\"" },
      {
        p: "Comments boost a post's reach and fill the poster's DMs. The strategy often sits behind a link or a sign-up.",
      },
      { h: "Red flag 3: the link at the top" },
      {
        p: "Ask who gets paid if you click. Many such links are referrals that can earn the poster a commission when you sign up or trade. Referrals aren't wrong, but hiding them is.",
      },
      { h: "Read the last paragraph" },
      {
        p: "The post this carousel is based on ended with the honest part: there is no magic formula, trades can result in significant losses, and no strategy guarantees profits. The truth is at the bottom and the hype is at the top.",
      },
      { h: "The three questions" },
      {
        ul: [
          "Can I verify it on-chain?",
          "Who gets paid if I click?",
          "What happens if I'm wrong?",
        ],
      },
      {
        p: "The signals worth learning are real, and readable on-chain: volume and holder count, how concentrated the top wallets are, whether liquidity is locked, and mint and freeze authority.",
      },
      { note: "Educational only. Not financial advice. This describes a general pattern, not any specific person." },
    ],
    sources: [],
    captions: [],
  },
  {
    slug: "dev-web3-setup",
    type: "Carousel",
    date: "2026-11-07",
    title: "My dev + Web3 setup",
    summary:
      "The tools, wallets and extensions I use to build and learn on testnet, plus the safety rules I never break.",
    tags: ["Tools", "Wallets", "Setup"],
    aspect: "4/5",
    slides: 7,
    cover: "dev-web3-setup/slide-1.webp",
    readMinutes: 2,
    body: [
      { h: "The dev stack" },
      { ul: ["VS Code, Git and GitHub", "Node.js, Next.js and React Native with Expo", "Vercel for deploys"] },
      { h: "Blockchain tooling" },
      { ul: ["Solana CLI and the spl-token CLI", "Anchor for Solana programs", "Remix or Foundry for Solidity", "web3.js to read chain data"] },
      { h: "Wallets for testing" },
      { ul: ["Phantom (Solana) on devnet", "MetaMask (EVM) on Sepolia", "A separate browser profile for dev", "Zero real funds inside"] },
      { h: "Reading the chain" },
      { ul: ["Solscan and Etherscan explorers", "DexScreener for pools and charts", "An RPC provider such as Helius or Alchemy"] },
      { h: "Rules I never break" },
      { ul: ["Seed phrase stays on paper", "Keypairs and .env files go in .gitignore", "Read every signature request", "Testnet only on camera"] },
      { note: "Tools are listed below on this page. Test wallets only, never real funds." },
    ],
    sources: [],
    captions: [],
  },
  {
    slug: "wallet-rules-reel",
    type: "Reel",
    date: "2026-11-07",
    title: "Rules of this wallet",
    summary:
      "A seven-frame Reel of the wallet safety rules I follow, set to a trending template.",
    tags: ["Wallet safety", "Reel"],
    aspect: "9/16",
    slides: 7,
    cover: "wallet-rules-reel/slide-1.webp",
    readMinutes: 1,
    body: [
      { h: "The rules" },
      {
        ul: [
          "Do not click the link if the sender is a stranger",
          "Read every signature",
          "Test on devnet first",
          "Never share the seed phrase",
        ],
      },
      {
        p: "Most wallet losses come from approving something that wasn't read, or from handing over a seed phrase. These four habits prevent a large share of them.",
      },
    ],
    sources: [],
    captions: [],
  },
  {
    slug: "intro-day-1",
    type: "Carousel",
    date: "2026-11-06",
    title: "Day 1: web dev learning blockchain in public",
    summary:
      "Who I am, what I'm learning, what you'll get from following along, and the rules I'm holding myself to.",
    tags: ["Intro", "Building in public"],
    aspect: "4/5",
    slides: 6,
    cover: "intro-day-1/slide-1.webp",
    readMinutes: 1,
    body: [
      { h: "Who I am" },
      {
        p: "A self-taught full-stack developer building web (Next.js) and mobile (React Native) apps, and the founder of PayHold.",
      },
      { h: "What I'm doing" },
      {
        p: "Going deep on blockchain development, starting with how memecoins actually work, all on testnet and devnet with no real money.",
      },
      { h: "What you'll get" },
      {
        ul: [
          "How tokens, bonding curves and liquidity pools work",
          "How rugs are coded, so you can spot them",
          "Builds: bots, trackers and contracts",
          "My mistakes, not just my wins",
        ],
      },
      { h: "My rules" },
      { p: "No shilling. No profit promises. Just learning and building in the open." },
    ],
    sources: [],
    captions: [],
  },
];

export const notesPost = {
  title: "Blockchain Dev and Memecoin Fundamentals",
  summary: "63 pages, beginner to intermediate: labs on testnet, quizzes and a 30-day content plan. Free PDF.",
  href: "/api/notes/download",
};

export const typeColors = {
  Explainer: "text-cyan border-cyan/40",
  Carousel: "text-[#9aa2ff] border-accent/60",
  Reel: "text-[#ff8caf] border-[#ff8caf]/50",
  Notes: "text-white border-white/30",
};

export function formatDate(iso) {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function slideSrc(post, i) {
  return `/library/${post.slug}/slide-${i}.webp`;
}
