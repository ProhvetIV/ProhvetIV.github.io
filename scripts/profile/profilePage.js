import { checkSessionExpiration } from "../sessions.js";
import * as queries from "./queries.js";

export async function profilePage() {
	checkSessionExpiration("profile");
	const user = await userInfo();
}

async function userInfo() {
	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "GET",
			headers: {
				Authorization: "Bearer: " + sessionStorage.getItem("JWT")["value"],
			},
			body: queries.userInfoQuery,
		});

		const data = await info.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
}
