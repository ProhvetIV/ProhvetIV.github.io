export function createSessions(JWT) {
	sessionStorage.setItem("JWT", JSON.stringify({ value: JWT, expires: createExpirationForSession(10) }));
}

// Create a session expiration date. As an input use the length in minutes.
function createExpirationForSession(minutes) {
	const now = new Date();
	const timeout = now.getTime() + minutes * 60000;
	const expires = new Date(timeout).toUTCString();
	return expires;
}

// Checks if there is a "JWT" session with an "expires" field. If true, compares
// it to current time. If current time is bigger than expires time, removes the
// session and navigates back to index.html.
export function checkSessionExpiration() {
	const token = sessionStorage.getItem("JWT");
	if (token === null) {
		return;
	}

	const expirationTime = parseInt(JSON.parse(token).expires);
	console.log(expirationTime);

	if (expirationTime) {
		const now = Date.now();
		if (now > expirationTime) {
			removeSessions();
			window.location.href = "index.html";
		}
	}
}

// Remove sessions. For logout and expired sessions.
export function removeSessions() {
	sessionStorage.removeItem("JWT");
}
