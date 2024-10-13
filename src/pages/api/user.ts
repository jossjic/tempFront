import { IronSessionData, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { API_Token, TokenDecoded, User, UserSession } from "@lib/api/models/user/user";
import { paths } from "@lib/api/owaru";
import { API } from "@lib/api/constants";
import { IronSessionOptions, defaultSession } from "@lib/api/iron-session/iron-session-options";
import jwt from "jwt-decode";

export type UserLoginParams = {
	username: string;
	password: string;
};

async function userProfileRoute(req: NextApiRequest, res: NextApiResponse) {

    const session = await getIronSession<IronSessionData>(req, res, IronSessionOptions);
    const token_data = session.token_data
    const token = token_data?.access_token;
    const cachedUserData = session.user;
    const lastFetchTime = session.lastFetchTime;
    if(!token){
        res.json(defaultSession);
        return;
    }else{
        const decodedToken: TokenDecoded = jwt(token_data.access_token);
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds since Unix epoch
    
        if (!decodedToken.exp || decodedToken.exp < currentTime) {
            // Token is expired
            res.status(401).json({ error: "Session expired" });
            return;
        }    
    }

    const currentTime = new Date().getTime();
    if (cachedUserData && lastFetchTime && currentTime - lastFetchTime < 30 * 60 * 1000) {
        // Less than 30 minutes since the last fetch, return cached data
        res.json({ user: cachedUserData, token_data });
        return;
    }

	const url = API.URL;
    const path = API.AUTH.PROFILE;
    const route = `${url}/${path}`;
    const response = await fetch(route, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "Authorization": "Bearer " + token,


        },
    });
    if(response.ok) {
        const user_data = await (response.json() as Promise<UserSession>);        
        session.user = user_data.user;
        session.lastFetchTime = currentTime;
        await session.save();

        const user_session: UserSession = {
            user: user_data.user,
            token_data: token_data,
        }

        res.json(user_session);
    }else {
        session.destroy();
        const error = await response.json();
        res.status(response.status).json(error);
    }
}

export default userProfileRoute;