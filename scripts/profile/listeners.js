import { logout } from "../logout.js";

export function addLogout() {
	const logoutEl = document.getElementById("logout");
	logoutEl.addEventListener("click", () => logout());
}
