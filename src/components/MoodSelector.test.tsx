import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import MoodSelector from '@/components/MoodSelector'

describe("MoodSelector component", () => {

  beforeEach(() => {
    render(<MoodSelector />)
  })

  test("It renders a heading with 'What is your Mood today?'", () => {
    expect(screen.getByRole('heading', { name: /What is your Mood today?/i })).toBeInTheDocument();
  });

  test("It displays the current date formatted as 'Weekday, Month Day' ", () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-10-30T10:00:00Z');
    vi.setSystemTime(mockDate);
    render(<MoodSelector />);
    expect(screen.getByText('Thursday, October 30')).toBeInTheDocument();
    vi.useRealTimers();
  });

  test("It displays a welcome description of the app", () => {
    expect(screen.getByText(/Select your mood to get personalized songs recommendation!/i)).toBeInTheDocument();
  })

  test("It renders the 'Select your Mood:' prompt", () => {
    expect(screen.getByText(/Select your Mood:/i)).toBeInTheDocument()
  })

  test("It displays five mood selection buttons", () => {
    const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];
    moodLabels.forEach(label => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    })
  })

  test("It displays a confirmation step after a mood is selected", async () => {
    const sadButton = screen.getByRole('button', { name: /^Sad$/i });
    await userEvent.click(sadButton);
    expect(screen.getByRole('heading', { name: /You are feeling Sad/i })).toBeInTheDocument();
    expect(screen.getByText(/What kind of music would you like?/i))
    expect(screen.getByRole('button', { name: /Songs to match my mood/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Songs to change my mood/i })).toBeInTheDocument();
  });

});



