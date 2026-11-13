import { readFile } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session) redirect("/signin?callbackUrl=%2Fapi%2Fnotes%2Fdownload");

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
