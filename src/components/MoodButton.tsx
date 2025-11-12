import Image from 'next/image'

type Mood = {
  label: string,
  emoji: string
}

type MoodButtonProps = {
  mood: Mood,
  onClick: () => void
}

export default function MoodButton({ mood, onClick }: MoodButtonProps) {
  return (
    <button
      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      onClick={onClick}
      aria-label={mood.label}>
      <div><Image src={mood.emoji} alt={mood.label} width={100} height={100} /></div>
      <span className="font-medium text-gray-600">{mood.label}</span>
    </button>
  )
}
