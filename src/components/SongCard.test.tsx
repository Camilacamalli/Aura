import { test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import SongCard from '@/components/SongCard';

test("SongCard component renders song title, artist and album art", () => {
  const mockSong = {
    id: 1001,
    title: 'Walking on Sunshine',
    artist: 'Katrina & The Waves',
    album: 'Katrina & The Waver',
    albumArt: 'http://example.com/sunshine.jpg',
    previewUrl: 'http://example.com/sunshine.mp3'
  }

  render(<SongCard song={mockSong} />);
  const element = screen.getByRole('heading', { name: /walking on sunshine/i })
  expect(element).toBeInTheDocument();
  expect(within(element).getByText(/katrina & the waves/i))
  expect(screen.getByRole('img', { name: /album art for walking on sunshine/ })).toBeInTheDocument();
});
