import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
	<div className="flex flex-col items-center">
		<img
			className="md:w-auto w-64 my-4"
			alt="superpoke_logo"
			src="/assets/superpoke.png"
		/>
		{children}
	</div>
);

export default Layout;
