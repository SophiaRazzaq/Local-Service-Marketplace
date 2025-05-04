interface HeaderProps {
	mainTitle: string;
	altTitle?: string;
}

const Header = ({ mainTitle, altTitle }: HeaderProps) => {
	return (
		<div className="bg-indigo-700 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
					{mainTitle}
				</h2>
				{altTitle && (
					<p className="mt-3 max-w-2xl mx-auto text-xl text-indigo-200">
						{altTitle}
					</p>
				)}
			</div>
		</div>
	);
};

export default Header;
