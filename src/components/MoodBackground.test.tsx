import { test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import MoodBackground from '@/components/MoodBackground';

describe("MoodBackground...", () => {

  test("...renders a default background when no mood is provided", () => {
    render(<MoodBackground />);

    expect(screen.getByTestId('mood-background-default')).toBeInTheDocument();
  });

  test("...renders a very-sad background when mood is 'very sad'", () => {
    render(<MoodBackground mood="very sad" />);

    expect(screen.getByTestId("mood-background-very-sad")).toBeInTheDocument();
  });

  test("...renders the 'happy' background when mood is 'happy'", () => {
    render(<MoodBackground mood="happy" />);

    expect(screen.getByTestId("mood-background-happy")).toBeInTheDocument();
  });

});



