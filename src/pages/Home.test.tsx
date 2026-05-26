import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Home } from './Home';

// Mock motion/react and lucide-react
vi.mock('motion/react', () => ({
  motion: {
    div: ({ initial, animate, transition, whileInView, viewport, ...props }: any) => <div data-testid="motion-div" {...props} />,
  },
}));

vi.mock('lucide-react', () => ({
  Quote: () => <svg data-testid="icon-quote" />,
  Send: () => <svg data-testid="icon-send" />,
  Download: () => <svg data-testid="icon-download" />,
  Terminal: () => <svg data-testid="icon-terminal" />,
  Cpu: () => <svg data-testid="icon-cpu" />,
  Microscope: () => <svg data-testid="icon-microscope" />,
  Mail: () => <svg data-testid="icon-mail" />,
  Phone: () => <svg data-testid="icon-phone" />,
}));

vi.mock('../components/NeuralPortrait', () => ({
  NeuralPortrait: () => <div data-testid="neural-portrait" />,
}));

vi.mock('../assets/resume.pdf?url', () => ({
  default: 'test-resume.pdf',
}));

describe('Home Page Component', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    // Clear meta description before each test to ensure predictable state
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta) {
      existingMeta.remove();
    }
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should set document title and update existing meta description on mount', () => {
    // Add meta tag to body to be found and updated
    const meta = document.createElement('meta');
    meta.name = "description";
    meta.content = "Old description";
    document.head.appendChild(meta);

    render(<Home />);

    expect(document.title).toBe("Edric Jeffrey Sam | GenAI & AI/ML Engineer");
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc?.getAttribute('content')).toContain('Portfolio of Edric Jeffrey Sam');
  });

  it('should set document title and handle missing meta description safely', () => {
    // Ensure no meta tag exists
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta) {
      existingMeta.remove();
    }

    render(<Home />);

    expect(document.title).toBe("Edric Jeffrey Sam | GenAI & AI/ML Engineer");
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).toBeNull();
  });

  it('should render the main sections without crashing', () => {
    render(<Home />);

    // Check main title
    expect(screen.getByText('Edric Jeffrey')).toBeInTheDocument();
    expect(screen.getByText('Sam')).toBeInTheDocument();

    // Check core systems architecture subtitle
    expect(screen.getByText('Core Systems Architecture')).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
    expect(screen.getByText('Download Resume')).toBeInTheDocument();

    // Check stats are rendered
    expect(screen.getByText('Internships')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Publications')).toBeInTheDocument();
    expect(screen.getByText('Academic Excellence')).toBeInTheDocument();
  });

  it('should correctly render mock components and icons', () => {
    render(<Home />);
    expect(screen.getByTestId('neural-portrait')).toBeInTheDocument();
    expect(screen.getByTestId('icon-quote')).toBeInTheDocument();
    expect(screen.getByTestId('icon-send')).toBeInTheDocument();
    expect(screen.getByTestId('icon-download')).toBeInTheDocument();
    expect(screen.getByTestId('icon-terminal')).toBeInTheDocument();
    expect(screen.getByTestId('icon-microscope')).toBeInTheDocument();
    expect(screen.getByTestId('icon-mail')).toBeInTheDocument();
    expect(screen.getByTestId('icon-phone')).toBeInTheDocument();
  });

  it('should contain correct contact and resume links', () => {
    render(<Home />);

    const mailtoLinks = screen.getAllByRole('link').filter(a => (a as HTMLAnchorElement).href.includes('mailto:'));
    expect(mailtoLinks.length).toBeGreaterThan(0);
    expect(mailtoLinks[0]).toHaveAttribute('href', 'mailto:edricjsam@gmail.com');

    const downloadLink = screen.getByText('Download Resume').closest('a');
    expect(downloadLink).toHaveAttribute('href', 'test-resume.pdf');
    expect(downloadLink).toHaveAttribute('download', 'Edric_Jeffrey_Resume.pdf');
  });
});
