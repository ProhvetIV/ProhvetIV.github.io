import { removeSessions } from "./sessions";

export function logout() {
	removeSessions;
	window.location.href = "index.html";
}
