// Get the pass/fail ratios and attempts for each exercise. As an input
// takes an array of objects.
function getPassFail(progress) {
	// Segregate data into 2 arrays, containing go and js exercise info respectively
	const go = [];
	const js = [];
	progress.forEach((el) => {
		if (el.path.includes("piscine-go")) go.push(el);
		if (el.path.includes("piscine-js")) js.push(el);
	});

	// Create an object that has all the go-piscine excercise passes and fails.
	const goExercises = {};
	for (let i = 0; i < go.length; i++) {
		const pathSplit = go[i].path.split("/");
		const name = pathSplit[pathSplit.length - 1];

		if (!Object.keys(goExercises).includes(name)) {
			goExercises[name] = {
				pass: 0,
				fail: 0,
			};
		}

		if (go[i].grade === 1) {
			goExercises[name].pass += 1;
			continue;
		}

		if (go[i].grade === 0) {
			goExercises[name].fail += 1;
			continue;
		}
	}

	// Create an object that has all the js-piscine excercise passes and fails.
	const jsExercises = {};
	for (let i = 0; i < js.length; i++) {
		const pathSplit = js[i].path.split("/");
		const name = pathSplit[pathSplit.length - 1];

		if (!Object.keys(jsExercises).includes(name)) {
			jsExercises[name] = {
				pass: 0,
				fail: 0,
			};
		}

		if (js[i].grade === 1) {
			jsExercises[name].pass += 1;
			continue;
		}

		if (js[i].grade === 0) {
			jsExercises[name].fail += 1;
			continue;
		}
	}

	return { goExercises, jsExercises };
}

function placePassFail(go, js) {
	const passFailSection = document.getElementById("pass-fail");

	// Create charts for fails.

	// Create tables for ratio.
	const goTable = document.createElement("table");
	const goTableHead = document.createElement("thead");
	const goTr = document.createElement("tr");
	const goTableH = document.createElement("th");
	const goTableBody = document.createElement("tbody");
	goTableH.textContent = "Ratio";
	passFailSection.appendChild(goTable);
	goTable.appendChild(goTableHead);
	goTableHead.appendChild(goTr);
	goTr.appendChild(goTableH);
	goTable.appendChild(goTableBody);
	for (const [key, value] of Object.entries(go)) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		if (value.pass === 0) {
			td.textContent = 0;
		} else if (value.fail === 0) {
			td.textContent = 1;
		} else {
			td.textContent = value.pass / (value.pass + value.fail);
		}
		goTableBody.appendChild(tr);
		tr.appendChild(td);
	}

	const jsTable = document.createElement("table");
	const jsTableHead = document.createElement("thead");
	const jsTr = document.createElement("tr");
	const jsTableH = document.createElement("th");
	const jsTableBody = document.createElement("tbody");
	jsTableH.textContent = "Ratio";
	passFailSection.appendChild(jsTable);
	jsTable.appendChild(jsTableHead);
	jsTableHead.appendChild(jsTr);
	jsTr.appendChild(jsTableH);
	jsTable.appendChild(jsTableBody);
	for (const [key, value] of Object.entries(js)) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		if (value.pass === 0) {
			td.textContent = 0.0;
		} else if (value.fail === 0) {
			td.textContent = 1.0;
		} else {
			td.textContent = parseFloat(value.pass / (value.pass + value.fail)).toFixed(2);
		}
		jsTableBody.appendChild(tr);
		tr.appendChild(td);
	}
}

export { getPassFail, placePassFail };
