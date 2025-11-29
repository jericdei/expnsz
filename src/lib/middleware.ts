import { redirect } from "@tanstack/react-router";
import { useAuth } from "@/pocketbase";

export async function checkAuthentication({ location }) {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		throw redirect({ to: "/login" });
	}
}
