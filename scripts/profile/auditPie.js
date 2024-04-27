export function placeAuditPie(ratio, up, down) {
	const auditPieChart = document.getElementById("audit-chart");
	const svgNS = "http://www.w3.org/2000/svg";

	// Necessary variables.
	const total = up + down;
	const percentage = (down / total) * 100;
	const strokeDashNumber = (total / 100) * percentage;

	// Create the pie.
	const pie = document.createElementNS(svgNS, "circle");
	pie.classList.add("pie");
	pie.setAttributeNS(null, "cx", 200);
	pie.setAttributeNS(null, "cy", 200);
	pie.setAttributeNS(null, "r", 100);
	pie.style.strokeDasharray = 0 + " " + total;

	// Make the colored section.
	pie.style.strokeDasharray = `${strokeDashNumber}, ${total}`;

	// Append.
	auditPieChart.appendChild(pie);
}
