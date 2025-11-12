import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test } from 'vitest';
import MoodButton from '@/components/MoodButton';

test("MoodButton renders the mood's image and label", () => {
  const mockMood = { label: 'Happy', emoji: '/emojis/happy.pgn' };
  const mockOnClick = vi.fn();
  render(<MoodButton mood={mockMood} onClick={mockOnClick} />)
  expect(screen.getByText(/happy/i)).toBeInTheDocument();
  expect(screen.getByAltText(/happy/i)).toBeInTheDocument();
})

test("It calls the onClick handler when the button is clicked", async () => {
  const mockMood = { label: 'Happy', emoji: '/emojis/happy.png' };
  const mockOnClick = vi.fn();
  render(<MoodButton mood={mockMood} onClick={mockOnClick} />);

  const button = screen.getByRole('button', { name: /Happy/i });
  await userEvent.click(button);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
})
