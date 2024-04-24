import { checkSessionExpiration } from "../sessions.js";
import { getLv, getXP, placeAudit, placeLv, placeName, placeXP } from "./getPlace.js";
import { getPassFail, placePassFailRatio } from "./passFail.js";
import { addLogout } from "./listeners.js";
import * as fetching from "./fetching.js";

// Base func for the profile page.
export async function profilePage() {
	checkSessionExpiration("profile");
	addLogout();

	// Fetch the necessary data from the GraphQL API.
	const uInfo = await fetching.userInfo();
	const lInfo = await fetching.lvInfo();
	const gInfo = await fetching.progressInfo();
	const pfInfo = await fetching.passFailInfo();

	// Necessary variables for displaying data.
	const { div01XP, piscineGO, piscineJS } = getXP(uInfo.xps);
	const { goExercises, jsExercises } = getPassFail(pfInfo);

	// Display the data received.
	placeName(`${uInfo.firstName} "${uInfo.login}" ${uInfo.lastName}`);
	placeAudit(uInfo.auditRatio, uInfo.totalUp, uInfo.totalDown);
	placeLv(getLv(lInfo));
	placeXP(div01XP, piscineGO, piscineJS);
	placePassFailRatio(goExercises, jsExercises);
}
