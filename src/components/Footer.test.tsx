import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

test("It renders the footer", () => {
  render(<Footer />);
  expect(screen.getByRole('contentinfo')).not.toThrow();
})

test("It displays the copyright notice with the current year", () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  const copyrightRegex = new RegExp(`© ${currentYear} Aura. All Rights Reserved.`, 'i');
  expect(screen.getByText(copyrightRegex)).toBeInTheDocument();
})
