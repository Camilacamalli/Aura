"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Song } from '@/types/types';
import SongCard from '@/components/SongCard';
import MoodBackground from "./MoodBackground";

export default function MoodVisualizer() {
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');
  const [loading, setLoading] = useState(!!mood);
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [playingSongId, setPlayingSongId] = useState<number | null>(null);

  const capitalizedMood = mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : '';
  const isRainyMood = mood === 'sad' || mood === 'very sad';

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

  const handleSongToggle = (id: number) => {
    if (playingSongId === id) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(id);
    }
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 py-8">
          <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              data-testid="skeleton-loader"
              className="bg-gray-200 rounded-xl h-64 w-full animate-pulse"
            />
          ))}
        </div>
      </section>
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
    <div className={`relative min-h-screen w-full transition-colors duration-500 ${isRainyMood ? 'bg-transparent text-white' : 'bg-gray-100 text-black'}`}>
      <MoodBackground mood={mood || ''} />
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 py-8">
          <h1 className="font-bold text-4xl">Songs to feel {capitalizedMood}</h1>
          <p>Here are some tracks we think you&apos;ll love.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 grid-auto-rows-fr">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={playingSongId === song.id}
              onToggle={() => handleSongToggle(song.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
