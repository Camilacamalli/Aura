import { NextRequest, NextResponse } from "next/server";

type MoodParams = {
  playlistSearchQuery: string;
}

const moodMap: { [key: string]: MoodParams | {} } = {
  happy: {
    playlistSearchQuery: 'Happy Hits'
  },
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

  const moodCriteria = moodMap[mood] as MoodParams;

  const playlistSearchUrl = `https://api.deezer.com/search/playlist?q=${encodeURIComponent(moodCriteria.playlistSearchQuery)}`

  const laylistResponse = await fetch(playlistSearchUrl);

  return NextResponse.json({ songs: [] }, { status: 200 })
}
