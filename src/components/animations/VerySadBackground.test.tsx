import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import VerySadBackground from '@/components/animations/VerySadBackground';

describe("VerySadBackground...", () => {

  test("...renders a container to hold the raindrops", () => {
    render(<VerySadBackground />);
    expect(screen.getByTestId('raindrops-container')).toBeInTheDocument();
  });

  test("...renders multiple raindrop elements", () => {
    render(<VerySadBackground />);
    expect(screen.getAllByTestId("raindrop").length).toBeGreaterThan(0);
  });

});
