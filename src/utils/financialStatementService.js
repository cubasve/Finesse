import tokenService from "./tokenService";

const BASE_URL = "/api/financialstatements";

export default {
	show,
	create,
	update,
	deleteOne,
};

const array = window.location.href.split("/");
const month = array[array.length - 1];
const year = array[array.length - 2];

console.log("window.location.href", year, month);
function show() {
	const options = {
		method: "GET", //fetch automatically makes a GET request - code not needed
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + tokenService.getToken(),
		},
	};
	return fetch(`${BASE_URL}/${year}/${month}`, options).then((res) =>
		res.json()
	);
}

function create(financialStatement) {
	const options = {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + tokenService.getToken(),
		},
		body: JSON.stringify(financialStatement),
	};
	return fetch(`${BASE_URL}/${year}/${month}`, options).then((res) =>
		res.json()
	);
}

function update(financialStatement) {
	const options = {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + tokenService.getToken(),
		},
		body: JSON.stringify(financialStatement),
	};
	return fetch(`${BASE_URL}/${financialStatement.id}`, options).then((res) =>
		res.json()
	);
}

function deleteOne(financialStatement) {
	const options = {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
			Authorization: "Bearer " + tokenService.getToken(),
		},
		body: JSON.stringify(financialStatement),
	};
	return fetch(BASE_URL + "/" + financialStatement.id, options).then((res) =>
		res.json()
	);
}

//PATH: component --> serviceWorker --> API route using fetch --> controller fn --> re-render/redirect
//send request but it is defined in routes (Express)
