"use client"

type Props = {
  mood: string;
}

export default function MoodBackground({ mood }: Props) {
  const isSad = mood === 'sad';
  const isVerySad = mood === 'very sad';

  if (!isSad && !isVerySad) return null

  return (
    <div
      data-testid="rain-bg"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-gray-700 via-gray-600 to-black"
    >
      {isVerySad && <div className="lightning-layer" />}
      <div className={`rain-layer rain-small ${isVerySad ? 'rain-heavy' : ''}`} style={{ animationDuration: isVerySad ? '0.5s' : '1.2s' }} />

      <div className={`rain-layer rain-medium ${isVerySad ? 'rain-heavy' : ''}`} style={{ animationDuration: isVerySad ? '0.8s' : '1.5s' }}  />

      <div className={`rain-layer rain-large ${isVerySad ? 'rain-heavy' : ''}`} style={{ animationDuration: isVerySad ? '1.5s' : '2.5s' }}  />
    </div>
  );
} 
