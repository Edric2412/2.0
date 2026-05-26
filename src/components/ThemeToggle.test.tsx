import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from 'next-themes';

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  it('renders without crashing', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });

    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('toggles from light to dark', async () => {
    const setThemeMock = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    await userEvent.click(button);
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light', async () => {
    const setThemeMock = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
      themes: ['light', 'dark'],
      systemTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    await userEvent.click(button);
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});
