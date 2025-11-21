"use client";
import React, { useEffect, useState } from "react";

type Props = {
  isHeavy: boolean;
};

type Drop = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

export default function RainEffect({ isHeavy }: Props) {
  const [staticDrops, setStaticDrops] = useState<Drop[]>([]);
  const [fallingDrops, setFallingDrops] = useState<Drop[]>([]);

  useEffect(() => {
    const staticCount = isHeavy ? 40 : 20;
    const newStatic: Drop[] = [];

    for (let i = 0; i < staticCount; i++) {
      newStatic.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 0.8 + 0.4,
        delay: Math.random() * 5,
        duration: 0,
      });
    }
    setStaticDrops(newStatic);

    const fallCount = isHeavy ? 60 : 30;
    const newFalling: Drop[] = [];

    for (let i = 0; i < fallCount; i++) {
      newFalling.push({
        id: i + 1000,
        left: Math.random() * 100,
        top: -20,
        size: Math.random() * 1.0 + 0.6,
        delay: Math.random() * 15,
        duration: Math.random() * 9 + 3,
      });
    }
    setFallingDrops(newFalling);

  }, [isHeavy]);

  return (
    <div className="glass-container">
      {isHeavy && <div className="lightning-flash" />}

      {staticDrops.map((drop) => (
        <div
          key={drop.id}
          className="water-drop static-drop"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            width: `${drop.size}rem`,
            height: `${drop.size}rem`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}

      {fallingDrops.map((drop) => (
        <div
          key={drop.id}
          className="water-drop falling-drop"
          style={{
            left: `${drop.left}%`,
            width: `${drop.size}rem`,
            height: `${drop.size}rem`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
