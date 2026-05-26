import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TopNav } from './TopNav';
import userEvent from '@testing-library/user-event';

// Keep track of the active observer callback for simulating events
let intersectionObserverCallback: (entries: any[]) => void;

// Create a proper mock class for IntersectionObserver
class MockIntersectionObserver {
  constructor(callback: (entries: any[]) => void) {
    intersectionObserverCallback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock ThemeToggle
vi.mock('./ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle-mock" />
}));

describe('TopNav Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.IntersectionObserver = MockIntersectionObserver as any;
  });

  afterEach(() => {
    intersectionObserverCallback = undefined as any;
  });

  it('renders all navigation links on desktop', () => {
    render(<TopNav />);

    // Desktop links
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Experience & Education').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tech Stack').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects & Research').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Honors & Certifications').length).toBeGreaterThan(0);
  });

  it('toggles mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<TopNav />);

    // Menu is hidden by default
    expect(screen.queryByText('Contact Me')).not.toBeInTheDocument();

    // Click to open menu
    const menuButtons = document.querySelectorAll('button.lg\\:hidden');
    const menuButton = Array.from(menuButtons).find(btn => btn.querySelector('svg.lucide-menu'));
    expect(menuButton).toBeInTheDocument();

    if (menuButton) {
        await user.click(menuButton);
    }

    // Now 'Contact Me' and mobile links should be visible
    expect(screen.getByText('Contact Me')).toBeInTheDocument();

    // Click close button
    const closeButtons = document.querySelectorAll('button.lg\\:hidden');
    const closeButton = Array.from(closeButtons).find(btn => btn.querySelector('svg.lucide-x'));
    expect(closeButton).toBeInTheDocument();

    if (closeButton) {
        await user.click(closeButton);
    }
  });

  it('calls scrollIntoView when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<TopNav />);

    // Create dummy element in the DOM to be scrolled to
    const dummyElement = document.createElement('div');
    dummyElement.id = 'projects';
    document.body.appendChild(dummyElement);

    const projectsLink = screen.getAllByText('Projects & Research')[0];
    await user.click(projectsLink);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Cleanup
    document.body.removeChild(dummyElement);
  });

  it('simulates IntersectionObserver activating a section', () => {
    render(<TopNav />);

    // Initial state: Home is active (text-on-surface font-bold border-b-2)
    const homeLink = screen.getAllByText('Home')[0];
    expect(homeLink.className).toContain('text-on-surface');
    expect(homeLink.className).toContain('font-bold');

    // Simulate scrolling to 'experience' section
    act(() => {
      if (intersectionObserverCallback) {
        intersectionObserverCallback([{
          isIntersecting: true,
          target: { id: 'experience' }
        }]);
      }
    });

    // Check if 'Experience & Education' is now active
    const experienceLink = screen.getAllByText('Experience & Education')[0];
    expect(experienceLink.className).toContain('text-on-surface');
    expect(experienceLink.className).toContain('font-bold');

    // Check if Home is inactive
    const homeLinkAfter = screen.getAllByText('Home')[0];
    expect(homeLinkAfter.className).not.toContain('font-bold border-b-2 border-primary');
  });
});
