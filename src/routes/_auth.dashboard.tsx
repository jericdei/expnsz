import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/pocketbase/context";

export const Route = createFileRoute("/_auth/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuth();

	return <div>Hello, {user?.name}!</div>;
}
