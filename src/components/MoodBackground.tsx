type MoodBackgroundProps = {
  mood?: string
};

export default function MoodBackground({ mood }: MoodBackgroundProps) {
  if (mood === 'very sad') {
    return (
      <div data-testid="mood-background-very-sad"></div>
    )
  }
  return (
    <div data-testid="mood-background-default"></div>
  )
}
