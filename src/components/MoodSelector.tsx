"use client";

import { useState } from 'react';

const moodOptions = [
  { label: 'Very Sad' },
  { label: 'Sad' },
  { label: 'Neutral' },
  { label: 'Happy' },
  { label: 'Very Happy' }
]


export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const today = new Date();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(today)

  return (
    <div>
      <h1>What is your mood today?</h1>
      <p>{formattedDate}</p>
      <h2>Select your Mood:</h2>
      <div className="flex flex-row">
        {moodOptions.map((mood, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSelectedMood(mood.label)}>
            {/* <div className="w-16 h-16 bg-gray-200 rounded-full"></div> */}
            <span>{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div>
          <h3>You are feeling {selectedMood}</h3>
          <p>What would you like to do next?</p>
          <div>
            <button>Stay in the mood</button>
            <button>Change mood</button>
          </div>
        </div>
      )}

    </div>
  )
}
