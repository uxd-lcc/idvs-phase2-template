// This script generates HTML nodes for the home page of the project
const nav = d3.select("#questions-navigation");
const home = d3.select(".cover");
const intro = d3.select(".intro");
const questions = d3.select("#questions");

if (questions.size() > 0) {
  Promise.all([d3.text("info.yml"), d3.text("questions.yml")]).then(
    ([info, questionsData]) => {
      info = jsyaml.load(info);
      questionsData = jsyaml.load(questionsData);

      const cover = home.selectAll("div").data([info]).enter().append("div");

      cover
        .append("div")
        .attr(
          "style",
          (d) => `background-image: url(./assets/${d["cover-image"]})`
        )
        .classed("cover__image", true);
      cover.append("div").classed("cover__background", true);
      cover
        .append("h3")
        .text("DensityDesign Lab - Final Synthesis Design Studio 2020/2021")
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
        .join("p")
        .text((d) => d.name)
        .classed("authors", true);

      const introText = intro
        .selectAll("div")
        .data([info])
        .enter()
        .append("div");
      introText.append("p").text((d) => d.description);

      const question = questions
        .selectAll("div")
        .data(questionsData)
        .enter()
        .append("div")
        .classed("question__card", true);
      question
        .append("h2")
        .text((d) => d.title)
        .classed("question__title", true);
      question.append("img").attr("src", (d) => `./${d.folder}/${d.cover}`);
      const questionMeta = question
        .append("div")
        .classed("question__info", true);
      questionMeta.append("p").text((d) => d.description);

      question.on("click", (e, d) => {
        console.log(d);
        window.location.href = "question-" + d.index;
      });
    }
  );
}

const questionsNavigation = d3.select("#questions-navigation");
if (questionsNavigation.size() > 0) {
  console.log("question navigator");

  Promise.all([d3.text("/questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);

    questionsNavigation
      .append("a")
      .style("padding", "0 1rem")
      .attr("href", "/")
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
      .style("height", "calc(1rem + " + questionsData.length * 20 + "px)")
      .selectAll("li")
      .data(questionsData)
      .join("li")
      .append("a")
      .attr("href", (d) => "/" + d.folder)
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
  Promise.all([d3.text("/questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);
    console.log(questionsData);
    const pathName = window.location.pathname.replace(/\//g, "");
    const datasetsData = questionsData.find((d) => d.folder === pathName)
      .datasets;

    let datasets = datasetsContainer
      .append("ul")
      .classed("datasets", true)
      .selectAll("li")
      .data(datasetsData)
      .join("li");

    const titleDownload = datasets.append("span").classed('dataset-download', true);

    titleDownload
      .append("a")
      .attr("href", (d) => d.src)
      .append('p')
      .attr("download", (d) => d.src)
      .text((d) => d.name);

    titleDownload
      .append("a")
      .classed('info', true)
      .attr("href", (d) => d.src)
      .attr("download", (d) => d.src)
      .text((d) => d.size);

    titleDownload
      .append("a")
      .classed('info', true)
      .attr("href", (d) => d.src)
      .attr("download", (d) => d.src)
      .text((d) => d.format);

    datasets.append("span").append('p').text((d) => d.description);
  });
}

const footer = d3.select(".footer");
if (footer.size() > 0) {
  // Footer //
  console.log('do footer')
  Promise.all([
      d3.text('/info.yml')
    ])
    .then(([info]) => {
      info = jsyaml.load(info);
      const footerContainer = footer
        .append("div")
        .classed("footer__container", true);

      const footerLogo1 = footerContainer
        .append("div")
        .classed("footer__item", true)
        .append("div")
        .classed("logo", true)
        .style("background-image", `url(/assets/${info.logoDensity})`);

      const footerLogo2 = footerContainer
        .append("div")
        .classed("footer__item", true)
        .append("div")
        .classed("logo", true)
        .style("background-image", `url(/assets/${info.logoPoli})`);

      const footerAuthors = footerContainer
        .append("div")
        .classed("footer__item", true);

      footerAuthors
        .append("h5")
        .text("Project by");

      footerAuthors
        .selectAll("p")
        .data(info.authors)
        .join("p")
        .text(d => d.name);


      const footerFaculty = footerContainer
        .append("div")
        .classed("footer__item", true);

      footerFaculty
        .append("h5")
        .text("Faculty");

      footerFaculty
        .selectAll("p")
        .data(info.faculty)
        .join("p")
        .text(d => d.name);

      const footerAssistants = footerContainer
        .append("div")
        .classed("footer__item", true);

      footerAssistants
        .append("h5")
        .text("Assistants");

      footerAssistants
        .selectAll("p")
        .data(info.assistants)
        .join("p")
        .text(d => d.name);
    })


}
