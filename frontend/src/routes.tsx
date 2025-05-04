import React, { Suspense } from "react";
import { useAuth } from "./contexts/AuthContext";
import { createBrowserRouter, Navigate } from "react-router";

const LazyLoad = (loader: () => Promise<{ default: React.ComponentType }>) => {
	const Component = React.lazy(loader);

	return () => (
		<Suspense fallback={<div>Loading...</div>}>
			<Component />
		</Suspense>
	);
};

const HomePage = LazyLoad(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/auth/Login"));
const RegisterPage = React.lazy(() => import("./pages/auth/Register"));
// const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
// const ServiceDetailPage = React.lazy(() => import("./pages/ServiceDetailPage"));
// const BookingsPage = React.lazy(() => import("./pages/BookingsPage"));
// const MessagesPage = React.lazy(() => import("./pages/MessagesPage"));
// const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
// const ProviderDashboardPage = React.lazy(
// 	() => import("./pages/ProviderDashboardPage"),
// );

const PrivateRoute: React.FC<{
	children: React.ReactNode;
	allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/auth/login" />;
	}

	if (allowedRoles && !allowedRoles.includes(user.role)) {
		return <Navigate to="/" />;
	}

	return <>{children}</>;
};

export const router = createBrowserRouter([
	{ path: "/", Component: HomePage },
	{ path: "/auth/register", Component: RegisterPage },
	{ path: "/auth/login", Component: LoginPage },
]);
