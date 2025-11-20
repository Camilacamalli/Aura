"use client"
import React from 'react';

type Props = {
  isHeavy: boolean
};

export default function RainEffect({ isHeavy }: Props) {
  const getDuration = (normal: string, fast: string) => isHeavy ? fast : normal;
  const denseClass = isHeavy ? 'rain-heavy' : '';

  return (
    <>
      {isHeavy && <div className="lightning-layer" />}

      <div
        className={`rain-layer rain-small ${denseClass}`}
        style={{ animationDuration: getDuration('1.2s', '0.4s') }}
      />
      <div
        className={`rain-layer rain-medium ${denseClass}`}
        style={{ animationDuration: getDuration('0.9s', '0.5s') }}
      />
      <div
        className={`rain-layer rain-large ${denseClass}`}
        style={{ animationDuration: getDuration('0.7s', '0.5s') }}
      />
    </>
  );
}
