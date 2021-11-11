function getTextAsync(url) {
  return new Promise(function (resolve, reject) {
    d3.request(url)
      .mimeType("text/plain")
      .response(function (xhr) {
        return xhr.responseText;
      })
      .get(resolve);
  });
}

function getHtmlAsync(url) {
  return new Promise(function (resolve, reject) {
    d3.request(url)
      .mimeType("text/html")
      .response(function (xhr) {
        return document
          .createRange()
          .createContextualFragment(xhr.responseText);
      })
      .get(resolve);
  });
}
