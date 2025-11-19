import { render, screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import MoodVisualizer from '@/components/MoodVisualizer';
import * as navigation from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation');

const mockFetch = vi.fn();
global.fetch = mockFetch;

const playMock = vi.fn();
const pauseMock = vi.fn();

window.HTMLMediaElement.prototype.play = playMock;
window.HTMLMediaElement.prototype.pause = pauseMock;

describe("MoodVisualizer", () => {

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

  describe("It displays...", () => {

    test.todo("...a loading indicator on render", () => {
      mockFetch.mockReturnValue(new Promise(() => { }))
      render(<MoodVisualizer />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    })

    test("...a skeleton loader on render", () => {
      mockFetch.mockReturnValue(new Promise(() => { }));
      render(<MoodVisualizer />);
      const skeletons = screen.getAllByTestId('skeleton-loader');
      expect(skeletons.length).toBeGreaterThanOrEqual(4);
      expect(screen.queryByText(/loading music/i)).not.toBeInTheDocument();
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

  test("When I click a second song to listen, the first song should pause", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) });
    render(<MoodVisualizer />);
    const playButtons = await screen.findAllByRole('button', { name: /play preview/i });
    await userEvent.click(playButtons[0]);
    expect(playMock).toHaveBeenCalledTimes(1);

    playMock.mockClear();
    pauseMock.mockClear();

    await userEvent.click(playButtons[1]);
    expect(playMock).toHaveBeenCalledTimes(1);
    expect(pauseMock).toHaveBeenCalledTimes(1);
  });

});
