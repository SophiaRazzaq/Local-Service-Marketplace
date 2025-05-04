import type React from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
// import HeroSection from "../components/HeroSection";
// import ServiceCategories from "../components/ServiceCategories";
// import FeaturedServices from "../components/FeaturedServices";
// import HowItWorks from "../components/HowItWorks";
// import Testimonials from "../components/Testimonials";

const NoUserBanner = () => (
	<div className="bg-indigo-700 py-12">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
				Ready to get started?
			</h2>
			<p className="mt-3 max-w-2xl mx-auto text-xl text-indigo-200">
				Join thousands of satisfied customers and service providers.
			</p>
			<div className="mt-8 flex justify-center">
				<div className="inline-flex rounded-md shadow">
					<Link
						to="/auth/register"
						className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
					>
						Sign up for free
					</Link>
				</div>
				<div className="ml-3 inline-flex">
					<Link
						to="/services"
						className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70"
					>
						Browse Services
					</Link>
				</div>
			</div>
		</div>
	</div>
);

const categories = [
	{ name: "Plumbing", icon: "🔧" },
	{ name: "Cleaning", icon: "🧹" },
	{ name: "Electrician", icon: "💡" },
	{ name: "Tutoring", icon: "📚" },
];

const UserHome: React.FC = () => {
	const [q, setQ] = useState("");

	return (
		<div className="space-y-12">
			<section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-24 text-center">
				<motion.h1
					className="text-5xl font-extrabold mb-6"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Find Local Services Near You
				</motion.h1>
				<motion.div
					className="max-w-lg mx-auto flex"
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<input
						type="text"
						className="flex-1 px-4 py-3 rounded-l-lg text-gray-800"
						placeholder="Search services…"
						value={q}
						onChange={(e) => setQ(e.target.value)}
					/>
					<Link
						to={`/services?q=${encodeURIComponent(q)}`}
						className="bg-white px-6 py-3 rounded-r-lg font-medium text-indigo-600 hover:bg-gray-100 transition"
					>
						Search
					</Link>
				</motion.div>
			</section>

			<section className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{categories.map((category) => (
					<Link to={`/services?category=${category.name}`} key={category.name}>
						<motion.div
							className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
							whileHover={{
								scale: 1.05,
								boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
							}}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<span className="text-6xl mb-4">{category.icon}</span>
							<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
								{category.name}
							</span>
						</motion.div>
					</Link>
				))}
			</section>
		</div>
	);
};

const HomePage: React.FC = () => {
	const { user } = useAuth();

	return (
		<>
			<Navbar />
			<div className="bg-white">
				{/* <HeroSection /> */}
				{/* <ServiceCategories /> */}
				{/* <FeaturedServices /> */}
				{/* <HowItWorks /> */}
				{/* <Testimonials /> */}
				{user ? <UserHome /> : <NoUserBanner />}
			</div>
		</>
	);
};

export default HomePage;
