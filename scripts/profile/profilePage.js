import { checkSessionExpiration } from "../sessions.js";
import { getLv, getXP, placeAudit, placeLv, placeName, placeXP } from "./getPlace.js";
import { addLogout } from "./listeners.js";
import * as fetching from "./fetching.js";

// Base func for the profile page.
export async function profilePage() {
	checkSessionExpiration("profile");
	addLogout();

	const uInfo = await fetching.userInfo();
	const gInfo = await fetching.progressInfo();
	const lInfo = await fetching.lvInfo();

	placeName(`${uInfo.firstName} "${uInfo.login}" ${uInfo.lastName}`);
	placeAudit(uInfo.auditRatio, uInfo.totalUp, uInfo.totalDown);

	placeLv(getLv(lInfo));
	placeXP(getXP(uInfo.xps));
}
