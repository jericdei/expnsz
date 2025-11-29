import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { AuthContextType } from "@/pocketbase";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
	auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<div className="flex flex-col min-h-screen">
				<Header />

				<main className="flex-1 p-4">
					<Outlet />
				</main>

				<Footer />
			</div>

			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</>
	),
});
