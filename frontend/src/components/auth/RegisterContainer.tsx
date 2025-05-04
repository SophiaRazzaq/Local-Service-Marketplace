import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import RegisterForm, { type RegisterData } from "./RegisterForm";
import { toast } from "react-toastify";

const RegisterContainer = () => {
	const navigate = useNavigate();
	const { register, loading } = useAuth();

	const handleRegister = async ({
		role,
		password,
		name,
		email,
	}: RegisterData) => {
		register(
			name,
			email,
			password,
			role,
			() => {
				navigate("/");
			},
			(errMsg: string) => {
				toast.error(errMsg);
			},
		);
	};

	return <RegisterForm isRegistering={loading} register={handleRegister} />;
};

export default RegisterContainer;
