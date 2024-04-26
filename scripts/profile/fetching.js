import * as queries from "./queries.js";

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
		const userData = data.data.user[0];

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

		return data.data.transaction;
	} catch (error) {
		console.log(error);
	}
}

async function lvInfo() {
	const token = JSON.parse(sessionStorage.getItem("JWT"))["value"];

	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				query: queries.lvQuery,
				variables: queries.lvVariables,
			}),
		});

		const data = await info.json();
		const lvData = data.data.transaction;

		return lvData;
	} catch (error) {
		console.log(error);
	}
}

async function passFailInfo() {
	const token = JSON.parse(sessionStorage.getItem("JWT"))["value"];
	const query = queries.passFailQuery;

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
		const passFailData = data.data.progress;

		return passFailData;
	} catch (error) {
		console.log(error);
	}
}

export { userInfo, progressInfo, lvInfo, passFailInfo };
