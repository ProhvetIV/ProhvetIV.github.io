export function placeAuditPie(ratio, up, down) {
	const auditPieChart = document.getElementById("audit-chart");
	const svgNS = "http://www.w3.org/2000/svg";

	// Necessary variables. Calculate circumference, the percentega of the
	// audits received compared to total and the
	const circumference = 628;
	const total = up + down;
	const percentage = (down / total) * 100;
	const strokeDashNumber = (circumference / 100) * percentage;

	// Create the pie.
	const pie = document.createElementNS(svgNS, "circle");
	pie.classList.add("pie");
	pie.setAttributeNS(null, "cx", 200);
	pie.setAttributeNS(null, "cy", 100);
	pie.setAttributeNS(null, "r", 100);
	pie.style.strokeDasharray = 0 + " " + circumference;

	// Make the colored section.
	pie.style.strokeDasharray = `${strokeDashNumber}, ${circumference}`;

	// Create legend for represeneting audit ratio, audits given and audits received.
	// First create circles and then text elements for numbers.
	const circlesAndTexts = document.createElementNS(svgNS, "g");
	circlesAndTexts.classList.add("audit-pie-circles");
	for (let i = 0; i < arguments.length; i++) {
		const circle = document.createElementNS(svgNS, "circle");
		if (i === 1) {
			circle.classList.add("audit-pie-circle-green");
			circle.style.fill = "greenyellow";
		} else if (i === 0) {
			circle.classList.add("audit-pie-circle-red");
			circle.style.fill = "red";
		} else {
			circle.style.fill = "black";
		}
		circle.setAttributeNS(null, "cx", 400);
		circle.setAttributeNS(null, "cy", (i + 1) * 50 + 125);
		circle.setAttributeNS(null, "r", 5);

		const text = document.createElementNS(svgNS, "texy");
		text.setAttributeNS(null, "x", 400);
		text.setAttributeNS(null, "y", (i + 1) * 50 + 125);
		text.textContent = arguments[i];

		circlesAndTexts.appendChild(circle);
		circlesAndTexts.appendChild(text);
	}

	// Append.
	auditPieChart.appendChild(pie);
	auditPieChart.appendChild(circlesAndTexts);
}
