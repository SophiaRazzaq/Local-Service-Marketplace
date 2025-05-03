import React from "react";
// import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router";

// Lazy-loaded components
const HomePage = React.lazy(() => import("./pages/HomePage"));
// const LoginPage = React.lazy(() => import("./pages/LoginPage"));
// const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
// const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
// const ServiceDetailPage = React.lazy(() => import("./pages/ServiceDetailPage"));
// const BookingsPage = React.lazy(() => import("./pages/BookingsPage"));
// const MessagesPage = React.lazy(() => import("./pages/MessagesPage"));
// const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
// const ProviderDashboardPage = React.lazy(
// 	() => import("./pages/ProviderDashboardPage"),
// );

// const PrivateRoute: React.FC<{
// 	children: React.ReactNode;
// 	allowedRoles?: string[];
// }> = ({ children, allowedRoles }) => {
// 	const { user } = useAuth();
//
// 	if (!user) {
// 		return <Navigate to="/login" />;
// 	}
//
// 	if (allowedRoles && !allowedRoles.includes(user.role)) {
// 		return <Navigate to="/" />;
// 	}
//
// 	return <>{children}</>;
// };

const router = createBrowserRouter([{ path: "/", Component: HomePage }]);

export default router;
