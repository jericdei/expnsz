import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Receipt, Settings, Wallet } from "lucide-react";

export default function Footer() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navItems = [
		{
			to: "/dashboard",
			label: "Dashboard",
			icon: LayoutDashboard,
		},
		{
			to: "/transactions",
			label: "Transactions",
			icon: Receipt,
		},
		{
			to: "/accounts",
			label: "Accounts",
			icon: Wallet,
		},
		{
			to: "/settings",
			label: "Settings",
			icon: Settings,
		},
	];

	return (
		<footer className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 md:hidden">
			<nav className="container mx-auto">
				<ul className="flex items-center justify-around">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = currentPath === item.to;

						return (
							<li key={item.to} className="flex-1">
								<Link
									to={item.to}
									className={`flex flex-col items-center justify-center gap-1 py-3 px-4 transition-colors ${
										isActive
											? "text-white"
											: "text-neutral-400 hover:text-neutral-300"
									}`}
								>
									<Icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
									<span className="text-xs font-medium">{item.label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</footer>
	);
}
