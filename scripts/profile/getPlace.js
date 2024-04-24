const modules = ["DIV-01", "PISCINE-GO", "PISCINE-JS"];

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
	const xpEls = [...document.querySelectorAll("xp")];
	const arr = [div01, go, js];

	for (let i = 0; i < xpEls.length; i++) {
		xpEls[i].textContent = arr[i];
	}
}

function placeLv(lvObj) {
	const displays = [...document.querySelectorAll("xp-display")];

	for (let i = 0; i < displays.length; i++) {
		const numbers = document.createElement("span");
		numbers.textContent = lvObj[i];
		numbers.id = modules[i] + "-lv";
		const moduleName = document.createElement("span");
		moduleName.textContent = modules[i];
		moduleName.id = modules[i] + "-lv-text";
		const xpText = document.createElement("span");
		xpText.classList.add("xp");

		displays[i].appendChild(numbers);
		displays[i].appendChild(xpText);
		displays[i].appendChild(moduleName);
	}
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
		if (module.includes("piscine-js")) {
			piscineJS += xps[i].amount;
			continue;
		}
		if (xps[i].path.includes("div-01")) div01XP += xps[i].amount;
	}

	// Return the xp values.
	return { div01XP, piscineGO, piscineJS };
}

// Get the level of each module.
function getLv(levels) {
	const lvObject = {
		div01: 0,
		piscineGO: 0,
		piscineJS: 0,
	};
	const moduleArr = ["div-01", "piscine-go", "piscine-js"];

	for (let i = 0; i < moduleArr.length; i++) {
		for (let j = 0; j < levels.length; j++) {
			if (levels[j].path.includes(moduleArr[i])) {
				lvObject[i] = levels[j].amount;
				break;
			}
		}
	}

	return lvObject;
}

export { getXP, getLv, placeAudit, placeName, placeXP, placeLv };
