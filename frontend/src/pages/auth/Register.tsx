import type React from "react";
import Header from "../../components/ui/Header";
import AuthLayout from "../../components/layouts/Auth";
import RegisterContainer from "../../components/auth/RegisterContainer";

const Register: React.FC = () => {
	return (
		<AuthLayout>
			<Header
				mainTitle="Create your account now"
				altTitle="Join our community and start offering or booking services today"
			/>
			<RegisterContainer />
		</AuthLayout>
	);
};

export default Register;
