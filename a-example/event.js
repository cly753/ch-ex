function injectedMethod(tab, method, callback) {
	console.log(arguments.callee.toString());

	chrome.tabs.executeScript(tab.id, {
		file: "inject.js",
		allFrames: false,
		matchAboutBlank: false,
		runAt: "document_idle"
	}, function() {
		chrome.tabs.sendMessage(tab.id, {
			method: method
		}, callback);
	});

	chrome.tabs.insertCSS(tab.id, {
		code: "body {"
			+ "background-image: url(\"http://img3.douban.com/view/photo/photo/public/p1828557097.jpg\");"
			+ "background-size: 100%;"
			+ "}",
		allFrames: false,
		matchAboutBlank: false,
		runAt: "document_idle"
	}, function() {
		// alert("insertCSS ok.");
	});
}

function getBgColor(tab) {
	console.log(arguments.callee.toString());

	injectedMethod(tab, "getBgColor", function(response) {
		var colors = response.data;
		if (colors && colors.length) {
			var url = "http://colorpeek.com/#" + colors.join(",");
			chrome.tabs.create({
				url: url
			});
			// chrome.tabs.remove(tab.id);
		}
		else {
			alert("No background color was found...");
		}
		return true;
	});
}

chrome.browserAction.onClicked.addListener(getBgColor);