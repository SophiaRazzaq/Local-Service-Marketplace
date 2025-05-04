import type { FC, PropsWithChildren } from "react";
import Navbar from "../Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="bg-white">{children}</div>
		</>
	);
};

export default Layout;
