import MoodVisualizer from "@/components/MoodVisualizer";
import { Suspense } from 'react';

export default function ResultsPage() {
  return (
    <main>
      <Suspense fallback={
        <div className="flex min-h-screen w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-700"></div>
            <p className="font-bold text-4xl text-emerald-700">Loading page...</p>
          </div>
        </div>
      }>
        <MoodVisualizer />
      </Suspense>
    </main>
  )
}
