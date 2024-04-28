export function placeAuditPie(ratio, up, down) {
	const auditPieChart = document.getElementById("audit-chart");
	const svgNS = "http://www.w3.org/2000/svg";

	const circumference = 628;

	// Necessary variables.
	const total = up + down;
	const percentage = (down / total) * 100;
	const oneFiveEightTotal = (circumference / 100) * percentage;
	const strokeDashNumber = (total / 100) * percentage;

	// Create the pie.
	const pie = document.createElementNS(svgNS, "circle");
	pie.classList.add("pie");
	pie.setAttributeNS(null, "cx", 100);
	pie.setAttributeNS(null, "cy", 100);
	pie.setAttributeNS(null, "r", 100);
	pie.style.strokeDasharray = 0 + " " + circumference;

	// Make the colored section.
	pie.style.strokeDasharray = `${oneFiveEightTotal}, ${circumference}`;

	// Append.
	auditPieChart.appendChild(pie);
}
