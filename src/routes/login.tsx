import { zodResolver } from "@hookform/resolvers/zod";
import {
	createFileRoute,
	redirect,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/pocketbase/context";
import { type AuthSchema, authSchema } from "@/validations/auth-schema";

const fallbackRedirect = "/dashboard" as const;

export const Route = createFileRoute("/login")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(""),
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect || fallbackRedirect });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const isLoading = useRouterState({ select: (s) => s.isLoading });
	const navigate = useNavigate();
	const { login } = useAuth();
	const search = Route.useSearch();

	const onSubmit = async (data: AuthSchema) => {
		try {
			await login(data);

			navigate({ to: search.redirect || fallbackRedirect });
		} catch (error) {
			if (error instanceof ClientResponseError) {
				setError("email", { message: error.message });
			}
		}
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-4">Login</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel>Email</FieldLabel>
								<Input
									type="email"
									placeholder="Email"
									{...register("email")}
								/>
								{errors.email && (
									<FieldError>{errors.email.message}</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel>Password</FieldLabel>
								<Input
									type="password"
									placeholder="Password"
									{...register("password")}
								/>
								{errors.password && (
									<FieldError>{errors.password.message}</FieldError>
								)}
							</Field>

							<Button type="submit" className="w-full" disabled={isLoading}>
								Login
							</Button>
						</FieldGroup>
					</FieldSet>
				</form>
			</div>
		</div>
	);
}
