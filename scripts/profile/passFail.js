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

function placePassFailRatio(go, js) {
	const goPassFail = document.getElementById("go-pass-fail");
	const jsPassFail = document.getElementById("js-pass-fail");

	// Create charts for fails.

	// Create tables for ratio.
	const goTable = document.createElement("table");
	const goTableHead = document.createElement("thead");
	const goTr = document.createElement("tr");
	const goTableH = document.createElement("th");
	const goTableBody = document.createElement("tbody");
	goTableH.textContent = "Ratio";
	goPassFail.appendChild(goTable);
	goTable.appendChild(goTableHead);
	goTableHead.appendChild(goTr);
	goTr.appendChild(goTableH);
	goTable.appendChild(goTableBody);
	for (const [key, value] of Object.entries(go)) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		if (value.pass === 0) {
			td.textContent = parseFloat(0.001).toFixed(2);
		} else if (value.fail === 0) {
			td.textContent = parseFloat(1.001).toFixed(2);
		} else {
			td.textContent = parseFloat(value.pass / (value.pass + value.fail)).toFixed(2);
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
	jsPassFail.appendChild(jsTable);
	jsTable.appendChild(jsTableHead);
	jsTableHead.appendChild(jsTr);
	jsTr.appendChild(jsTableH);
	jsTable.appendChild(jsTableBody);
	for (const [key, value] of Object.entries(js)) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		if (value.pass === 0) {
			td.textContent = parseFloat(0.001).toFixed(2);
		} else if (value.fail === 0) {
			td.textContent = parseFloat(1.001).toFixed(2);
		} else {
			td.textContent = parseFloat(value.pass / (value.pass + value.fail)).toFixed(2);
		}
		jsTableBody.appendChild(tr);
		tr.appendChild(td);
	}
}

function placeFailCharts(go, js) {
	createFailChart(go, "go-chart");
	createFailChart(js, "js-chart");
}

function createFailChart(piscine, chartName) {
	const piscineChart = document.getElementById(chartName);
	const svgNS = "http://www.w3.org/2000/svg";

	// Header bar of the chart.
	const headerBar = document.createElementNS(svgNS, "g");
	headerBar.classList.add("headerBar");

	const nameText = document.createElementNS(svgNS, "text");
	nameText.setAttributeNS(null, "x", 1);
	nameText.setAttributeNS(null, "y", 8);
	nameText.setAttributeNS(null, "dy", ".35em");
	nameText.textContent = "EXERCISE";

	const failsText = document.createElementNS(svgNS, "text");
	failsText.setAttributeNS(null, "x", 150);
	failsText.setAttributeNS(null, "y", 8);
	failsText.setAttributeNS(null, "dy", ".35em");
	failsText.textContent = "FAILS";

	const ratioText = document.createElementNS(svgNS, "text");
	ratioText.setAttributeNS(null, "x", 400);
	ratioText.setAttributeNS(null, "y", 8);
	ratioText.setAttributeNS(null, "dy", ".35em");
	ratioText.textContent = "RATIO";

	piscineChart.appendChild(headerBar);
	headerBar.appendChild(nameText);
	headerBar.appendChild(failsText);
	headerBar.appendChild(ratioText);

	// The informational part. Creates the bar, adds rect and text.
	let counter = 0;
	for (const [key, value] of Object.entries(piscine)) {
		// Check if too many fails.
		const fails = value.fail;
		let x = fails * 20;
		let over = false;
		if (x >= 200) {
			x = 200;
			over = true;
		}

		// calculate ratio.
		let ratio;
		if (value.pass === 0) {
			ratio = parseFloat(0.001).toFixed(2);
		} else if (value.fail === 0) {
			ratio = parseFloat(1.001).toFixed(2);
		} else {
			ratio = parseFloat(value.pass / (value.pass + value.fail)).toFixed(2);
		}

		// create row
		const bar = document.createElementNS(svgNS, "g");
		bar.classList.add("bar");

		const text = document.createElementNS(svgNS, "text");
		text.setAttributeNS(null, "x", 1);
		text.setAttributeNS(null, "y", counter * 20 + 28);
		text.setAttributeNS(null, "dy", ".35em");
		text.textContent = `${key}`;

		const rect = document.createElementNS(svgNS, "rect");
		rect.setAttributeNS(null, "x", 150);
		rect.setAttributeNS(null, "width", x);
		rect.setAttributeNS(null, "height", 18);
		rect.setAttributeNS(null, "y", counter * 20 + 20);

		const ftext = document.createElementNS(svgNS, "text");
		ftext.setAttributeNS(null, "x", 155 + x);
		ftext.setAttributeNS(null, "y", counter * 20 + 28);
		ftext.setAttributeNS(null, "dy", ".35em");
		ftext.textContent = `${fails}`;

		const rtext = document.createElementNS(svgNS, "text");
		rtext.setAttributeNS(null, "x", 400);
		rtext.setAttributeNS(null, "y", counter * 20 + 28);
		rtext.setAttributeNS(null, "dy", ".35em");
		rtext.textContent = `${ratio}`;

		if (over) {
			bar.classList.add("over");
		}

		piscineChart.appendChild(bar);
		bar.appendChild(text);
		bar.appendChild(rect);
		bar.appendChild(ftext);
		bar.appendChild(rtext);

		counter++;
	}

	piscineChart.setAttribute("height", counter * 20 + 20);
}

export { getPassFail, placePassFailRatio, placeFailCharts };
