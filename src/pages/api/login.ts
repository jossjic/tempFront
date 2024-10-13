import { IronSessionData, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { API_Token, TokenDecoded, User, UserSession } from "@lib/api/models/user/user";
import { paths } from "@lib/api/owaru";
import { API } from "@lib/api/constants";
import { IronSessionOptions } from "@lib/api/iron-session/iron-session-options";
import jwt from "jwt-decode";

export type UserLoginParams = {
	email: string;
	password: string;
};

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	
	const req_params = (await req.body) as UserLoginParams;
	let params = new URLSearchParams(req_params);
	const url = API.URL;
	const path = API.AUTH.LOGIN;
	const route = `${url}/${path}`;
	const response = await fetch(route, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Accept: "application/json",
		},
		body: params,
	});

	const session = await getIronSession<IronSessionData>(req, res, IronSessionOptions);

	if (response.ok) {
		let token_data = await (response.json() as Promise<UserSession>);
		/*const tokenDecoded: TokenDecoded = jwt(token_data.access_token);
		if (tokenDecoded?.company_id) {
			const company_id = Number(tokenDecoded?.company_id);
			token_data.company_id = company_id;
		}*/
        session.user = token_data.user;
		session.token_data = token_data.token_data;
		await session.save();
		res.json(token_data);
	} else {
		session.destroy();
		const error = await response.json();
		res.status(response.status).json(error);
	}
}

export default loginRoute;
