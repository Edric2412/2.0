/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeProvider';
import { MeshBackground } from './components/ui/mesh-background';

// Import pages directly for continuous scroll
import { Home } from './pages/Home';
import { Experience } from './pages/Experience';
import { TechStack } from './pages/TechStack';
import { Projects } from './pages/Projects';
import { Honors } from './pages/Honors';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <SmoothScroll>
          <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary/30 selection:text-primary relative">
            <MeshBackground />
            <div className="relative z-10">
              <Layout>
                <div className="flex flex-col grid-bg">
                  <Home />
                  <Experience />
                  <TechStack />
                  <Projects />
                  <Honors />
                </div>
              </Layout>
            </div>
          </div>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
