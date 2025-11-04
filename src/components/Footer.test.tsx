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

  describe("It displays...", () => {

    test("...the copyright notice with the current year", () => {
      const currentYear = new Date().getFullYear();
      const copyrightRegex = new RegExp(`© ${currentYear} Aura. All Rights Reserved.`, 'i');
      expect(within(footer).getByText(copyrightRegex))
    })

    test("...a link to the Privacy Policy", () => {
      const linkElement = screen.getByRole('link', { name: /Privacy Policy/i });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '/privacy-policy');
    })

    test("...a link to the Terms of Service", () => {
      const linkElement = screen.getByRole('link', { name: /Terms of Service/i });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '/terms-of-service');
    })

  })

})

test("Footer displays a disclaimer about not being affiliated with Spotify", () => {
  render(<Footer />);
  expect(screen.getByText(/Not affiliated with or endorsed by Spotify/i)).toBeInTheDocument();
})

