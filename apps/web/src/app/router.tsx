import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppShell } from './layouts/AppShell';
import { LandingPage } from '@/features/landing/LandingPage';
import { NotFoundPage } from '@/features/landing/NotFoundPage';

export function AppRouter() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<AppShell />}>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <LandingPage key="landing" />
            </AnimatePresence>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
