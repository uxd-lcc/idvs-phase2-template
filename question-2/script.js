console.log("question 2 script is running! (D3.js example)");
Promise.all([d3.html("./question.html"), d3.html("./visualisation.svg")]).then(
  function ([html, svgDocument]) {
    // populate page with content from question.html
    const questionContent = d3.select(html).selectAll("body > *");
    questionContent.each(function (d) {
      d3.select("#question-container").node().appendChild(this);
    });

    // Bring the visualization inside the page by using plain JS
    let svgNode = svgDocument.querySelector("svg");
    let container = document.querySelector("#visualisation");
    container.appendChild(svgNode);

    /**********************************
     * Edit below this line only      *
     * > Use d3js to modify, animate  *
     *  or make the SVG itinteractive *
     **********************************/
  }
);
