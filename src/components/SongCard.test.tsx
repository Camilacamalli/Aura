import { test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SongCard from '@/components/SongCard';

const playMock = vi.fn();
const pauseMock = vi.fn();

window.HTMLMediaElement.prototype.play = playMock;
window.HTMLMediaElement.prototype.pause = pauseMock;

const mockToggle = vi.fn();

describe("SongCard...", () => {

  const mockSong = {
    id: 1001,
    title: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album: 'Katrina & The Waves',
    albumArt: 'http://example.com/sunshine.jpg',
    previewUrl: 'http://example.com/sunshine.mp3'
  }

  beforeEach(() => {
    vi.resetAllMocks();
  })

  test("...renders song title, artist and album art", () => {
    render(<SongCard song={mockSong} isPlaying={false} onToggle={mockToggle} />);
    const element = screen.getByRole('heading', { name: new RegExp(mockSong.title, 'i') })
    expect(element).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockSong.artist, 'i'))).toBeInTheDocument()
    expect(screen.getByRole('img', { name: new RegExp(`album art for ${mockSong.title}`, 'i') })).toBeInTheDocument();
  });

  test("...calls onToggle when button is clicked", async () => {
    render(<SongCard song={mockSong} isPlaying={false} onToggle={mockToggle} />);
    const playButton = screen.getByRole('button', { name: /play preview/i });
    await userEvent.click(playButton);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test("...plays audio when isPlaying prop is true", async () => {
    render(<SongCard song={mockSong} isPlaying={true} onToggle={mockToggle} />);
    expect(playMock).toHaveBeenCalled();
  });

  test("...calls onToggle when the audio ends naturally", () => {
    const { container } = render(<SongCard song={mockSong} isPlaying={true} onToggle={mockToggle} />);
    const audioElement = container.querySelector('audio');

    const event = new Event('ended');
    audioElement?.dispatchEvent(event);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

});

test("SongCard has active styling when playing", () => {
  const mockSong = {
    id: 1001,
    title: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album: 'Katrina & The Waves',
    albumArt: 'http://example.com/sunshine.jpg',
    previewUrl: 'http://example.com/sunshine.mp3'
  }

  render(<SongCard song={mockSong} isPlaying={true} onToggle={mockToggle} />);
  const card = screen.getByTestId('song-card');
  expect(card).toHaveClass('ring-4');
  expect(card).toHaveClass('ring-emerald-600');
});
