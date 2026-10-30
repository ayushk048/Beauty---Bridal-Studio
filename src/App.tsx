import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BookingProvider } from './context/BookingContext';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const BridalPackagesPage = lazy(() => import('./pages/BridalPackagesPage').then((m) => ({ default: m.BridalPackagesPage })));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-300 border-t-gold-600" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="services"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ServicesPage />
                </Suspense>
              }
            />
            <Route
              path="bridal-packages"
              element={
                <Suspense fallback={<PageFallback />}>
                  <BridalPackagesPage />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}
