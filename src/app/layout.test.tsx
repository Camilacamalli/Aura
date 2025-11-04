import { test, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';

import RootLayout from './layout';
import * as navigation from 'next/navigation';

vi.mock('next/navigation');

test(" The root layout renders the Header component with homepage content when displaying in homepage", () => {
  vi.mocked(navigation.usePathname).mockReturnValue('/');

  const MockHomePage = () => <div>Welcome to Homepage</div>;

  render(
    <RootLayout>
      <MockHomePage />
    </RootLayout>
  )

  expect(() => screen.getByRole('heading', { name: /MoodSelector/i })).not.toThrow();
  expect(() => screen.getByText(/Welcome to Homepage/i)).not.toThrow();
  vi.resetAllMocks();
})

test("RootLayout renders the Footer component with footer content", () => {
  vi.mocked(navigation.usePathname).mockReturnValue('/');

  render(
    <RootLayout>
      <div>Mock Page content</div>
    </RootLayout>
  )

  expect(within(screen.getByRole('contentinfo')).getByText(/Aura. All Rights Reserved./i))
})
