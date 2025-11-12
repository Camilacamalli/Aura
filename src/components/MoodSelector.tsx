"use client";

import { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const moodOptions = [
  { label: 'Very Sad', emoji: '/emojis/crying.png' },
  { label: 'Sad', emoji: '/emojis/tired.png' },
  { label: 'Neutral', emoji: '/emojis/rolling-eyes.png' },
  { label: 'Happy', emoji: '/emojis/smiling-face.png' },
  { label: 'Very Happy', emoji: '/emojis/grinning.png' }
]

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isChangingMood, setIsChangingMood] = useState(false);
  const router = useRouter();

  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(today)

  const handleShowSongs = (mood: string) => {
    if (!selectedMood) return
    router.push(`/results?mood=${mood.toLowerCase()}`);
  }


  if (isChangingMood && selectedMood) {
    return (
      <div>
        <h2 className='mt-8 text-4xl font-bold text-emerald-700'>How would you like to feel?</h2>
        <h2 className='mt-8 text-2xl'>Select a new mood:</h2>
        <div className="mt-6 flex justify-center gap-4 md:gap-8">
          {
            moodOptions.filter((mood) => mood.label !== selectedMood)
              .map((mood, i) => (
                <button
                  key={i}
                  aria-label={mood.label} onClick={() => handleShowSongs(mood.label)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div><Image src={mood.emoji} alt={mood.label} width={100} height={100} /> </div>
                  <span>{mood.label}</span>
                </button>
              ))
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-4xl font-bold'>What is your mood today?</h1>
      <p className='mt-2 text-lg font-medium text-gray-500'>{formattedDate}</p>
      <h2 className='mt-8 text-2xl font-bold text-emerald-700'>Select your Mood to get personalized songs recommendation!</h2>
      <div className="mt-6 flex justify-center gap-4 md:gap-8">
        {moodOptions.map((mood, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSelectedMood(mood.label)}
            aria-label={mood.label}>
            <div><Image src={mood.emoji} alt={mood.label} width={100} height={100} /></div>
            <span className="font-medium text-gray-600">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-10 p-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold">You are feeling {selectedMood}</h3>
          <p className="mt-2 text-gray-600">What kind of music would you like?</p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="h-10 px-6 font-semibold rounded-full bg-emerald-700 text-white"
              onClick={() => handleShowSongs(selectedMood)}
            >Songs to match my mood</button>
            <button
              className="h-10 px-6 font-semibold rounded-full border border-gray-300 text-emerald-700"
              onClick={() => setIsChangingMood(true)}
            >Songs to change my mood</button>
          </div>
        </div>
      )}
    </div >
  )
}
