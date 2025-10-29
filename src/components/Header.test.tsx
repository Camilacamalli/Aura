import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header component behaviour', () => {

  test("It renders a header element", () => {
    render(<Header />);
    expect(() => screen.getByRole("banner")).not.toThrow();
  })
})
