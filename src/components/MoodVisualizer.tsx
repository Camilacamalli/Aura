"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import SongCard from '@/components/SongCard';
import MoodBackground from '@/components/MoodBackground';

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
    return (
      <div className="flex min-h-screen w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-700"></div>
          <p className="font-bold text-4xl text-emerald-700">
            Loading music for you...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="flex min-h-screen w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">{error}</div>
  }

  if (songs.length === 0) {
    return (
      <section className="flex min-h-screen w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">
        <p className="font-bold text-4xl text-emerald-700">We couldn&apos;t find any songs for this mood right now. Try another!</p>
      </section>
    )
  }

  return (
    <section className="relative isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <MoodBackground mood={mood} />
      <div className="flex flex-col justify-between gap-3 py-8">
        <h1 className="font-bold text-4xl">Songs to feel {capitalizedMood}</h1>
        <p>Here are some tracks we think you&apos;ll love.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 grid-auto-rows-fr">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  )
}
