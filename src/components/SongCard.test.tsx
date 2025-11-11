import { test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SongCard from '@/components/SongCard';

const playMock = vi.fn();
const pauseMock = vi.fn();

test("SongCard component renders song title, artist and album art", () => {
  const mockSong = {
    id: 1001,
    title: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album: 'Katrina & The Waves',
    albumArt: 'http://example.com/sunshine.jpg',
    previewUrl: 'http://example.com/sunshine.mp3'
  }

  render(<SongCard song={mockSong} />);
  const element = screen.getByRole('heading', { name: new RegExp(mockSong.title, 'i') })
  expect(element).toBeInTheDocument();
  expect(screen.getByText(new RegExp(mockSong.artist, 'i'))).toBeInTheDocument()
  expect(screen.getByRole('img', { name: new RegExp(`album art for ${mockSong.title}`, 'i') })).toBeInTheDocument();
});

test("SongCard plays and pause the audio preview when the button is clicked", async () => {
  window.HTMLMediaElement.prototype.play = playMock;
  window.HTMLMediaElement.prototype.pause = pauseMock;
  const user = userEvent.setup();
  const mockSong = {
    id: 1001,
    title: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album: 'Katrina & The Waves',
    albumArt: 'http://example.com/sunshine.jpg',
    previewUrl: 'http://example.com/sunshine.mp3'
  }
  render(<SongCard song={mockSong} />);
  const playButton = screen.getByRole('button', { name: /play preview/i });
  await user.click(playButton);
  expect(playMock).toHaveBeenCalledTimes(1);
  const pauseButton = await screen.findByRole('button', { name: /pause preview/i });
  await user.click(pauseButton);
  expect(pauseMock).toHaveBeenCalledTimes(1);

  vi.resetAllMocks();
})
