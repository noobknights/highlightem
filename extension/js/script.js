let startBtn = document.getElementById("start");

function test() {
	let supportedSites = {
		amazon: ".s-result-item",
		flipkart: "[data-id]",
		bigbasket: ".item",
	};

	let currentSite = window.location.host;
	currentSite = currentSite.split(".")[1];
	console.log(currentSite);
	let allItems = document.querySelectorAll(supportedSites[currentSite]);
	console.log(allItems);
}

startBtn.onclick = function () {
	chrome.tabs.executeScript({
		code: '(' + test + ')();'
	}, (results) => {
		console.log(results);
	});
}