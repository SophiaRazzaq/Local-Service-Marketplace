import { useRef } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

export type RegisterData = {
	name: string;
	email: string;
	password: string;
	role: string;
};

interface RegisterFormProps {
	register: (data: RegisterData) => Promise<void>;
	isRegistering: boolean;
}

const RegisterForm = ({ isRegistering, register }: RegisterFormProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!formRef.current) return;
		const values = new FormData(formRef.current);

		const name = values.get("name") as string;
		const email = values.get("email") as string;
		const password = values.get("password") as string;
		const role = values.get("role") as string;
		if (!name || !email || !password || !role) {
			toast.error("Please fill in all fields");
			return;
		}

		register({ name, email, password, role });
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form ref={formRef} action="#" method="POST" className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Name
						</label>
						<div className="mt-2">
							<input
								id="name"
								name="name"
								type="text"
								required
								autoComplete="name"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed"
								disabled={isRegistering}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								disabled={isRegistering}
								id="email"
								name="email"
								type="email"
								required
								autoComplete="email"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								required
								autoComplete="current-password"
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed"
								disabled={isRegistering}
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="role"
							className="block text-sm/6 font-medium text-gray-900"
						>
							Role
						</label>
						<select
							className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:cursor-not-allowed"
							name="role"
							id="role"
							disabled={isRegistering}
						>
							<option value="customer">Customer</option>
							<option value="provider">Provider</option>
						</select>
					</div>

					<div>
						<button
							disabled={isRegistering}
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
							onClick={handleSubmit}
						>
							Register
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Already have an account?{"  "}
					<Link
						to="/auth/login"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterForm;
