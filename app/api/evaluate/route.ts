import { NextResponse } from "next/server";
import { evaluate } from "@/lib/scoring";

export async function POST(req: Request) {
  try {
    const { title = "", text = "" } = await req.json();
    const res = evaluate(text, title);
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
