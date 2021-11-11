const questionsNavigation = d3.select("#questions-navigation");
if (questionsNavigation.size() > 0) {
  Promise.all([getTextAsync("../questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);
    questionsNavigation
      .append("a")
      .style("padding", "0 1rem")
      .attr("href", "../")
      .append("h4")
      .text("Home");

    const questionsList = questionsNavigation
      .append("div")
      .classed("questions--list", true);

    let questionsDropdown = questionsList
      .append("h4")
      .classed("navigation-handler", true)
      .style("cursor", "pointer")
      .text("Research questions")
      .append("div");

    questionsList
      .append("ol")
      .classed("closed", true)
      .style("height", "calc(1rem + " + questionsData.length * 50 + "px)")
      .selectAll("li")
      .data(questionsData)
      .enter()
      .append("li")
      .append("a")
      .attr("href", (d) => "../" + d.folder)
      .text((d) => d.title);

    questionsList.select(".navigation-handler").on("click", function () {
      console.log("click");
      const list = questionsList.select("ol");
      const isOpen = list.classed("closed");
      list.classed("closed", !isOpen);
    });
  });
}

const datasetsContainer = d3.select("#datasets-container");
if (datasetsContainer.size() > 0) {
  Promise.all([getTextAsync("../questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);

    // Get correct question based on location.pathname
    let pathName = window.location.pathname.split("/");
    pathName = pathName.filter(Boolean);
    pathName = pathName[pathName.length - 1].replace(/\//g, "");
    const datasetsData = questionsData.find(
      (d) => d.folder === pathName
    ).datasets;

    let datasets = datasetsContainer
      .append("ul")
      .classed("datasets", true)
      .selectAll("li")
      .data(datasetsData)
      .enter()
      .append("li");
    // .join("li");

    const titleDownload = datasets
      .append("span")
      .classed("dataset-download", true);

    titleDownload
      .append("a")
      .attr("href", (d) => d.src)
      .append("p")
      .attr("download", (d) => d.src)
      .text((d) => d.name);

    titleDownload
      .append("a")
      .classed("info", true)
      .attr("href", (d) => d.src)
      .attr("download", (d) => d.src)
      .text((d) => d.size);

    titleDownload
      .append("a")
      .classed("info", true)
      .attr("href", (d) => d.src)
      .attr("download", (d) => d.src)
      .text((d) => d.format);

    datasets
      .append("span")
      .append("p")
      .text((d) => d.description);
  });
}

const footer = d3.select(".footer");
if (footer.size() > 0) {
  // Footer //
  Promise.all([getTextAsync("../info.yml")]).then(([info]) => {
    info = jsyaml.load(info);
    const footerContainer = footer
      .append("div")
      .classed("footer__container", true);

    const footerLogo1 = footerContainer
      .append("div")
      .classed("footer__item course", true)
      .append("div")
      .classed("logo logo-course", true);

    footerLogo1.attr("style", (d) => {
      `background-image: url(./assets/img/${info["logoCourse"]})`;
    });

    const footerLogo2 = footerContainer
      .append("div")
      .classed("footer__item institute", true)
      .append("div")
      .classed("logo logo-institute", true);

    footerLogo2.attr("style", (d) => {
      `background-image: url(./assets/img/${info["logoInstitute"]})`;
    });

    const footerAuthors = footerContainer
      .append("div")
      .classed("footer__item authors", true);

    footerAuthors.append("h5").text("Project by");

    footerAuthors
      .selectAll("p")
      .data(info.authors)
      .enter()
      .append("p")
      .text((d) => d.name);

    const footerFaculty = footerContainer
      .append("div")
      .classed("footer__item faculty", true);

    footerFaculty.append("h5").text("Faculty");

    footerFaculty
      .selectAll("p")
      .data(info.faculty)
      .enter()
      .append("p")
      .text((d) => d.name);
  });
}
