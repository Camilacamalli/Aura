import MoodVisualizer from "@/components/MoodVisualizer";
import { Suspense } from 'react';

export default function ResultsPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading page...</div>}>
        <MoodVisualizer />
      </Suspense>
    </main>
  )
}
