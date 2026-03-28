/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { Layout } from './components/Layout';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Experience = lazy(() => import('./pages/Experience').then(m => ({ default: m.Experience })));
const TechStack = lazy(() => import('./pages/TechStack').then(m => ({ default: m.TechStack })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
import { ThemeProvider } from './components/ThemeProvider';
import { MeshBackground } from './components/ui/mesh-background';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <SmoothScroll>
          <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary/30 selection:text-primary relative">
            <MeshBackground />
            <div className="relative z-10">
              <Layout>
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center uppercase tracking-[0.3em] font-headline text-primary/50 text-sm font-bold animate-pulse">Initializing System State...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/tech-stack" element={<TechStack />} />
                    <Route path="/projects" element={<Projects />} />
                  </Routes>
                </Suspense>
              </Layout>
            </div>
          </div>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
