console.log("question 3 script is running! (YouTube example)");
Promise.all([getHtmlAsync("./question.html")]).then(function ([html]) {
  // populate page with content from question.html
  const questionContent = d3.select(html).selectAll("#inner-container > *");
  questionContent.each(function (d) {
    d3.select("#question-container").node().appendChild(this);
  });

  // This example has a YouTube embed.
  // It doesn't need any JS.
});
