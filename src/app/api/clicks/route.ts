import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";

// 모든 링크의 클릭 수를 { [id]: count } 형태로 반환
export async function GET() {
  try {
    const collection = await getClicksCollection();
    const docs = await collection.find().toArray();
    const counts = Object.fromEntries(docs.map((d) => [d._id, d.count]));
    return NextResponse.json(counts);
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// 해당 링크의 클릭 수를 1 증가
export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (typeof id !== "string" || !id) {
      return NextResponse.json({ error: "id 필요" }, { status: 400 });
    }
    const collection = await getClicksCollection();
    await collection.updateOne(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true },
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
