import React from 'react';
import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import './index.css';
import App from './App';
import { server } from './_tosslib/server/browser';
import { BrowserRouter as Router } from 'react-router-dom';

server.start({ onUnhandledRequest: 'bypass' });

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </Router>
  </React.StrictMode>
);
