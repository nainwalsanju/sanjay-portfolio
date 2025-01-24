import React, { useEffect } from 'react';
import './App.module.scss';
import BaseLayout from './components/BaseLayout';
import { BrowserRouter } from 'react-router-dom';
import { logGa } from './utils/log';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  useEffect(() => {
    logGa('home_page_visit');
  }, []);

  return (
    <div>
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
      <Analytics/>
      <SpeedInsights/>
    </div>
  );
}

export default App;
