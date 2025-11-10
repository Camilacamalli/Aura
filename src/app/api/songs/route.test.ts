import { NextRequest } from 'next/server';
import { test } from 'vitest';
import { GET } from './route'


test("GET api/songs returns status 400 when mood parameter is missing", async () => {
  const request = new NextRequest('http://localhost:3000/api/songs');
  const response = await GET(request);
  const body = await response.json();

  expect(response.status).toBe(400);
  expect(body).toEqual({ error: "Mood parameter is required" });
})

test("GET api/songs returns status 200 when a mood is provided", async () => {
  const request = new NextRequest('http://localhost:3000/api/songs?mood=happy');
  const response = await GET(request);
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(body).toEqual({ songs: [] })
})
