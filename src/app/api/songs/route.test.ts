import { NextRequest } from 'next/server';
import { test, describe, expect } from 'vitest';
import { GET } from './route'

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GET api/songs...", () => {

  afterEach(() => {
    vi.resetAllMocks();
  })

  test("...returns status 400 when mood parameter is missing", async () => {
    const request = new NextRequest('http://localhost:3000/api/songs');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Mood parameter is required" });
  })

  test("...returns a 400 Bad Request when the mood parameter is unsupported", async () => {
    const request = new NextRequest('http://localhost:3000/api/songs?mood=sleepy');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Mood parameter is required" })
  })

  test("...returns status 200 when a mood is provided", async () => {
    const request = new NextRequest('http://localhost:3000/api/songs?mood=happy');
    const response = await GET(request);

    expect(response.status).toBe(200);
  })

  test.each([
    { mood: 'happy', expectedQuery: 'Happy Hits' },
    { mood: 'sad', expectedQuery: 'Sad Songs for Crying' },
    { mood: 'very sad', expectedQuery: 'Heartbreak Ballads' },
    { mood: 'neutral', expectedQuery: 'Chill Lo-fi Beats' },
    { mood: 'very happy', expectedQuery: 'Feel Good Party Anthems' }
  ])("...calls the Deezer API with the correct search query for mood: $mood", async ({ mood, expectedQuery }) => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ tracks: [] }) })
    const request = new NextRequest(`http://localhost:3000/api/songs?mood=${mood}`);
    await GET(request);

    const expectedURL = `https://api.deezer.com/search/playlist?q=${encodeURIComponent(expectedQuery)}`;
    expect(mockFetch).toHaveBeenCalledWith(expectedURL)
  })

})


