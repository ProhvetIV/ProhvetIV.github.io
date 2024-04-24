import { removeSessions } from "./sessions.js";

export function logout() {
	removeSessions();
	window.location.href = "index.html";
}
