var whenOnCopy = function(e) {
	// e.preventDefault();
	console.log(e)

	var data = e.clipboardData.getData('text');
	console.log('copy', data);
}

var whenOnPaste = function(e) {
	// e.preventDefault();

	var data = e.clipboardData.getData('text');
	console.log('paste:', data);

	if (data.length < 22)
		return ;

	if (!isValidUrl(data))
		return ;

	chrome.runtime.sendMessage({
		event: 'gotUrl',
		longUrl: data
	}, function(response) {
		// alert(response.shortUrl)
		prompt("I have shorter URL :) (may expire)", response.shortUrl)
	});
}

var isValidUrl = function(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

// document.addEventListener('copy', whenOnCopy);
document.addEventListener('paste', whenOnPaste);