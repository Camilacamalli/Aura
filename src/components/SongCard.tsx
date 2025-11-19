"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { Song } from '@/types/types';

const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>

const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" /></svg>

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function SongCard({ song, isPlaying, onToggle }: SongCardProps) {

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <article
      data-testid="song-card"
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden transform flex flex-col h-full ${isPlaying ? 'ring-4 ring-emerald-600' : 'hover:shadow-2xl hover:-translate-y-1'}`}>
      <div className="relative group">
        <Image
          src={song.albumArt}
          alt={`Album art for ${song.title}`}
          width={300}
          height={300}
          className="w-full aspect-square object-cover"
        />

        {song.previewUrl && (
          <button
            onClick={onToggle}
            aria-label={isPlaying ? "Pause Preview" : "Play Preview"}
            className="absolute inset-0 flex items-center justify-center bg-black text-white transition-opacity duration-300 opacity-0 group-hover:opacity-60 focus:opacity-60"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="font-bold text-xl text-emerald-800 truncate">
            {song.title}
          </h2>
          <p className="text-md text-gray-600 mt-1 truncate">
            {song.artist}
          </p>
        </div>
      </div>

      {song.previewUrl && <audio ref={audioRef} src={song.previewUrl} onEnded={onToggle} />}
    </article>
  )
}
