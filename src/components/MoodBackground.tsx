type MoodBackgroundProps = {
  mood?: string
};

const DefaultBackground = () => <div data-testid="mood-background-default"></div>;

const VerySadBackground = () => (
  <div data-testid="mood-background-very-sad" className="absolute inset-0 -z-10">
    <div className="w-full h-full bg-gray-200 opacity-50"></div>
  </div>
);

const HappyBackground = () => <div data-testid="mood-background-happy"></div>

const moodMap: { [key: string]: React.ReactElement } = {
  'very sad': <VerySadBackground />,
  happy: <HappyBackground />
}

export default function MoodBackground({ mood }: MoodBackgroundProps) {
  const BackgroundComponent = mood ? moodMap[mood] : null;
  return BackgroundComponent || <DefaultBackground />
}
