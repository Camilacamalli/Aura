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

  test("It displays the rain effect when mood is sad", async () => {
    const mockSearchParams = new URLSearchParams({ mood: 'sad' });
    vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) })
    render(<MoodVisualizer />);
    await screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 });
    const rainEffect = screen.getByTestId('rain-bg');
    expect(rainEffect).toBeInTheDocument();
  });

  test("it displays lightning effect when mood is very sad", async () => {
    const mockSearchParams = new URLSearchParams({ mood: 'very sad' });
    vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) })
    render(<MoodVisualizer />);
    await screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 });
    const rainEffect = screen.getByTestId('rain-bg');

    const lightning = rainEffect.querySelector('.lightning-layer');
    expect(lightning).toBeInTheDocument();
  })

  test("It displays happy effect when mood is happy", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) })
    render(<MoodVisualizer />);
    await screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 });
    const happyEffect = screen.getByTestId('happy-bg');
    expect(happyEffect).toBeInTheDocument();
  })

  test("It displays an energetic effect when mood is very happy", async () => {
    const mockSearchParams = new URLSearchParams({ mood: 'very happy' });
    vi.mocked(navigation.useSearchParams).mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSong) })
    render(<MoodVisualizer />);
    await screen.findByRole('heading', { name: new RegExp(mockSong[0].title, 'i'), level: 2 });
    const energeticEffect = screen.getByTestId('euphoria-bg');
    expect(energeticEffect).toBeInTheDocument();
  })

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


