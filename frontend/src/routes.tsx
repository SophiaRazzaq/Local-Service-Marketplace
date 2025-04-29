import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Lazy-loaded components
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage'));
const BookingsPage = React.lazy(() => import('./pages/BookingsPage'));
const MessagesPage = React.lazy(() => import('./pages/MessagesPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const ProviderDashboardPage = React.lazy(() => import('./pages/ProviderDashboardPage'));

interface Route {
  path: string;
  component: React.ComponentType;
  isPrivate?: boolean;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const routes: Route[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/services',
    component: ServicesPage,
  },
  {
    path: '/services/:id',
    component: ServiceDetailPage,
  },
  {
    path: '/bookings',
    component: BookingsPage,
    isPrivate: true,
  },
  {
    path: '/messages',
    component: MessagesPage,
    isPrivate: true,
  },
  {
    path: '/profile',
    component: ProfilePage,
    isPrivate: true,
  },
  {
    path: '/provider-dashboard',
    component: ProviderDashboardPage,
    isPrivate: true,
    allowedRoles: ['provider', 'admin'],
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    const RouteComponent = route.component;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.isPrivate ? (
            <PrivateRoute allowedRoles={route.allowedRoles}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <RouteComponent />
              </React.Suspense>
            </PrivateRoute>
          ) : (
            <React.Suspense fallback={<div>Loading...</div>}>
              <RouteComponent />
            </React.Suspense>
          )
        }
      />
    );
  });
};

export default routes;