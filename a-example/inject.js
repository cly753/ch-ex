var injected = injected || (function() {
	console.log(arguments.callee.toString());

	var method = {};
	method.getBgColor = function() {
		var colors = {};
		var nodes = document.querySelectorAll("*");
		var node, nodeArea, bgColor, i;

		for (i = 0; i < nodes.length; i++) {
			node = nodes[i];
			nodeArea = node.clientWidth * node.clientHeight;
			bgColor = window.getComputedStyle(node)["background-color"];
			bgColor = bgColor.replace(/ /g, "");
			if (bgColor != "rgb(255, 255, 255)" &&
				!(bgColor.indexOf("rgba") === 00 && bgColor.substr(-3) === ",0)")
			) {
				colors[bgColor] = (colors[bgColor] >> 0) + nodeArea;
			}
		}

		return Object.getOwnPropertyNames(colors).sort(function(a, b) {
			return colors[b] - colors[a];
		});
	};

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		console.log(arguments.callee.toString());

		var data = {};
		if (method.hasOwnProperty(request.method))
			data = method[request.method]();
		sendResponse({data: data});
		return true;
	});

	return true;
})();