import { NextRequest, NextResponse } from "next/server";

const moodMap: { [key: string]: {} } = {
  happy: {},
  sad: {},
  neutral: {},
  'very happy': {},
  'very sad': {}
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  if (!mood || !moodMap[mood]) {
    return NextResponse.json({ error: "Mood parameter is required" }, { status: 400 })
  }

  return NextResponse.json({ songs: [] }, { status: 200 })
}
