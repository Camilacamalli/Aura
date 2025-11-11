import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import MoodVisualizer from '@/components/MoodVisualizer';
import * as navigation from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';

vi.mock('next/navigation');

const mockFetch = vi.fn();
global.fetch = mockFetch;

test("MoodVisualizer displays a loading indicator on render", () => {
  const mockSearchParams = new URLSearchParams({ mood: 'happy' });
  vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
  render(<MoodVisualizer />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
})

test("MoodVisualizer displays recommended songs when data is fetched successfully", async () => {
  const mockSong = [
    {
      id: 1001,
      title: 'Walking on Sunshine',
      artist: 'Katrina & The Waves',
      album: 'Katrina & The Waves',
      albumArt: 'http://example.com/sunshine.jpg',
      previewUrl: 'http://example.com/sunshine.mp3'
    },
    {
      id: 1002,
      title: 'Happy',
      artist: 'Pharrell Williams',
      album: 'G I R L',
      albumArt: 'http://example.com/happy.jpg',
      previewUrl: 'http://example.com/happy.mp3'
    },
  ]
  mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) });
  const mockSearchParams = new URLSearchParams({ mood: 'happy' });
  vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
  render(<MoodVisualizer />);

  await expect(screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 })).resolves.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: new RegExp(mockSong[1].title, 'i'), level: 2 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /songs to feel happy/i })).toBeInTheDocument();
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
})

