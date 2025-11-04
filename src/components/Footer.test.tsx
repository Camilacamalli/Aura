import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

test("It renders the footer", () => {
  render(<Footer />);
  expect(screen.getByRole('contentinfo')).not.toThrow();
})
