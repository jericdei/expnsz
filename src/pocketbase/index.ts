import PocketBase, { RecordService } from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

if (!pocketbaseUrl) {
  throw new Error('VITE_POCKETBASE_URL is not set');
}

export interface User {
  id: string;
  password: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar: string;
  created: string;
  updated: string;
}

export interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService; // default fallback for any other collection
  collection(idOrName: "users"): RecordService<User>;
}

export type PocketbaseCollection = 'users';

export const pb: TypedPocketBase = new PocketBase(pocketbaseUrl);
