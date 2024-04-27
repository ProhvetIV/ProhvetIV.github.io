const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

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

	return newArr;
}

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

// Make an array of numbers for Y axis.
function makeYAxisArrayNumbers(maxNumber) {
	let arr = [0];
	for (let i = 1; i < 10; i++) {
		arr.push((maxNumber / 10) * i);
	}
	return arr;
}

function getDayOfYear(date) {
	var start = new Date(date.getFullYear(), 0, 0);
	var diff = date - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	return day;
}

function placeProgress(progress, xp) {
	const progressChart = document.getElementById("progress-chart");
	const svgNS = "http://www.w3.org/2000/svg";

	// Create chart grid. First X-axis, then Y-axis.
	const gridX = document.createElementNS(svgNS, "g");
	const lineX = document.createElementNS(svgNS, "line");
	gridX.classList.add("grid", "x-grid");
	lineX.setAttributeNS(null, "x1", 120);
	lineX.setAttributeNS(null, "y1", 75);
	lineX.setAttributeNS(null, "x2", 120);
	lineX.setAttributeNS(null, "y2", 500);

	const gridY = document.createElementNS(svgNS, "g");
	const lineY = document.createElementNS(svgNS, "line");
	gridY.classList.add("grid", "y-grid");
	lineY.setAttributeNS(null, "x1", 120);
	lineY.setAttributeNS(null, "y1", 500);
	lineY.setAttributeNS(null, "x2", 1260);
	lineY.setAttributeNS(null, "y2", 500);

	// Add months.
	// 12 months * 91
	// 364 days * 3px width = 1092
	const gridXtext = document.createElementNS(svgNS, "g");
	gridXtext.classList.add("labels", "y-labels");
	const orderedMonths = orderMonths();
	orderedMonths.forEach((month, index) => {
		let x = index * 91 + 165;
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
		let x = 90;
		let y = 505 - index * 45;

		const xpText = document.createElementNS(svgNS, "text");
		xpText.setAttributeNS(null, "x", x);
		xpText.setAttributeNS(null, "y", y);
		xpText.textContent = n;
		gridYtext.appendChild(xpText);
	});

	// Add axes and labels.
	const axes = document.createElementNS(svgNS, "g");
	axes.classList.add("data");
	axes.setAttributeNS(null, "data-setname", "axes");
	let cumulativeXP = 0;
	progress.forEach((exercise) => {
		const today = new Date(Date.now());
		const past = new Date(exercise.createdAt);
		const dateStr = past.toString();
		const dateToText = dateStr.split(" ").slice(1, 3);

		cumulativeXP += exercise.amount;

		const x = (364 - (today - past) / (1000 * 60 * 60 * 24)) * 2.7 + 120;
		const yPercentage = (cumulativeXP / xp) * 100;
		const y = 500 - (400 / 100) * yPercentage;

		console.log(xp);
		console.log(exercise.amount);
		console.log(yPercentage);
		console.log(y);

		const axe = document.createElementNS(svgNS, "circle");
		axe.setAttributeNS(null, "cx", x);
		axe.setAttributeNS(null, "cy", y);
		axe.setAttributeNS(null, "r", 3);
		axes.appendChild(axe);

		const label = document.eateElementNS(svgNS, "text");
		label.setAttributeNS(null, "x", x - 10);
		label.setAttributeNS(null, "y", y + 20);
		label.textContent = `${dateToText}\n+${exercise.amount / 1000}kB`;
		axes.appendChild(label);
	});

	// Append everything in order.
	progressChart.appendChild(gridX);
	progressChart.appendChild(gridY);
	gridX.appendChild(lineX);
	gridY.appendChild(lineY);
	progressChart.appendChild(gridXtext);
	progressChart.appendChild(gridYtext);
	progressChart.appendChild(axes);
}

export { placeProgress };
