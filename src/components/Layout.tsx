import React from 'react';
import { TopNav } from './TopNav';
import { SideNav } from './SideNav';
import { Footer } from './Footer';
import { TerminalModal } from './TerminalModal';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
      <TerminalModal />
    </div>
  );
}
