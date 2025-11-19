export default function MoodBackground({ mood }) {
  if (mood !== 'sad') return null;

  return (
    <div data-testid="rain-bg"></div>
  )
} 
