import Image from 'next/image'

export default function MoodButton({ mood, onClick }) {
  return (
    <button>
      <Image src={mood.emoji} alt={mood.label} width={100} height={100} />
      <span>{mood.label}</span>
    </button>
  )
}
