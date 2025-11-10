import { NextRequest } from 'next/server';
import { test, describe, expect } from 'vitest';
import { GET } from './route'

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GET api/songs", () => {

  test("returns status 400 when mood parameter is missing", async () => {
    const request = new NextRequest('http://localhost:3000/api/songs');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Mood parameter is required" });
  })

  test("returns a 400 Bad Request when the mood parameter is unsupported", async () => {
    const request = new NextRequest('http://localhost:3000/api/songs?mood=sleepy');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Mood parameter is required" })
  })

  test("returns status 200 when a mood is provided", async () => {
    const request = new NextRequest('http://localhost:3000/api/songs?mood=happy');
    const response = await GET(request);

    expect(response.status).toBe(200);
  })
})

test("GET api/songs calls the Deezer API with the correct search query", async () => {
  mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ tracks: [] }) })
  const request = new NextRequest('http://localhost:3000/api/songs?mood=happy');
  await GET(request);
  const expectedURL = "https://api.deezer.com/search/playlist?q=Happy%20Hits";
  expect(mockFetch).toHaveBeenCalledWith(expectedURL)
})

