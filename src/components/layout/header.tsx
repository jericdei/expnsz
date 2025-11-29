import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/pocketbase";
import { Button } from "../ui/button";

export default function Header() {
	const { isAuthenticated, logout: logoutUser } = useAuth();

	const navigate = useNavigate();

	const logout = () => {
		logoutUser();
		navigate({ to: "/login" });
	};

	return (
		<header className="bg-neutral-900 p-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					<Link to="/" className=" text-white text-2xl font-bold">
						Expnsz
					</Link>
					{isAuthenticated ? (
						<Button
							className="cursor-pointer"
							variant="outline"
							onClick={logout}
						>
							<LogOut />
							Logout
						</Button>
					) : (
						<Button asChild>
							<Link to="/login">Login</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
