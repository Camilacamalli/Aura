import { test, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoodBackground from '@/components/MoodBackground';

describe("MoodBackground", () => {

  test("renders rain effect when mood is sad", () => {
    render(<MoodBackground mood="sad" />);
    expect(screen.getByTestId('rain-bg')).toBeInTheDocument();
  })

  test("renders nothing when mood is not sad", () => {
    render(<MoodBackground mood="happy" />);
    expect(screen.queryByTestId('rain-bg')).not.toBeInTheDocument();
  })
})
