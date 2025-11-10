import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import MoodVisualizer from '@/components/MoodVisualizer';
import * as navigation from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';

vi.mock('next/navigation');

const mockFetch = vi.fn();
global.fetch = mockFetch;

test("MoodVisualizer displays a loading indicator on render", () => {
  const mockGet = vi.fn().mockReturnValue('happy');
  const mockSearchParams = new URLSearchParams({ mood: 'happy' });
  vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
  render(<MoodVisualizer />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
})
