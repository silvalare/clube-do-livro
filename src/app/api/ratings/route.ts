
import { NextResponse } from "next/server";

const RATINGS_URL =
  "https://script.google.com/macros/s/AKfycbxH5GMsWHF7l_kv2tlZwA39opU7Rlw9z5OutIXxbRp_UQLLOFTekydJP94HagQphD-U/exec";

export async function GET() {
  try {
    const response = await fetch(RATINGS_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Não foi possível buscar as avaliações." },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Falha ao consultar as avaliações." },
      { status: 502 }
    );
  }
}
