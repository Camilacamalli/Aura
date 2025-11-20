"use client"

type Props = {
  mood: string;
}

export default function MoodBackground({ mood }: Props) {
  const isSad = mood === 'sad';
  const isVerySad = mood === 'very sad';
  const isHappy = mood === 'happy';

  if (!isSad && !isVerySad && !isHappy) return null

  if (isSad || isVerySad) {

    return (
      <div
        data-testid="rain-bg"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-gray-700 via-gray-600 to-black"
      >
        {isVerySad && <div className="lightning-layer" />}
        <div className={`rain-layer rain-small ${isVerySad ? 'rain-heavy' : ''}`} style={{ animationDuration: isVerySad ? '0.5s' : '1.2s' }} />

        <div className={`rain-layer rain-medium ${isVerySad ? 'rain-heavy' : ''}`} style={{ animationDuration: isVerySad ? '0.8s' : '1.5s' }} />

        <div className={`rain-layer rain-large ${isVerySad ? 'rain-heavy' : ''}`} style={{ animationDuration: isVerySad ? '1.5s' : '2.5s' }} />
      </div>
    );
  }

  if (isHappy) {
    return (
      <div
        data-testid="happy-bg"
        // Yellow -> Orange -> Pinkish warm gradient
        className="fixed inset-x-0 bottom-0 top-[65px] pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-yellow-200 via-orange-200 to-rose-300"
      >
        {/* Layer 1: Tiny fast sparkles */}
        <div className="happy-layer sparkle-small" />

        {/* Layer 2: Medium floating bubbles */}
        <div className="happy-layer sparkle-medium" />

        {/* Layer 3: Large slow bokeh lights */}
        <div className="happy-layer sparkle-large" />
      </div>
    )
  }
  return null
} 
