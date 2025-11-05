import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';

import RootLayout from './layout';
import * as navigation from 'next/navigation';

vi.mock('next/navigation');

describe("RootLayout...", () => {

  beforeEach(() => {
    vi.mocked(navigation.usePathname).mockReturnValue('/');

    render(
      <RootLayout>
        <div>Welcome to Homepage</div>
      </RootLayout>
    )
  })

  afterEach(() => {
    vi.resetAllMocks();
  })

  test("...renders the Header component with homepage content when displaying in homepage", () => {
    expect(() => screen.getByRole('heading', { name: /MoodSelector/i })).not.toThrow();
    expect(() => screen.getByText(/Welcome to Homepage/i)).not.toThrow();
  })

  test("...renders the Footer component with footer content", () => {
    expect(within(screen.getByRole('contentinfo')).getByText(/Aura. All Rights Reserved./i))
  })
})


