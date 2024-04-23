import { checkSessionExpiration } from "../sessions.js";
import { getXP, placeAudit, placeName, placeXP } from "./getPlace.js";
import * as queries from "./queries.js";

// Base func for the profile page.
export async function profilePage() {
	checkSessionExpiration("profile");

	try {
		const uInfo = await userInfo();
		const gInfo = await graphInfo();

		if (uInfo) {
			console.log(uInfo);
			console.log(typeof uInfo);
			placeName(`${uInfo.firstName} "${uInfo.login}" ${uInfo.lastName}`);
			placeAudit(uInfo.auditRatio, uInfo.totalUp, uInfo.totalDown);
			const { div01, piscineGO, piscineJS } = getXP(uInfo.xps);
			placeXP(div01, piscineGO, piscineJS);
		}
	} catch (error) {
		console.log("Error fetching data: ", error);
	}
}

// Fetch for user info.
async function userInfo() {
	const token = JSON.parse(sessionStorage.getItem("JWT"))["value"];
	const query = queries.userInfoQuery;

	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ query }),
		});

		const data = await info.json();
		console.log(data);
		const userData = data.data.user;
		console.log(userData);

		return userData;
	} catch (error) {
		console.log(error);
	}
}

// Fetch for graph info.
async function graphInfo() {
	const token = JSON.parse(sessionStorage.getItem("JWT"))["value"];

	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				query: queries.xpQuery,
				variables: queries.xpVariables,
			}),
		});

		const data = await info.json();
		console.log(data);

		return data;
	} catch (error) {
		console.log(error);
	}
}
