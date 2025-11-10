// /app/api/songs/route.ts

import { NextRequest, NextResponse } from 'next/server';

// --- TYPE DEFINITIONS ---
// Define the structure for a single track that our API will return.
// This keeps our frontend consistent regardless of the music API source.
export interface Track {
  id: number; // Deezer uses numeric IDs
  title: string;
  artist: string;
  album: string;
  albumArt: string | undefined;
  previewUrl: string | null;
}

// Define the type for our mood-to-search-query mapping.
type MoodParams = {
  playlistSearchQuery: string;
};

// --- MOOD MAPPING ---
// Map our app's moods to specific search queries for Deezer playlists.
const moodMap: { [key: string]: MoodParams } = {
  happy: {
    playlistSearchQuery: 'Happy Hits',
  },
  sad: {
    playlistSearchQuery: 'Sad Songs',
  },
  energetic: {
    playlistSearchQuery: 'Workout Motivation Hits',
  },
  calm: {
    playlistSearchQuery: 'Chill Lo-fi Beats',
  },
};


// --- API ROUTE HANDLER ---
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  // 1. Validate the mood parameter
  if (!mood || !moodMap[mood]) {
    return NextResponse.json({ error: 'Invalid or missing mood parameter' }, { status: 400 });
  }

  try {
    const moodCriteria = moodMap[mood];

    // 2. Search for a playlist on Deezer that matches the mood.
    // We encode the query to handle spaces and special characters safely.
    const playlistSearchUrl = `https://api.deezer.com/search/playlist?q=${encodeURIComponent(moodCriteria.playlistSearchQuery)}`;

    const playlistResponse = await fetch(playlistSearchUrl);
    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlists from Deezer');
    }

    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.data?.[0]?.id;

    if (!playlistId) {
      return NextResponse.json({ error: 'Could not find a suitable playlist for this mood.' }, { status: 404 });
    }

    // 3. Get all the tracks from the found playlist.
    const tracksUrl = `https://api.deezer.com/playlist/${playlistId}/tracks`;
    const tracksResponse = await fetch(tracksUrl);
    if (!tracksResponse.ok) {
      throw new Error(`Failed to fetch tracks for playlist ID: ${playlistId}`);
    }

    const tracksData = await tracksResponse.json();

    // 4. Format the track data into our clean, consistent `Track` interface.
    // We also filter out any tracks that don't have a 30-second preview.
    const responseTracks: Track[] = tracksData.data
      .filter((track: any) => track.preview) // Ensure the track has a preview URL
      .map((track: any) => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        albumArt: track.album.cover_medium, // Deezer provides multiple album art sizes
        previewUrl: track.preview,
      }))
      .slice(0, 25); // Limit the final result to 25 tracks

    return NextResponse.json(responseTracks, { status: 200 });

  } catch (error: any) {
    console.error('--- Deezer API Error ---', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
// /app/api/songs/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import SpotifyWebApi from 'spotify-web-api-node';
//
// // --- TYPE DEFINITIONS ---
// export interface Track {
//   id: number; // Deezer ID
//   title: string;
//   artist: string;
//   album: string;
//   albumArt: string | undefined;
//   previewUrl: string | null;
//   spotifyUri?: string; // We will add the Spotify URI here!
// }
//
// // --- DEEZER MOOD MAPPING ---
// const moodMap: { [key: string]: { playlistSearchQuery: string } } = {
//   happy: { playlistSearchQuery: 'Happy Hits' },
//   sad: { playlistSearchQuery: 'Sad Songs' },
//   energetic: { playlistSearchQuery: 'Workout Motivation Hits' },
//   calm: { playlistSearchQuery: 'Chill Lo-fi Beats' },
// };
//
// // --- SPOTIFY API SETUP ---
// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
// });
//
// const refreshSpotifyToken = async () => {
//   try {
//     const data = await spotifyApi.clientCredentialsGrant();
//     spotifyApi.setAccessToken(data.body['access_token']);
//     console.log('Spotify access token refreshed!');
//   } catch (err) {
//     console.error('❌ Could not refresh Spotify access token', err);
//     throw new Error('Could not refresh Spotify access token');
//   }
// };
//
// // --- API ROUTE HANDLER ---
// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const mood = searchParams.get('mood');
//
//   if (!mood || !moodMap[mood]) {
//     return NextResponse.json({ error: 'Invalid or missing mood parameter' }, { status: 400 });
//   }
//
//   try {
//     // === STEP 1: GET SONGS FROM DEEZER ===
//     const moodCriteria = moodMap[mood];
//     const playlistSearchUrl = `https://api.deezer.com/search/playlist?q=${encodeURIComponent(moodCriteria.playlistSearchQuery)}`;
//
//     const playlistResponse = await fetch(playlistSearchUrl);
//     const playlistData = await playlistResponse.json();
//     const playlistId = playlistData.data?.[0]?.id;
//
//     if (!playlistId) {
//       return NextResponse.json({ error: 'Could not find a Deezer playlist.' }, { status: 404 });
//     }
//
//     const tracksUrl = `https://api.deezer.com/playlist/${playlistId}/tracks`;
//     const tracksResponse = await fetch(tracksUrl);
//     const tracksData = await tracksResponse.json();
//
//     const deezerTracks = tracksData.data.filter((track: any) => track.preview).slice(0, 25);
//
//     // === STEP 2: "TRANSLATE" TO SPOTIFY URIs ===
//     await refreshSpotifyToken();
//
//     const enrichedTracksPromises = deezerTracks.map(async (deezerTrack: any) => {
//       const query = `track:${deezerTrack.title} artist:${deezerTrack.artist.name}`;
//       const searchResult = await spotifyApi.searchTracks(query, { limit: 1 });
//       const spotifyTrack = searchResult.body.tracks?.items[0];
//
//       return {
//         id: deezerTrack.id,
//         title: deezerTrack.title,
//         artist: deezerTrack.artist.name,
//         album: deezerTrack.album.title,
//         albumArt: deezerTrack.album.cover_medium,
//         previewUrl: deezerTrack.preview,
//         spotifyUri: spotifyTrack ? spotifyTrack.uri : undefined, // Add the URI!
//       };
//     });
//
//     // Wait for all the Spotify searches to complete
//     const responseTracks: Track[] = (await Promise.all(enrichedTracksPromises))
//       // Filter out any songs that couldn't be found on Spotify
//       .filter(track => track.spotifyUri);
//
//     return NextResponse.json(responseTracks, { status: 200 });
//
//   } catch (error: any) {
//     console.error('--- Full Error in API Route ---', error);
//     const errorMessage = error.body?.error?.message || error.message || 'An unexpected error occurred.';
//     const errorStatus = error.statusCode || 500;
//     return NextResponse.json({ error: errorMessage }, { status: errorStatus });
//   }
// }
