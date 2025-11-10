import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  if (!mood) {
    return NextResponse.json({ error: "Mood parameter is required" }, { status: 400 })
  }

}
