import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types";

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!pocketbaseUrl) {
	throw new Error("VITE_POCKETBASE_URL is not set");
}

export const pb: TypedPocketBase = new PocketBase(pocketbaseUrl);
