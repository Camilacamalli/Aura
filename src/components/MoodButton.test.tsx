import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import MoodButton from '@/components/MoodButton';

test("MoodButton renders the mood's image and label", () => {
  const mockMood = { label: 'Happy', emoji: '/emojis/happy.pgn' };
  const mockOnClick = vi.fn();
  render(<MoodButton mood={mockMood} onClick={mockOnClick} />)
  expect(screen.getByText(/happy/i)).toBeInTheDocument();
  expect(screen.getByAltText(/happy/i)).toBeInTheDocument();
})
