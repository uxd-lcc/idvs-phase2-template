console.log("question 3 script is running! (YouTube example)");
Promise.all([d3.html("./question.html"), d3.html("./visualisation.svg")]).then(
  function ([html, svgDocument]) {
    // populate page with content from question.html
    const questionContent = d3.select(html).selectAll("body > *");
    questionContent.each(function (d) {
      d3.select("#question-container").node().appendChild(this);
    });

    // This example has a YouTube embed.
    // It doesn't need any JS.
  }
);
