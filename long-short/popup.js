document.onreadystatechange = function () {
    if (document.readyState != "complete")
    	return ;
    
    document.write("hello world")

    var bgPage = chrome.extension.getBackgroundPage()
    bgPage.requestShort('www.google.com', function(shortUrl) {
    	alert(shortUrl)
    });
}

