var requestShort = function(longUrl, callback) {
	var http = new XMLHttpRequest();
	var url = "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDRPt_-ULWxExk38rskNC0EURZVOW1U_gk";
	var requestBody = { "longUrl": longUrl };
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json")

	http.onreadystatechange = function() {//Call a function when the state changes.
		if (http.readyState != 4)
			return ;

		console.log(http.responseText)
		var res = JSON.parse(http.responseText);
		callback(res.id);
	}

	http.send(JSON.stringify(requestBody))
}

var whenOnRequest = function(request, sender, sendResponse) {
	if (request.event == 'gotUrl') {	
		requestShort(request.longUrl, function(shortUrl) {
			sendResponse( { shortUrl: shortUrl } );
		});
		return true; // This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously
	}
}

chrome.runtime.onMessage.addListener(whenOnRequest);