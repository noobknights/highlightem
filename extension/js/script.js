let startBtn = document.getElementById("start");

function start() {
	class AllBrand {
		constructor(data) {
			this.data = data
			this.newdata = [];
		}

		parseData = (data) => data.replace(/\n|\r/g, " ").trim();

		amazon = () => {
			this.data.forEach((e) => {
				let dataAsin = e.getAttribute("data-asin");
				let dataIndex = e.getAttribute("data-index");

				if (dataAsin && dataIndex) {
					var str = this.parseData(e.innerText);
					this.newdata.push(str);
				}
			});
			return this.newdata;
		}

		flipkart = () => {
			this.data.forEach((e) => {
				let dataId = e.getAttribute("data-id");

				if (dataId) {
					var str = this.parseData(e.innerText);
					this.newdata.push(str);
				}
			});
			return this.newdata;
		}

		bigbasket = () => {
			this.data.forEach((e) => {
				let itemClass = e.classList.contains("item");

				if (itemClass) {
					var str = this.parseData(e.innerText);
					this.newdata.push(str);
				}
			});
			return this.newdata;
		}
	};

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

	let itemsTitle = [];

	const getData = new AllBrand(allItems);

	if (currentSite == 'amazon') {
		itemsTitle = getData.amazon();
	}
	else if (currentSite == 'flipkart') {
		itemsTitle = getData.flipkart();
	}
	else if (currentSite == 'bigbasket') {
		itemsTitle = getData.bigbasket();
	}
	console.log(itemsTitle);
};

startBtn.onclick = function () {
	chrome.tabs.executeScript({
		code: '(' + start + ')();'
	}, (results) => {
		console.log(results);
	});
};