import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import MoodSelector from '@/components/MoodSelector'

describe("MoodSelector component", () => {

  afterEach(() => {
    vi.useRealTimers();
  })

  test("It renders a heading with 'What is your Mood today?'", () => {
    render(<MoodSelector />)
    expect(screen.getByRole('heading', { name: /What is your Mood today?/i })).toBeInTheDocument();
  });

  test("It displays the current date formatted as 'Weekday, Month Day' ", () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-10-30T10:00:00Z');
    vi.setSystemTime(mockDate);
    render(<MoodSelector />);
    expect(screen.getByText('Thursday, October 30')).toBeInTheDocument();
  });

  test("It renders the 'Select your Mood:' prompt", () => {
    render(<MoodSelector />);
    expect(screen.getByText(/Select your Mood:/i)).toBeInTheDocument()
  })

  test("It displays five mood selection buttons", () => {
    render(<MoodSelector />);
    const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];
    moodLabels.forEach(label => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    })
  })

});



