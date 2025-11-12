import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, describe, expect } from 'vitest';
import MoodButton from '@/components/MoodButton';

describe("MoodButton", () => {

  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    const mockMood = { label: 'Happy', emoji: '/emojis/happy.png' };
    render(<MoodButton mood={mockMood} onClick={mockOnClick} />);
  })

  test("renders the mood's image and label", () => {
    expect(screen.getByText(/happy/i)).toBeInTheDocument();
    expect(screen.getByAltText(/happy/i)).toBeInTheDocument();
  })

  test("calls the onClick handler when the button is clicked", async () => {
    const button = screen.getByRole('button', { name: /Happy/i });
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  })
})
