/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Experience } from './pages/Experience';
import { TechStack } from './pages/TechStack';
import { Projects } from './pages/Projects';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Router>
        <SmoothScroll>
          <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary/30 selection:text-primary">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/tech-stack" element={<TechStack />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </Layout>
          </div>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
