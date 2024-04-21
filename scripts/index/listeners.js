import { login } from "./index.js";

export function addListeners() {
	const loginSubmit = document.getElementById("login-submit");
	loginSubmit.addEventListener("click", () => login());
	window.addEventListener("keydown", (e) => {
		if (e.key == "Enter") {
			login();
		}
	});
}
