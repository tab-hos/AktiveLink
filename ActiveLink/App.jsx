import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './Layout.jsx';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Events from './Pages/Events.jsx';
import Training from './Pages/Training.jsx';
import Join from './Pages/Join.jsx';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
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

