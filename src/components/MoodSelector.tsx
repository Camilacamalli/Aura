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
    </div>
  )
}
