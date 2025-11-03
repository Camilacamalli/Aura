import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import MoodSelector from '@/components/MoodSelector'

test("It renders a heading with 'What is your Mood today?'", () => {
  render(<MoodSelector />)
  expect(screen.getByRole('heading', { name: /What is your Mood today?/i })).toBeInTheDocument();
})

test("It displays the current date formatted as 'Weekday, Month Day' ", () => {
  vi.useFakeTimers();
  const mockDate = new Date('2025-10-30T10:00:00Z');
  vi.setSystemTime(mockDate);

  render(<MoodSelector />);
  expect(screen.getByText('Thursday, October 30')).toBeInTheDocument();
  vi.useRealTimers();
})
