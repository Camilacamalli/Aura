import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import MoodSelector from '@/components/MoodSelector'
import * as navigation from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}));

describe("MoodSelector component", () => {

  beforeEach(() => {
    vi.resetAllMocks();

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
    vi.useRealTimers();
  });

  test("It renders the 'Select your Mood to get personalized songs recommendation!:' prompt", () => {
    render(<MoodSelector />)
    expect(screen.getByText(/Select your Mood to get personalized songs recommendation!/i)).toBeInTheDocument()
  })

  test("It displays five mood selection buttons", () => {
    const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];
    render(<MoodSelector />)
    moodLabels.forEach(label => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
      expect(screen.getByAltText(label)).toBeInTheDocument();
    })
  })

  test("It displays a confirmation step after a mood is selected", async () => {
    render(<MoodSelector />)
    const sadButton = screen.getByRole('button', { name: /^Sad$/i });
    await userEvent.click(sadButton);
    expect(screen.getByRole('heading', { name: /You are feeling Sad/i })).toBeInTheDocument();
    expect(screen.getByText(/What kind of music would you like?/i))
    expect(screen.getByRole('button', { name: /Songs to match my mood/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Songs to change my mood/i })).toBeInTheDocument();
  });

  test("It natigates to the results page with the correct mood when the user selects it", async () => {
    const user = userEvent.setup();
    const mockPush = vi.fn();
    vi.mocked(navigation.useRouter).mockReturnValue({ push: mockPush } as any);
    render(<MoodSelector />);
    const happyButton = screen.getByRole('button', { name: /^happy$/i });
    await user.click(happyButton);
    const matchMoodButton = await screen.findByRole('button', { name: /songs to match my mood/i });
    await user.click(matchMoodButton);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/results?mood=happy');
  })

});



