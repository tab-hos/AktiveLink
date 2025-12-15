import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './Layout.jsx';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Events from './Pages/Events.jsx';
import Training from './Pages/Training.jsx';
import Join from './Pages/Join.jsx';

// ScrollToTop component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/training" element={<Training />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

