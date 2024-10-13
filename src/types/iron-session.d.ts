import { API_Token, User } from "@lib/api/models/user/user";

// This is where we specify the typings of req.session.*
declare module "iron-session" {
	interface IronSessionData {
		token_data?: API_Token;
		user?: User;
		lastFetchTime?: number;
	}
}
