const moodOptions = [
  { label: 'Very Sad' },
  { label: 'Sad' },
  { label: 'Neutral' },
  { label: 'Happy' },
  { label: 'Very Happy' }
]


export default function MoodSelector() {
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
          <button key={i} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
