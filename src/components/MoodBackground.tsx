type MoodBackgroundProps = {
  mood?: string
};

const DefaultBackground = () => <div data-testid="mood-background-default"></div>;
const VerySadBackground = () => <div data-testid="mood-background-very-sad"></div>;
const HappyBackground = () => <div data-testid="mood-background-happy"></div>

const moodMap = {
  'very sad': <VerySadBackground />,
  happy: <HappyBackground />
}

export default function MoodBackground({ mood }: MoodBackgroundProps) {
  const BackgroundComponent = mood ? moodMap[mood] : null;
  return BackgroundComponent || <DefaultBackground />
}
