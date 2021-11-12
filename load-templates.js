// This script generates HTML nodes for the home page of the project
const nav = d3.select("#questions-navigation");
const home = d3.select(".cover");
const intro = d3.select(".intro");

const questions = d3.select("#questions");

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

if (questions.size() > 0) {
  Promise.all([
    getTextAsync("./info.yml"),
    getTextAsync("./questions.yml"),
  ]).then(([info, questionsData]) => {
    info = jsyaml.load(info);
    questionsData = jsyaml.load(questionsData);
    const cover = home.selectAll("div").data([info]).enter().append("div");

    cover
      .append("div")
      .attr(
        "style",
        (d) => `background-image: url(./assets/img/${d["cover-image"]})`
      )
      .classed("cover__image", true);
    cover.append("div").classed("cover__background", true);
    cover
      .append("h3")
      .text("BA UXD - Interactive Data Visualisation Studio 21-22 Phase 2")
      .classed("cover__heading", true);
    cover
      .append("h1")
      .text((d) => d.title)
      .classed("cover__title", true);
    cover
      .append("h2")
      .text((d) => d.subtitle)
      .classed("cover__subtitle", true);

    cover
      .append("div")
      .selectAll("p")
      .data((d) => d.authors)
      .enter()
      .append("p")
      .text((d) => d.name)
      .classed("authors", true);

    const introText = intro.selectAll("div").data([info]).enter().append("div");
    introText.append("p").text((d) => d.description);

    const question = questions
      .selectAll("div")
      .data(questionsData)
      .enter()
      .append("a")
      .attr("href", (d) => "./" + d.folder)
      .classed("question__card", true);
    question
      .append("h2")
      .text((d) => d.index + ". " + d.title)
      .classed("question__title", true);
    question.append("img").attr("src", (d) => `./${d.folder}/img/${d.cover}`);
    const questionMeta = question.append("div").classed("question__info", true);
    questionMeta.append("p").text((d) => d.description);
  });
}

const questionsNavigation = d3.select("#questions-navigation");
if (questionsNavigation.size() > 0) {
  Promise.all([getTextAsync("./questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);

    questionsNavigation
      .append("a")
      .style("padding", "0 1rem")
      .attr("href", "./")
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
      .attr("href", (d) => "./" + d.folder)
      .text((d) => d.title);

    questionsList.select(".navigation-handler").on("click", function () {
      const list = questionsList.select("ol");
      const isOpen = list.classed("closed");
      list.classed("closed", !isOpen);
    });
  });
}

const footer = d3.select(".footer");
if (footer.size() > 0) {
  // Footer //
  Promise.all([getTextAsync("./info.yml")]).then(([info]) => {
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
