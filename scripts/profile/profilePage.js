import { checkSessionExpiration } from "../sessions.js";

export async function profilePage() {
	checkSessionExpiration();
}
