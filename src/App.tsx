import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import Footer from './presentation/components/Footer';
import { ProgressProvider } from './presentation/context/ProgressContext';
import ErrorBoundary from './presentation/components/ErrorBoundary';
import CommandPalette from './presentation/components/CommandPalette';
import ScrollToTop from './presentation/components/ScrollToTop';
import AppRouter from './presentation/navigation/AppRouter';

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <Router>
        <ScrollToTop />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <CommandPalette />
          <main style={{ flex: 1 }}>
            <ErrorBoundary>
              <AppRouter />
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
