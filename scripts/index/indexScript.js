import { createSessions, checkSessionExpiration } from "../sessions.js";

// Login function to fetch the signin JWT.
export async function login() {
	checkSessionExpiration();
	const emailOrUsername = document.getElementById("email-or-username").value;
	const password = document.getElementById("password").value;

	// Get query and creds for the GraphQL request.
	// Encrypt credentials.
	const { query, creds } = getQueryAndCreds(emailOrUsername, password);
	const userCredentials = encrypt(emailOrUsername + ":" + password); //+ ":" + encrypt(password);

	// Fetch the data.
	try {
		const response = await fetch("https://01.kood.tech/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Basic " + userCredentials,
			},
			body: JSON.stringify({ query, creds }),
		});

		if (!response.ok) {
			console.log("Failed response: ", response);
			throw new Error("Failed to fetch data");
		}

		// Successful fetching
		if (response.ok) {
			const responseData = await response.json();
			console.log(responseData);
			createSessions(responseData);
			window.location.href = "profile.html";
		}
	} catch (error) {
		console.log("Failed to fetch from kood/jõhvi: ", error);
	}
}

// Encrypt data for transfer to GraphQL endpoint. Base64.
function encrypt(input) {
	const encryptedPW = btoa(input);
	return encryptedPW;
}

// Checks whether input is an email type.
function emailValidation(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

// Make the query string and differentiate between email and username.
function getQueryAndCreds(emailOrUsername, password) {
	// Query when user inputs email and password.
	if (emailValidation(emailOrUsername)) {
		let creds = {
			email: emailOrUsername,
			password: password,
		};
		let query = `
			mutation signin($email: String!, $password: String!) {
				signin(email: $email, password: $password) {
					token
				}
			}
		`;
		return { query, creds };
	}

	// Query when user inputs username and password.
	let creds = {
		username: emailOrUsername,
		password: password,
	};
	let query = `
		mutation signin($username: String!, $password: String!) {
			signin(username: $username, password: $password) {
				token
			}
		}
	`;
	return { query, creds };
}
