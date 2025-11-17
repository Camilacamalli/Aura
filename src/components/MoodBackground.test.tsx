import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoodBackground from '@/components/MoodBackground';

test("MoodBackground renders a default background when no mood is provided", () => {
  render(<MoodBackground />);
  expect(screen.getByTestId('mood-background-default')).toBeInTheDocument();
})

test("MoodBackground renders a very-sad background when mood is 'very sad'", () => {
  render(<MoodBackground mood="very sad" />);

  expect(screen.getByTestId("mood-background-very-sad")).toBeInTheDocument()
})

