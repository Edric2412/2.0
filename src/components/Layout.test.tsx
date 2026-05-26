import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { vi, describe, it, expect } from 'vitest';

// Mock child components
vi.mock('./TopNav', () => ({
  TopNav: () => <div data-testid="mock-top-nav">TopNav</div>,
}));

vi.mock('./Footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock('./TerminalModal', () => ({
  TerminalModal: () => <div data-testid="mock-terminal-modal">TerminalModal</div>,
}));

describe('Layout', () => {
  it('renders children and subcomponents correctly', () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    // Verify subcomponents
    expect(screen.getByTestId('mock-top-nav')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-terminal-modal')).toBeInTheDocument();

    // Verify children
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('applies correct structural styling classes', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Get the outermost element
    const layoutWrapper = container.firstChild as HTMLElement;
    expect(layoutWrapper).toHaveClass('min-h-screen', 'flex', 'flex-col');

    // Get the wrapper around children
    // The top nav is first, then the content wrapper is second
    const contentWrapper = layoutWrapper.childNodes[1] as HTMLElement;
    expect(contentWrapper).toHaveClass('flex-1', 'flex', 'flex-col');
  });
});
