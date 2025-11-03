import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Home from './page';

describe("Home...", () => {
  test("...renders the MoodSelector component", () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /What is your mood today?/i })).toBeInTheDocument();
  });
});
