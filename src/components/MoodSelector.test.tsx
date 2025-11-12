import { render, screen, within } from '@testing-library/react';
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

  describe("After the user selects its mood...", () => {

    let sadButton: HTMLElement;
    const mockPush = vi.fn();

    beforeEach(async () => {
      vi.resetAllMocks();
      vi.mocked(navigation.useRouter).mockReturnValue({ push: mockPush } as any);
      render(<MoodSelector />)
      sadButton = screen.getByRole('button', { name: /^Sad$/i });
      await userEvent.click(sadButton);
    });

    test("...it displays a confirmation step", async () => {
      expect(screen.getByRole('heading', { name: /You are feeling Sad/i })).toBeInTheDocument();
      expect(screen.getByText(/What kind of music would you like?/i))
      expect(screen.getByRole('button', { name: /Songs to match my mood/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Songs to change my mood/i })).toBeInTheDocument();
    });

    test("...it displays a modal after the user selects to change its mood", async () => {
      const changeMoodButton = screen.getByRole('button', { name: /songs to change my mood/i });
      await userEvent.click(changeMoodButton);
      expect(screen.getByRole('heading', { name: /how would you like to feel?/i })).toBeInTheDocument();
    });

    test("...and selects to change it, it replaces the initial view with the other moods to select a new one", async () => {
      const changeMoodButton = screen.getByRole('button', { name: /songs to change my mood/i });
      await userEvent.click(changeMoodButton);
      const changeMoodSection = screen.getByRole('heading', { name: /how would you like to feel?/i }).parentElement;
      expect(within(changeMoodSection!).getByRole('button', { name: /^very sad$/i })).toBeInTheDocument();
      expect(within(changeMoodSection!).getByRole('button', { name: /^neutral$/i })).toBeInTheDocument();
      expect(within(changeMoodSection!).getByRole('button', { name: /^Happy$/i })).toBeInTheDocument();
      expect(within(changeMoodSection!).getByRole('button', { name: /^Very Happy$/i })).toBeInTheDocument();
      expect(within(changeMoodSection!).queryByRole('button', { name: /^Sad$/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /what is your mood today/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /songs to match my mood /i })).not.toBeInTheDocument();
    })

    test("...it natigates to the results page with the correct mood", async () => {
      const matchMoodButton = await screen.findByRole('button', { name: /songs to match my mood/i });
      await userEvent.click(matchMoodButton);
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/results?mood=sad');
    });
  })
});

test("It navigates with the new mood after choosing to change mood", async () => {
  render(<MoodSelector/>)
  const mockPush = vi.mocked(navigation.useRouter().push);
  const sadButton = screen.getByRole('button', { name: /^sad$/i });
  await userEvent.click(sadButton)
  const changeMoodButton = screen.getByRole('button', { name: /songs to change my mood/i });
  await userEvent.click(changeMoodButton);
  const happyButton = screen.getByRole('button', { name: /^happy$/i });
  await userEvent.click(happyButton);
  expect(mockPush).toHaveBeenCalledWith('/results?mood=happy');
})
