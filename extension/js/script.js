let startBtn = document.getElementById("start");

async function start() {
	const url = "https://highlightem.herokuapp.com";

	class AllBrand {
		constructor(data) {
			this.data = data;
			this.newdata = [];
			this.domdata = [];
		}

		parseData = (data) =>
			data
				.replace(/\n|\r/g, " ")
				.replace(/[^a-zA-Z\s]/g, "")
				.replace(/\s\s+/g, " ")
				.trim();

		amazon = () => {
			this.data.forEach((e) => {
				let dataAsin = e.getAttribute("data-asin");
				let dataIndex = e.getAttribute("data-index");

				if (dataAsin && dataIndex) {
					var str = this.parseData(e.innerText);
					this.domdata.push(e);
					this.newdata.push(str);
				}
			});
			return [this.newdata, this.domdata];
		};

		flipkart = () => {
			this.data.forEach((e) => {
				let dataId = e.getAttribute("data-id");

				if (dataId) {
					var str = this.parseData(e.innerText);
					this.domdata.push(e);
					this.newdata.push(str);
				}
			});
			return [this.newdata, this.domdata];
		};

		bigbasket = () => {
			this.data.forEach((e) => {
				let itemClass = e.classList.contains("item");

				if (itemClass) {
					var str = this.parseData(e.innerText);
					this.domdata.push(e);
					this.newdata.push(str);
				}
			});
			return [this.newdata, this.domdata];
		};
	}

	let supportedSites = {
		amazon: ".s-result-item",
		flipkart: "[data-id]",
		bigbasket: ".item",
	};

	let currentSite = window.location.host;
	currentSite = currentSite.split(".")[1];

	// console.log(currentSite);

	let query = window.location.search;
	query = query.slice(1, -1);
	query = query.split("&")[0].split("=")[1].replace("%20", " ");

	let allItems = document.querySelectorAll(supportedSites[currentSite]);

	// console.log(allItems);

	let items = [];
	const getData = new AllBrand(allItems);

	if (currentSite == "amazon") items = getData.amazon();
	else if (currentSite == "flipkart") items = getData.flipkart();
	else if (currentSite == "bigbasket") items = getData.bigbasket();

	let data = { query, items: items[0] };
	console.log(data);

	const req = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
	req.json().then((e) => {
		// console.log(e);
		// console.log(items[1][e.ans]);
		var itemsArr = e.ans;
		itemsArr.forEach((i) => {
			var item = items[1][i];
			item.style.border = "5px solid red";
		});
	});
}

startBtn.onclick = async function () {
	await chrome.tabs.executeScript(
		{
			code: "(" + start + ")();",
		},
		(results) => {
			console.log(results);
		}
	);
};
