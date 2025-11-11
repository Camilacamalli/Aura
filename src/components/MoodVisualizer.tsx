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

  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');

  const capitalizedMood = mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : '';

  useEffect(() => {

    if (!mood) {
      setLoading(false);
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
