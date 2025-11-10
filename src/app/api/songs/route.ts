import { NextRequest, NextResponse } from "next/server";

interface Track {
  id: number,
  title: string,
  artist: string,
  album: string,
  albumArt: string | undefined
  previewUrl: string | null
}

type MoodParams = {
  playlistSearchQuery: string;
}

const moodMap: { [key: string]: MoodParams } = {
  happy: { playlistSearchQuery: 'Happy Hits' },
  sad: { playlistSearchQuery: 'Sad Songs for Crying' },
  neutral: { playlistSearchQuery: 'Chill Lo-fi Beats' },
  'very happy': { playlistSearchQuery: 'Feel Good Party Anthems' },
  'very sad': { playlistSearchQuery: 'Heartbreak Ballads' }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  if (!mood || !moodMap[mood]) {
    return NextResponse.json({ error: "Mood parameter is required" }, { status: 400 })
  }

  try {

    const moodCriteria = moodMap[mood] as MoodParams;

    const playlistSearchUrl = `https://api.deezer.com/search/playlist?q=${encodeURIComponent(moodCriteria.playlistSearchQuery)}`

    const playlistResponse = await fetch(playlistSearchUrl);

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlists from Deezer')
    }

    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.data?.[0]?.id;

    if (!playlistId) {
      return NextResponse.json({ error: 'Could not find a suitable playlist for this mood.' }, { status: 404 });
    }

    const tracksUrl = `https://api.deezer.com/playlist/${playlistId}/tracks`;
    const tracksResponse = await fetch(tracksUrl);

    if (!tracksResponse.ok) {
      throw new Error(`Failed to fetch tracks for playlist ID: ${playlistId}`);
    }

    const tracksData = await tracksResponse.json();
    const responseTracks: Track[] = tracksData.data
      .filter((track: any) => track.preview)
      .map((track: any) => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        albumArt: track.album.cover_medium,
        previewUrl: track.preview
      })).slice(0, 25);

    return NextResponse.json(responseTracks, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 })
  }
}
