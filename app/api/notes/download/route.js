import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(process.cwd(), "private", "notes", "Blockchain_Dev_Memecoin_Lecture_Notes.pdf");
  const pdf = await readFile(filePath);

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Blockchain_Dev_Memecoin_Lecture_Notes.pdf"',
      "Cache-Control": "private, no-store",
    },
  });
}
