import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SongCard from '@/components/SongCard';

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
  expect(screen.getByRole('img', { name: new RegExp(`album art for ${mockSong.title}`, 'i')})).toBeInTheDocument();
});
