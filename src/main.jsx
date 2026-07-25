import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import './styles.css';

// Lazy load pages for better performance
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Loading...</p>
    </div>
  );
}

// Layout component
function Layout() {
  return (
    <App>
      <Outlet />
    </App>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/services', element: <Suspense fallback={<PageLoader />}><ServicesPage /></Suspense> },
      { path: '/products', element: <Suspense fallback={<PageLoader />}><ProductsPage /></Suspense> },
      { path: '/gallery', element: <Suspense fallback={<PageLoader />}><GalleryPage /></Suspense> },
      { path: '/blog', element: <Suspense fallback={<PageLoader />}><BlogPage /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
      { path: '/admin-dashboard', element: <Suspense fallback={<PageLoader />}><AdminPage /></Suspense> },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
