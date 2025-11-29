import type { RecordModel } from "pocketbase";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { AuthSchema } from "@/validations/auth-schema";
import { pb } from ".";

export interface AuthContextType {
	user: RecordModel | null;
	isAuthenticated: boolean;
	login: (data: AuthSchema) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// Initialize state synchronously from PocketBase auth store
	// This ensures beforeLoad functions have correct auth state
	const [user, setUser] = useState<RecordModel | null>(
		pb.authStore.record || null,
	);
	const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);

	useEffect(() => {
		// Subscribe to authStore changes (e.g., after login/logout)
		const unsubscribe = pb.authStore.onChange(() => {
			setUser(pb.authStore.record);
			setIsAuthenticated(pb.authStore.isValid);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const login = async (data: AuthSchema) => {
		await pb.collection("users").authWithPassword(data.email, data.password);
	};

	const logout = () => {
		pb.authStore.clear();
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
