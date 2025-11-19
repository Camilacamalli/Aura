"use client"

type Props = {
  mood: string;
}

export default function MoodBackground({ mood }: Props) {
  if (mood !== 'sad') return null;

  return (
    <div data-testid="rain-bg"></div>
  )
} 
