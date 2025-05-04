import type React from "react";
import AuthLayout from "../../components/layouts/Auth";
import Header from "../../components/ui/Header";
import LoginContainer from "../../components/auth/LoginContainer";

const LoginPage: React.FC = () => {
	return (
		<AuthLayout>
			<Header mainTitle="Login to your account" />
			<LoginContainer />
		</AuthLayout>
	);
};

export default LoginPage;
