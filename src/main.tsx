import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccentProvider } from './context/AccentContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { VoiceProvider } from './context/VoiceContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <AccentProvider>
            <NotificationsProvider>
              <AccessibilityProvider>
                <VoiceProvider>
                  <App />
                </VoiceProvider>
              </AccessibilityProvider>
            </NotificationsProvider>
          </AccentProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);