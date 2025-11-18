export default function VerySadBackground() {
  return (
    <div data-testid="mood-background-very-sad" className="absolute inset-0 -z-10">
      <div className="w-full h-full bg-gray-200 opacity-50">
        <div data-testid="raindrops-container">
          <div data-testid="raindrop"></div>
          <div data-testid="raindrop"></div>
        </div>
      </div>
    </div>
  )
}

