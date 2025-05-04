import LoginForm from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginContainer = () => {
	const { login, loading } = useAuth();
	const navigateTo = useNavigate();

	const handleLogin = (email: string, password: string) =>
		login(
			email,
			password,
			() => {
				navigateTo("/");
			},
			(errMsg) => {
				toast.error(errMsg);
			},
		);

	return <LoginForm login={handleLogin} isLoggingIn={loading} />;
};

export default LoginContainer;
