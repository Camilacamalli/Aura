import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import MoodVisualizer from '@/components/MoodVisualizer';
import * as navigation from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';

vi.mock('next/navigation');

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("MoodVisualizer displays...", () => {

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

  test("...a loading indicator on render", () => {
    const mockSearchParams = new URLSearchParams({ mood: 'happy' });
    vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
    mockFetch.mockReturnValue(new Promise(() => { }))
    render(<MoodVisualizer />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  })

  test("...recommended songs when data is fetched successfully", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) });
    const mockSearchParams = new URLSearchParams({ mood: 'happy' });
    vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
    render(<MoodVisualizer />);

    const firstSongTitleElement = screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 })

    await expect(firstSongTitleElement).resolves.toBeInTheDocument();

    const secondSongTitleElement = screen.getByRole('heading', { name: new RegExp(mockSong[1].title, 'i'), level: 2 })

    expect(secondSongTitleElement).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /songs to feel happy/i })).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  })

})


