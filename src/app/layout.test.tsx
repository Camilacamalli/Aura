import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
