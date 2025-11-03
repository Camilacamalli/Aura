import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import MoodSelector from '@/components/MoodSelector'

test("It renders a heading with 'What is your Mood today?'", () => {
  render(<MoodSelector />)
  expect(screen.getByRole('heading', { name: /What is your Mood today?/i })).toBeInTheDocument();
})
