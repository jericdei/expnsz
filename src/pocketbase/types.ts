import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export interface BaseModel {
	id: string;
	created: Date;
	updated: Date;
}

export interface User extends BaseModel {
	password: string;
	email: string;
	emailVisibility: boolean;
	verified: boolean;
	name: string;
	avatar: string;
	new: boolean;
}

export type AccountGroupType = "asset" | "liability";

export interface AccountGroup extends BaseModel {
	name: string;
	type: AccountGroupType;
}

export interface Account extends BaseModel {
	name: string;
	group: AccountGroup;
	startingBalance: number;
	currentBalance: number;
	notes?: string;
	hideFromSelection: boolean;
	hideFromReports: boolean;
}

export type CategoryGroupType = "income" | "expense";

export interface CategoryGroup extends BaseModel {
	name: string;
	type: CategoryGroupType;
}

export interface Category extends BaseModel {
	name: string;
	group: CategoryGroup;
	icon?: string;
	hideFromSelection: boolean;
}

export interface Transaction extends BaseModel {
	name: string;
	image?: string;
	amount: number;
	date: Date;
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: "users"): RecordService<User>;
	collection(idOrName: "accountGroups"): RecordService<AccountGroup>;
	collection(idOrName: "accounts"): RecordService<Account>;
	collection(idOrName: "categoryGroups"): RecordService<CategoryGroup>;
	collection(idOrName: "categories"): RecordService<Category>;
	collection(idOrName: "transactions"): RecordService<Transaction>;
}
