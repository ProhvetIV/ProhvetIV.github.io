// Login function to fetch the signin JWT.
export async function login() {
	const emailOrUsername = document.getElementById("email-or-username").value;
	const password = document.getElementById("password").value;

	const userCredentials = emailOrUsername + ":" + encryptPassword(password);

	try {
		const response = await fetch("https://01.kood.tech/api/auth/signin", {
			method: "POST",
			headers: {
				Authorization: "Basic " + userCredentials,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

function encryptPassword(password) {
	const encryptedPW = btoa(password);
	return encryptedPW;
}
