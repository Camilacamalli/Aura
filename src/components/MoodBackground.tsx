type MoodBackgroundProps = {
  mood?: string
};

const DefaultBackground = () => <div data-testid="mood-background-default" />;
const VerySadBackground = () => <div data-testid="mood-background-very-sad" />;

const moodMap = {
  'very sad': <VerySadBackground />,
}

export default function MoodBackground({ mood }: MoodBackgroundProps) {
  const BackgroundComponent = mood ? moodMap[mood] : null;
  return BackgroundComponent || <DefaultBackground />
}
