export function placeAuditPie(ratio, up, down) {
	const auditPieChart = document.getElementById("audit-chart");
	const svgNS = "http://www.w3.org/2000/svg";

	// Necessary variables.
	const total = up + down;
	const percentage = (down / total) * 100;
	const oneFiveEightTotal = (158 / 100) * percentage;
	const strokeDashNumber = (total / 100) * percentage;

	// Create the pie.
	const pie = document.createElementNS(svgNS, "circle");
	pie.classList.add("pie");
	pie.setAttributeNS(null, "cx", 100);
	pie.setAttributeNS(null, "cy", 100);
	pie.setAttributeNS(null, "r", 100);
	pie.style.strokeDasharray = 0 + " " + 158;

	// Make the colored section.
	pie.style.strokeDasharray = `${oneFiveEightTotal}, ${158}`;

	// Append.
	auditPieChart.appendChild(pie);
}
