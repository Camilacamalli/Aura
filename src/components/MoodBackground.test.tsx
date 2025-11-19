import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoodBackground from '@/components/MoodBackground';

test("MoodBackground renders rain effect when mood is sad", () => {
  render(<MoodBackground mood="sad" />);
  expect(screen.getByTestId('rain-bg')).toBeInTheDocument();
})


