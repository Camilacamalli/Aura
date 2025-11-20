"use client"

type Props = {
  mood: string;
}

export default function MoodBackground({ mood }: Props) {
  if (mood !== "sad") return null

  return (
    <div
      data-testid="rain-bg"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-gray-700 via-gray-600 to-black"
    >
      <div className="rain-layer rain-small" />

      <div className="rain-layer rain-medium" />

      <div className="rain-layer rain-large" />
    </div>
  );
} 
