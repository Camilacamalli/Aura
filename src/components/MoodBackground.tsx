import VerySadBackground from "@/components/animations/VerySadBackground"

type MoodBackgroundProps = {
  mood?: string
};

const DefaultBackground = () => <div data-testid="mood-background-default"></div>;

const HappyBackground = () => <div data-testid="mood-background-happy"></div>

const moodMap: { [key: string]: React.ReactElement } = {
  'very sad': <VerySadBackground />,
  happy: <HappyBackground />
}

export default function MoodBackground({ mood }: MoodBackgroundProps) {
  const BackgroundComponent = mood ? moodMap[mood] : null;
  return BackgroundComponent || <DefaultBackground />
}
