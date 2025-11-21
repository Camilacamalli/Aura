"use client"

import React from 'react';
import RainEffect from '@/animations/RainEffect';
import HappyEffect from '@/animations/HappyEffect';
import VeryHappyEffect from '@/animations/VeryHappyEffect';
import NeutralEffect from '@/animations/NeutralEffect';

type Props = {
  mood: string;
}

const moodConfig: Record<string, { gradient: string, component: React.ReactNode, id: string }> = {
  'sad': {
    gradient: "bg-gradient-to-b from-gray-400 via-gray-400 to-gray-700",
    component: <RainEffect isHeavy={false} />,
    id: "rain-bg"
  },
  'very sad': {
    gradient: "bg-gradient-to-b from-gray-600 via-gray-700 to-black",
    component: <RainEffect isHeavy={true} />,
    id: "rain-bg"
  },
  'happy': {
    gradient: "bg-gradient-to-b from-yellow-200 via-orange-200 to-rose-300",
    component: <HappyEffect />,
    id: "happy-bg"
  },
  'very happy': {
    gradient: "bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-300",
    component: <VeryHappyEffect />,
    id: "euphoria-bg"
  },
  'neutral': {
    gradient: "bg-gradient-to-b from-emerald-100 via-teal-100 to-cyan-100",
    component: <NeutralEffect />,
    id: "neutral-bg"
  }
}

export default function MoodBackground({ mood }: Props) {
  const config = moodConfig[mood];

  return (
    <div data-testid={config.id} className={`fixed inset-x-0 bottom-0 top-0 pointer-events-none z-0 overflow-hidden ${config.gradient}`}>
      {config.component}
    </div>
  )
} 
