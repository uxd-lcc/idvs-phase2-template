// This script generates HTML nodes for the home page of the project
const nav = d3.select("#nav");
const home = d3.select(".cover");
const intro = d3.select(".intro");
const questions = d3.select('#questions');
const footer = d3.select("footer");

if (questions.size() > 0) {
  Promise.all([
    d3.text('info.yml'),
    d3.text('questions.yml'),
  ])
  .then(([info, questionsData]) =>  {
    info = jsyaml.load(info);
    questionsData = jsyaml.load(questionsData);

    const cover = home.selectAll('div').data([info]).enter().append('div');

    cover.append("div").attr('style',d=>`background-image: url(./assets/${d["cover-image"]})`)
    .classed("cover__image", true);
    cover.append("div").classed("cover__background", true);
    cover.append("h3").text("DensityDesign Lab - Final Synthesis Design Studio 2020/2021")
    .classed("cover__heading", true);
    cover.append("h1").text(d => d.title)
    .classed("cover__title", true);
    cover.append("h2").text(d => d.subtitle)
    .classed("cover__subtitle", true);

    cover.append("div")
    .selectAll("p")
    .data(d => d.authors)
    .join("p")
    .text(d => d.name)
    .classed("authors", true);

    const introText = intro.selectAll("div").data([info]).enter().append("div");
    introText.append("p").text(d => d.description);

    const question = questions.selectAll('div').data(questionsData).enter().append('div').classed("question__card", true);
    question.append('img').attr('src',d=>`./${d.folder}/${d.cover}`);
    const questionMeta = question.append("div");
    questionMeta.append('h2').text(d=>d.title);
    questionMeta.append('p').text(d=>d.description);

    question.on("click", (e, d) => {
      console.log(d)
      window.location.href = "question-" + d.index;
    })

  });
};

const questionsNavigation = d3.select("#questions-navigation");
if (questionsNavigation.size() > 0) {
  Promise.all([d3.text("questions.yml")]).then(([questionsData]) => {
    questionsNavigation.append("a").attr("href","/").text("Home");

    const questionsList = questionsNavigation.append("div").classed("questions--list", true);

    let questionsDropdown = questionsList
      .append("a")
      .text("Research questions");

    questionsData = jsyaml.load(questionsData);
    questionsList
      .append("ul")
      .classed("open", false)
      .selectAll("li")
      .data(questionsData)
      .join("li")
      .append("a")
      .attr("href", (d) => "/" + d.folder)
      .text((d) => d.title);

    questionsDropdown.on("click", () => {
      d3.select(".questions--list ul").classed("open", () => {
        d3.select(".questions--list ul").classed("open", true) ? d3.select(".questions--list ul").classed("open", false) : d3.select(".questions--list ul").classed("open", true)
      });
    })
  });
}

const datasetsContainer = d3.select("#datasets-container");
if (datasetsContainer.size() > 0) {
  Promise.all([d3.text("questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);
    const pathName = window.location.pathname.replace(/\//g, "");
    const datasetsData = questionsData.find((d) => d.folder === pathName)
      .datasets;

    let datasets = datasetsContainer
      .append("ul")
      .selectAll("li")
      .data(datasetsData)
      .join("li");

    datasets.append("span").append('a').attr('href',d=>d.src).attr('download',d=>d.src).text((d) => d.name);
    datasets.append("span").text((d) => d.description);
  });
}
