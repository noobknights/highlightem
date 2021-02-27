let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ color });
	console.log('Default background color set to %cgreen', `color: ${color}`);
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		console.log(tabs);
	});
});

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
	console.log(req);
});
