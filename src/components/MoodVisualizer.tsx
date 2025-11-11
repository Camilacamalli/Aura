"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import SongCard from '@/components/SongCard';

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string | null;
};

export default function MoodVisualizer() {
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');
  const [loading, setLoading] = useState(!!mood);
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);


  const capitalizedMood = mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : '';

  useEffect(() => {

    if (!mood) {
      return
    }

    const fetchSongs = async () => {
      const response = await fetch(`/api/songs?mood=${mood}`);

      if (response.ok) {
        const data: Song[] = await response.json();
        setSongs(data);
      } else {
        setError("Oops! We couldn't find your songs")
      }

      setLoading(false);
    }
    fetchSongs();
  }, [mood]);


  if (loading) {
    return <div>Loading music for you...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (songs.length === 0) {
    return (
      <section>
        <p>We couldn&apos;t find any songs for this mood right now. Try another!</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Songs to feel {capitalizedMood}</h1>
      <div>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  )
}
