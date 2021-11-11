console.log("question 2 script is running! (D3.js example)");
Promise.all([getHtmlAsync("./question.html")]).then(function ([html]) {
  // populate page with content from question.html
  const questionContent = d3.select(html).selectAll("#inner-container > *");
  questionContent.each(function (d) {
    d3.select("#question-container").node().appendChild(this);
  });

  /**********************************
   * Edit below this line only      *
   * > Use d3js to modify, animate  *
   *  or make the SVG itinteractive *
   **********************************/

  // Load the data and use it to build the chart
  loadCsv("./data/data.csv", buildChart);

  // Define the function that actually builds the chart
  function buildChart(error, data) {
    // Make sure numbers load as numbers not strings
    convertNumbers(data);

    // Setup parameters for the chart
    let chartParams = {};
    chartParams["xCol"] = "index";
    chartParams["bubbleSizeCol1"] = "value1";
    chartParams["bubbleSizeCol2"] = "value2";
    chartParams["height"] = 250;

    // Draw the chart
    d3si = drawCircles("#visualisation", data, chartParams);
  }
});
