"use client"

import MoodSelector from "@/components/MoodSelector";
import { useState, useEffect } from 'react';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import { Track } from '@/app/api/songs/route';

export default function Home() {
  // --- AUTHENTICATION STATE ---
  // In a real app, this would come from your OAuth login flow
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null);

  // --- APP STATE ---
  const [songs, setSongs] = useState<Track[]>([]);
  const [currentTrackUri, setCurrentTrackUri] = useState<string | null>(null);

  // Example: Fetch songs from our own API when a mood is selected
  const fetchSongs = async (mood: string) => {
    const response = await fetch(`/api/songs?mood=${mood}`);
    const data: Track[] = await response.json();
    setSongs(data);
  };

  // This would be called after your Spotify login flow is successful
  useEffect(() => {
    // For demonstration, let's assume the token is fetched or set here
    // e.g., setSpotifyToken(getStoredToken());
  }, []);


  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start" >
      <MoodSelector />
      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} className="song-item">
            <p>{song.title} by {song.artist}</p>
            {/* When this button is clicked, it sets the track to be played */}
            <button onClick={() => setCurrentTrackUri(song.spotifyUri || null)}>
              Play Full Song
            </button>
          </div>
        ))}
      </div>

      {/* The Player component is always rendered. It activates when it gets a token. */}
      <SpotifyPlayer
        accessToken={spotifyToken}
        trackUriToPlay={currentTrackUri}
      />
    </main >
  );
}
