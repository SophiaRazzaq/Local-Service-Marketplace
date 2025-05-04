import type React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<ToastContainer position="bottom-right" autoClose={5000} />
		</AuthProvider>
	);
};

export default App;
