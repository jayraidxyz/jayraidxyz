// "Latest lessons" on the home page now read from the library (data/library.js).
// Add posts there and they appear on the home page, /resources and /library/<slug>.
import { library } from "./library";

export const posts = library.map((p) => ({
  title: p.title,
  date: p.date,
  summary: p.summary,
  href: `/library/${p.slug}`,
  cover: `/library/${p.cover}`,
  type: p.type,
}));
