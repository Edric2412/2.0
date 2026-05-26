import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SideNav } from './SideNav';

describe('SideNav', () => {
  it('renders without crashing', () => {
    render(<SideNav />);
  });

  it('contains the correct GitHub link', () => {
    render(<SideNav />);
    const link = screen.getByTitle('GitHub');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/Edric2412');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('contains the correct LinkedIn link', () => {
    render(<SideNav />);
    const link = screen.getByTitle('LinkedIn');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('contains the correct Hugging Face link', () => {
    render(<SideNav />);
    const link = screen.getByTitle('Hugging Face');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://huggingface.co/Edric2412');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('contains the "Neural Architect" text', () => {
    render(<SideNav />);
    const textElement = screen.getByText('Neural Architect');
    expect(textElement).toBeInTheDocument();
  });
});
