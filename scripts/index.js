export async function checkWebshopReadyness() {
	const clientCode = document.getElementById("clientCode").value;
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const codes = document.getElementById("codes").value;

	// Fetch the data.
	try {
		const response = await fetch("http://127.0.0.1:8000/api/check", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				client_code: clientCode,
				username: username,
				password: password,
				codes: codes,
			}),
		});

		if (!response.ok) {
			alert("bad input data");
		}

		// Successful fetching
		if (response.ok) {
			const responseData = await response.json();
			console.log(responseData);
		}
	} catch (error) {
		console.log("Failed to fetch from render backend");
	}
}


export function addListeners() {
	const submit = document.getElementById("submit");
	submit.addEventListener("click", () => checkWebshopReadyness());
	window.addEventListener("keydown", (e) => {
		if (e.key == "Enter") {
			checkWebshopReadyness();
		}
	});
}
