import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as navigation from 'next/navigation';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

vi.mock('next/navigation');

describe('Header component behaviour', () => {

  beforeEach(() => {
    vi.resetAllMocks();
  })

  test("It renders a header element", () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');
    render(<Header />);
    expect(() => screen.getByRole("banner")).not.toThrow();
  })

  test("It displays the title MoodSelector when on the homepage", () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');
    render(<Header />);
    const titleElement = screen.getByRole('heading', { name: /MoodSelector/i });
    expect(() => titleElement).not.toThrow();
  })

  test('It displays the title MoodResults when on the /results page ', () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/results');
    render(<Header />);
    expect(() => screen.getByRole("heading", { name: /MoodResults/i })).not.toThrow();
  })

})
