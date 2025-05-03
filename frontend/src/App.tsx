import type React from "react";
import { RouterProvider } from "react-router";
import router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import routes from './routes';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			{/*   <Router> */}
			{/*     <div className="min-h-screen bg-gray-50"> */}
			{/*       <Routes> */}
			{/*         {routes.map((route) => ( */}
			{/*           <Route */}
			{/*             key={route.path} */}
			{/*             path={route.path} */}
			{/*             element={<route.component />} */}
			{/*           /> */}
			{/*         ))} */}
			{/*       </Routes> */}
			{/*     </div> */}
			{/*     <ToastContainer position="bottom-right" autoClose={5000} /> */}
			{/*   </Router> */}
		</AuthProvider>
	);
};

export default App;
