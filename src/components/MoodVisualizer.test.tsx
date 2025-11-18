import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import MoodVisualizer from '@/components/MoodVisualizer';
import * as navigation from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';
import MoodBackground from './MoodBackground';

vi.mock('next/navigation');

vi.mock('@/components/MoodBackground', () => ({
  default: vi.fn(({ mood }) => <div data-testid="mock-mood-background">{mood}</div>)
}))

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("MoodVisualizer displays...", () => {

  const mockMood = 'happy'
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

  beforeEach(() => {
    vi.resetAllMocks();
    const mockSearchParams = new URLSearchParams({ mood: mockMood });
    vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
  });

  test("...a loading indicator on render", () => {
    mockFetch.mockReturnValue(new Promise(() => { }))
    render(<MoodVisualizer />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  })

  test("...recommended songs when data is fetched successfully", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) });
    render(<MoodVisualizer />);

    const firstSongTitleElement = screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 })
    await expect(firstSongTitleElement).resolves.toBeInTheDocument();

    const secondSongTitleElement = screen.getByRole('heading', { name: new RegExp(mockSong[1].title, 'i'), level: 2 })
    expect(secondSongTitleElement).toBeInTheDocument();

    const titleElement = screen.getByRole('heading', { name: new RegExp(`songs to feel ${mockMood}`, 'i') });
    expect(titleElement).toBeInTheDocument();

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("...an error message when the data fetch fails", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    render(<MoodVisualizer />);
    const errorMessage = await screen.findByText(/oops! we couldn't find your songs/i);

    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("...a 'no results' message when no songs are found", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    render(<MoodVisualizer />);
    const errorMessage = await screen.findByText(/we couldn't find any songs for this mood/i);

    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByText(/oops!/i)).not.toBeInTheDocument();
  });
});

test("It renders the MoodBackground component with the correct mood", async () => {
  const mockSong = [
    {
      id: 1001,
      title: 'Walking on Sunshine',
      artist: 'Katrina & The Waves',
      album: 'Katrina & The Waves',
      albumArt: 'http://example.com/sunshine.jpg',
      previewUrl: 'http://example.com/sunshine.mp3'
    },
  ]

  vi.resetAllMocks();
  const mockSearchParams = new URLSearchParams({ mood: 'happy' });
  vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
  mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) });
  render(<MoodVisualizer />);
  await screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i') })
  expect(screen.getByTestId("mock-mood-background")).toBeInTheDocument();
  expect(screen.getByTestId("mock-mood-background")).toHaveTextContent('happy')

});
