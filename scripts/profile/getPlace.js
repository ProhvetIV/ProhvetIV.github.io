// Display the name of the user.
function placeName(name) {
	const h1 = document.getElementById("name-in-header");
	h1.textContent = name;
}

// Display the audit numbers.
function placeAudit(ratio, up, down) {
	const auditRatio = document.getElementById("ratio");
	const auditUp = document.getElementById("up");
	const auditDown = document.getElementById("down");

	auditRatio.textContent = ratio;
	auditUp.textContent = up;
	auditDown.textContent = down;
}

// Display the xp number.
function placeXP(div01, go, js, select) {
	const xp = document.getElementById("xp");

	if (select === "Piscine GO") {
		xp.textContent = go;
		return;
	}

	if (select === "Piscine JS") {
		xp.textContent = js;
		return;
	}

	console.log("here, div01: ", div01);
	xp.textContent = div01;
}

// Calculate the amount of XP for each piscine and div.
function getXP(xps) {
	let div01XP = 0;
	let piscineGO = 0;
	let piscineJS = 0;

	for (let i = 0; i < xps.length; i++) {
		var module = xps[i].path;
		if (module.includes("piscine-go")) {
			piscineGO += xps[i].amount;
			continue;
		}
		if (xps[i].path.includes("piscine-js")) {
			piscineJS += xps[i].amount;
			continue;
		}
		if (xps[i].path.includes("div-01")) div01XP += xps[i].amount;
	}

	// Return the xp values.
	console.log(div01XP, piscineGO, piscineJS);
	return { div01XP, piscineGO, piscineJS };
}

export { getXP, placeAudit, placeName, placeXP };
