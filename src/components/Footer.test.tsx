import { test, describe, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Footer from '@/components/Footer';

describe("Footer component", () => {

  let footer: HTMLElement;

  beforeEach(() => {
    render(<Footer />)
    footer = screen.getByRole('contentinfo');
  })

  test("It renders the footer element", () => {
    expect(footer).toBeInTheDocument();
  })

  test("It displays the copyright notice with the current year", () => {
    const currentYear = new Date().getFullYear();
    const copyrightRegex = new RegExp(`© ${currentYear} Aura. All Rights Reserved.`, 'i');
    expect(within(footer).getByText(copyrightRegex))
  })

  test("It displays links to the Privacy Policy", () => {
    expect(screen.getByRole('link', { name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Privacy Policy/i})).toHaveAttribute('href', '/privacy-policy')
  })

})


