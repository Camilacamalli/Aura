import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoodBackground from '@/components/MoodBackground';

test("MoodBackground renders a default background when no mood is provided", () => {
  render(<MoodBackground />);
  expect(screen.getByTestId('mood-background-default')).toBeInTheDocument();
})

