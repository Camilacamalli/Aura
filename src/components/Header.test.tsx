import { describe, test, expect, vi } from 'vitest';
import * as navigation from 'next/navigation';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

vi.mock('next/navigation');

describe('Header component behaviour', () => {

  test("It renders a header element", () => {
    render(<Header />);
    expect(() => screen.getByRole("banner")).not.toThrow();
  })

  test("It displays the title MoodSelector when on the homepage", () => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');
    render(<Header />);
    const titleElement = screen.getByRole('heading', { name: /MoodSelector/i });
    expect(() => titleElement).not.toThrow();
  })

})
