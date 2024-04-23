import { checkSessionExpiration } from "../sessions.js";
import * as queries from "./queries.js";

export async function profilePage() {
	checkSessionExpiration("profile");
	const uInfo = await userInfo();
	const gInfo = await graphInfo();
}

async function userInfo() {
	const token = JSON.parse(sessionStorage.getItem("JWT"))["value"];
	console.log(token);
	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
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

async function graphInfo() {
	const token = JSON.parse(sessionStorage.getItem("JWT"))["value"];
	console.log(token);

	const xpQ = queries.xpQuery;
	const xpV = queries.xpVariables;

	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ xpQ, xpV }),
		});

		const data = await info.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
}
