import { Link, useParams } from "react-router";
import Layout from "../components/layouts/Auth";
import { getServices } from "../services/api";
import type { Service } from "../types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ServicesListingPage = () => {
	const params = useParams();
	const [services, setServices] = useState<Service[]>([]);
	const [category, setCategory] = useState(params.category || "");
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSearch = (signal?: AbortSignal) => {
		setLoading(true);
		getServices({ category, page: 1, keyword: query }, signal)
			.then((data) => {
				setServices(data.services);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		const abortController = new AbortController();

		handleSearch(abortController.signal);

		return () => abortController.abort();
	}, []);

	return (
		<Layout>
			<div className="space-y-12">
				<section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-24 text-center">
					<motion.h1
						className="text-5xl font-extrabold mb-6"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Available Services
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
							value={query}
							disabled={loading}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							type="button"
							disabled={loading}
							className="bg-white px-6 py-3 rounded-r-lg font-medium text-indigo-600 hover:bg-gray-100 transition"
							onClick={() => handleSearch()}
						>
							Search
						</button>
					</motion.div>
				</section>

				<section className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{services.length > 0 ? (
						services.map((service: any) => (
							<Link to={`/services/${service.id}`} key={service.id}>
								<motion.div
									className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
									whileHover={{
										scale: 1.05,
										boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
									}}
									transition={{ type: "spring", stiffness: 300 }}
								>
									<span className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
										{service.name}
									</span>
									<p className="text-gray-500 dark:text-gray-400 text-center">
										{service.description}
									</p>
								</motion.div>
							</Link>
						))
					) : (
						<p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
							No services found.
						</p>
					)}
				</section>
			</div>
		</Layout>
	);
};

export default ServicesListingPage;
