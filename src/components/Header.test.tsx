import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as navigation from 'next/navigation';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

vi.mock('next/navigation');

describe('Header component behaviour', () => {

  beforeEach(() => {
    vi.resetAllMocks();
  })

  test('It renders a header element', () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  })

  test('It displays the app logo', () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');
    render(<Header />);
    expect(screen.getByAltText(/Aura logo/i)).toBeInTheDocument();
  })

  describe('When on the homepage...', () => {

    beforeEach(() => {
      vi.mocked(navigation.usePathname).mockReturnValue('/');
      render(<Header />)
    })

    test('...it displays the title MoodSelector', () => {
      expect(screen.getByRole('heading', { name: /MoodSelector/i })).toBeInTheDocument();
    })

    test('...it displays the How to use Aura button', () => {
      expect(screen.getByRole('button', { name: /How to use Aura/i })).toBeInTheDocument();
    })

  })

  describe('When on /results page...', () => {

    beforeEach(() => {
      vi.mocked(navigation.usePathname).mockReturnValue('/results');
      render(<Header />)
    })

    test('...it displays the title MoodResults', () => {
      expect(screen.getByRole("heading", { name: /MoodResults/i })).toBeInTheDocument();
    })

    test('...it displays a Home button', () => {
      expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    })
  })

})

test("It displays an 'About' link to the footer section", () => {
  vi.mocked(navigation.usePathname).mockReturnValue('/');

  render(<Header />);
  expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute('href', '#about-section')
})
