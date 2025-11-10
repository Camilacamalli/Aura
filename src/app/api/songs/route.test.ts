import { NextRequest } from 'next/server';
import { test, describe, expect } from 'vitest';
import { GET } from './route'

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GET api/songs", () => {

  afterEach(() => {
    vi.resetAllMocks();
  })

  describe("returns status 400 when mood provided is...", () => {
    const expectedError = { error: "Mood parameter is required" }

    test("...missing", async () => {
      const request = new NextRequest('http://localhost:3000/api/songs');
      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual(expectedError);
    });

    test("...unsupported", async () => {
      const request = new NextRequest('http://localhost:3000/api/songs?mood=sleepy');
      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual(expectedError)
    });

  });

  describe("When the input is valid, it...", () => {
    const createMockPlaylistResponse = (playlist: any[]) => ({
      ok: true, json: () => Promise.resolve({ data: playlist })
    });

    const createMockTracksResponse = (tracks: any[]) => ({
      ok: true, json: () => Promise.resolve({ data: tracks })
    });

    const moodTestData = [
      { mood: 'happy', expectedQuery: 'Happy Hits' },
      { mood: 'sad', expectedQuery: 'Sad Songs for Crying' },
      { mood: 'very sad', expectedQuery: 'Heartbreak Ballads' },
      { mood: 'neutral', expectedQuery: 'Chill Lo-fi Beats' },
      { mood: 'very happy', expectedQuery: 'Feel Good Party Anthems' }
    ];

    test("...returns status 200 when a mood is provided", async () => {
      mockFetch.mockResolvedValueOnce(createMockPlaylistResponse([]))
        .mockResolvedValueOnce(createMockTracksResponse([]))
      const request = new NextRequest('http://localhost:3000/api/songs?mood=happy');
      const response = await GET(request);
      expect(response.status).toBe(200);
    });

    test.each(moodTestData)("...calls the Deezer API with the correct search query for mood: $mood", async ({ mood, expectedQuery }) => {
      mockFetch.mockResolvedValueOnce(createMockPlaylistResponse([]))
        .mockResolvedValueOnce(createMockTracksResponse([]));
      const request = new NextRequest(`http://localhost:3000/api/songs?mood=${mood}`);
      await GET(request);

      const expectedURL = `https://api.deezer.com/search/playlist?q=${encodeURIComponent(expectedQuery)}`;
      expect(mockFetch).toHaveBeenCalledWith(expectedURL)
    });

    test("...fetches tracks for the first playlist found", async () => {
      const mockPlaylistId = 12345
      mockFetch
        .mockResolvedValueOnce(createMockPlaylistResponse([
          { id: mockPlaylistId, title: 'First Playlist' },
          { id: 34221, title: 'Second Playlist' }
        ]))
        .mockResolvedValueOnce(createMockTracksResponse([]))
      const request = new NextRequest('http://localhost:3000/api/songs?mood=happy')
      await GET(request);
      const expectedTracksUrl = `https://api.deezer.com/playlist/${mockPlaylistId}/tracks`
      expect(mockFetch).toHaveBeenNthCalledWith(2, expectedTracksUrl)
    });

    test("...returns a maximum of tracks after formating the track data correctly", async () => {
      const mockPlaylistId = 12345;
      mockFetch.mockResolvedValueOnce(createMockPlaylistResponse([{ id: mockPlaylistId, title: 'Test playlist' }]));

      const rawDeezerTracks = Array.from({ length: 30 }, (_, i) => ({
        id: 1000 + i,
        title: `Song Title ${i}`,
        artist: { name: `Artist Name ${i}` },
        album: { title: `Album ${i}`, cover_medium: `http://cover.com/${i}.jpg` },
        preview: (i % 5 === 0) ? null : `http://preview.com/${i}.mp3`
      }));

      mockFetch.mockResolvedValueOnce(createMockTracksResponse(rawDeezerTracks));
      const request = new NextRequest('http://localhost:3000/api/songs?mood=happy');
      const response = await GET(request);
      const body = await response.json();

      expect(body).toHaveLength(24);
      expect(body[0]).toEqual({
        id: 1001,
        title: 'Song Title 1',
        artist: 'Artist Name 1',
        album: 'Album 1',
        albumArt: 'http://cover.com/1.jpg',
        previewUrl: 'http://preview.com/1.mp3'
      })

    })

  });

});


