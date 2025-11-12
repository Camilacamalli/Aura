"use client";

import Image from 'next/image';
import { useState, useRef } from 'react';

const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>

const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" /></svg>

type Song = {
  id: number,
  title: string,
  artist: string,
  album: string,
  albumArt: string,
  previewUrl: string | null
}

export default function SongCard({ song }: { song: Song }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }

  return (
    <article className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1'>
      <div className="relative group p-5 rounded-full">
        <Image
          src={song.albumArt}
          alt={`Album art for ${song.title}`}
          width={150}
          height={150}
          className="w-full aspect-square rounded-lg object-cover"
        />
        <div>
          <div className='className="p-5"'>
            <h2 className="font-bold text-xl text-emerald-800 truncate">{song.title}</h2>
            <p className="text-md text-gray-600 mt-1">{song.artist}</p>
          </div>
          {song.previewUrl && <audio ref={audioRef} src={song.previewUrl} />}
          <button onClick={togglePlayPause} aria-label={isPlaying ? "Pause Preview" : "Play Preview"} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-40 focus:opacity-40">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
    </article>
  )
}
