import { IronSessionData, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { API } from "@lib/api/constants";
import { IronSessionOptions, defaultSession } from "@lib/api/iron-session/iron-session-options";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {

    const session = await getIronSession<IronSessionData>(req, res, IronSessionOptions);
    const token_data = session.token_data
    const token = token_data?.access_token;

    if(!token){
        res.json(defaultSession);
        return;
    }

	const url = API.URL;
    const path = API.AUTH.LOGOUT;
    const route = `${url}/${path}`;
    const response = await fetch(route, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            "Authorization": "Bearer " + token,
        },
    });
    
    if(response.ok) {
        const session = await getIronSession<IronSessionData>(req, res, IronSessionOptions);
        session.destroy();
        // await session.save();
        res.json({
            success: true
        });
    }else {
        session.destroy();
        const error = await response.json();
        res.status(response.status).json(error);
    }
}

export default logoutRoute;