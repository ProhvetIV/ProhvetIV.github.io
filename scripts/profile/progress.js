const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function makeYAxisMaxNumber(number) {
	let n = number;
	let counter = 1;

	while (n > 10) {
		n /= 10;
		counter *= 10;
	}

	let rounded = Math.ceil(n) * counter;
	return rounded;
}

// Make an array of months, so that it starts from the current month.
function orderMonths() {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();

	const newArr = [];
	for (let i = currentMonth; i >= 0; i--) {
		newArr.unshift(months[i]);
	}
	for (let i = months.length - 1; i > currentMonth; i--) {
		newArr.unshift(months[i]);
	}

	console.log(newArr);
	return newArr;
}

function makeYAxisArrayNumbers(maxNumber) {
	let arr = [0];
	for (let i = 1; i < 10; i++) {
		arr.push((maxNumber / 10) * i);
	}
	return arr;
}

function placeProgress(progress, xp) {
	const progressChart = document.getElementById("progress-chart");
	const svgNS = "http://www.w3.org/2000/svg";

	// Create chart grid. First X-axis, then Y-axis.
	const gridX = document.createElementNS(svgNS, "g");
	const lineX = document.createElementNS(svgNS, "line");
	gridX.classList.add("grid", "x-grid");
	lineX.setAttributeNS(null, "x1", 90);
	lineX.setAttributeNS(null, "y1", 50);
	lineX.setAttributeNS(null, "x2", 90);
	lineX.setAttributeNS(null, "y2", 500);

	const gridY = document.createElementNS(svgNS, "g");
	const lineY = document.createElementNS(svgNS, "line");
	gridY.classList.add("grid", "y-grid");
	lineY.setAttributeNS(null, "x1", 90);
	lineY.setAttributeNS(null, "y1", 500);
	lineY.setAttributeNS(null, "x2", 1000);
	lineY.setAttributeNS(null, "y2", 500);

	// Add months.
	const gridXtext = document.createElementNS(svgNS, "g");
	gridXtext.classList.add("labels", "y-labels");
	const orderedMonths = orderMonths();
	orderedMonths.forEach((month, index) => {
		let x = index * 75 + 135;
		let y = 520;

		const monthText = document.createElementNS(svgNS, "text");
		monthText.setAttributeNS(null, "x", x);
		monthText.setAttributeNS(null, "y", y);
		monthText.textContent = month;
		gridXtext.appendChild(monthText);
	});

	// Add numbers to y-axis.
	const gridYtext = document.createElementNS(svgNS, "g");
	gridYtext.classList.add("labels", "y-labels");
	const arr = makeYAxisArrayNumbers(makeYAxisMaxNumber(xp));
	arr.forEach((n, index) => {
		let x = 60;
		let y = 500 - index * 45;

		const xpText = document.createElementNS(svgNS, "text");
		xpText.setAttributeNS(null, "x", x);
		xpText.setAttributeNS(null, "y", y);
		xpText.textContent = n;
		gridYtext.appendChild(xpText);
	});

	// Append everything in order.
	progressChart.appendChild(gridX);
	progressChart.appendChild(gridY);
	gridX.appendChild(lineX);
	gridY.appendChild(lineY);
	progressChart.appendChild(gridXtext);
	progressChart.appendChild(gridYtext);
}

export { placeProgress };
