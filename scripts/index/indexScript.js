// Login function to fetch the signin JWT.
export async function login() {
	const emailOrUsername = document.getElementById("email-or-username").value;
	const password = document.getElementById("password").value;

	// Get query and creds for the GraphQL request.
	// Encrypt credentials.
	const { query, creds } = getQueryAndCreds(emailOrUsername, password);
	const userCredentials = encrypt(emailOrUsername) + ":" + encrypt(password);

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

		console.log(response);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const responseData = await response.json();
		console.log(responseData);

		const token = responseData.data.signin.token;
		console.log("Token: ", token);
	} catch (error) {
		console.log(error);
	}
}

// Encrypt data for transfer to GraphQL endpoint. Base64.
function encrypt(input) {
	const encryptedPW = btoa(input);
	return encryptedPW;
}

// Checks whether username is email or not. If true, then email.
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
		query = `
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
