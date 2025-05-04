import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
// import { getOffers, applyPromo } from "../services/api";
// import { Offer, PromoResponse } from "../types";

const presetOffers: Offer[] = [
	{ id: "preset1", title: "10% off Plumbing Services", discount: 10 },
	{ id: "preset2", title: "15% off Home Cleaning", discount: 15 },
	{ id: "preset3", title: "20% off Electrical Work", discount: 20 },
	{ id: "preset4", title: "25% off Tutoring Sessions", discount: 25 },
	{ id: "preset5", title: "30% off Gardening Services", discount: 30 },
	{ id: "preset6", title: "12% off Painting Work", discount: 12 },
	{ id: "preset7", title: "18% off Carpentry Services", discount: 18 },
	{ id: "preset8", title: "22% off Pest Control", discount: 22 },
	{ id: "preset9", title: "14% off HVAC Maintenance", discount: 14 },
	{ id: "preset10", title: "28% off Pool Cleaning", discount: 28 },
];

type Offer = {
	id: string;
	title: string;
	discount: number;
};

export default function OffersPage() {
	const [offers, setOffers] = useState<Offer[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(true);
	const [applying, setApplying] = useState(false);
	const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);

	// useEffect(() => {
	// 	getOffers()
	// 		.then((data) => setOffers(data))
	// 		.finally(() => setLoading(false));
	// }, []);

	// const handleApply = async () => {
	// 	if (!code.trim()) {
	// 		toast.error("Please enter a promo code.");
	// 		return;
	// 	}
	// 	setApplying(true);
	// 	try {
	// 		const updated: PromoResponse = await applyPromo(code.trim());
	// 		toast.success(`🎉 ${updated.discount}% off applied!`);
	// 		setOffers((prev) =>
	// 			prev.map((o) =>
	// 				o.id === updated.id ? { ...o, discount: updated.discount } : o,
	// 			),
	// 		);
	// 		setCode("");
	// 	} catch (err: any) {
	// 		toast.error(err.message || "Invalid code.");
	// 	} finally {
	// 		setApplying(false);
	// 	}
	// };

	const handleOfferSearch = () => {
		const filteredOffers = offers.filter((o) =>
			o.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		setFilteredOffers(filteredOffers);
	};

	return (
		<>
			<Navbar />
			<div className="space-y-12">
				<section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-24 text-center">
					<motion.h1
						className="text-5xl font-extrabold mb-6"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Offers tailored for you
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
							placeholder="Search offers…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							type="button"
							className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition"
							onClick={handleOfferSearch}
						>
							Search
						</button>
					</motion.div>
				</section>

				<div className="px-4 max-w-xl mx-auto">
					<motion.section
						className="bg-white p-6 rounded-xl shadow-lg"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
					>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">
							Apply Promo Code
						</h2>
						<div className="flex space-x-2">
							<input
								value={code}
								onChange={(e) => setCode(e.target.value)}
								placeholder="ENTER CODE"
								className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300"
							/>
							<motion.button
								whileHover={{ scale: 1.05 }}
								className={`px-5 py-2 rounded-lg text-white
                ${applying ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}
                transition`}
								disabled={applying}
								// onClick={handleApply}
							>
								{applying ? "Applying..." : "Apply"}
							</motion.button>
						</div>
					</motion.section>

					<section>
						<h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
							Featured Discounts
						</h2>
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 gap-6"
							initial="hidden"
							animate="visible"
							variants={{
								hidden: {},
								visible: { transition: { staggerChildren: 0.1 } },
							}}
						>
							{presetOffers.map((o) => (
								<motion.div
									key={o.id}
									className="p-6 bg-indigo-100 dark:bg-indigo-700 rounded-2xl shadow-md hover:shadow-xl cursor-pointer"
									variants={{
										hidden: { opacity: 0, y: 10 },
										visible: { opacity: 1, y: 0 },
									}}
									whileHover={{ scale: 1.04 }}
									transition={{ type: "spring", stiffness: 250 }}
								>
									<h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
										{o.title}
									</h3>
									<p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-300">
										{o.discount}% OFF
									</p>
								</motion.div>
							))}
						</motion.div>
					</section>
				</div>
			</div>
		</>
	);
}
