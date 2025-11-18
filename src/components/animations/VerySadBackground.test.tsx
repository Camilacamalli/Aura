import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import VerySadBackground from '@/components/animations/VerySadBackground';

test("It renders a container to hold the raindrops", () => {
  render(<VerySadBackground />);
  expect(screen.getByTestId('raindrops-container')).toBeInTheDocument();
})

