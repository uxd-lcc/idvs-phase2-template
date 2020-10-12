// This script generates HTML nodes for the home page of the project
const nav = d3.select("#nav");
const home = d3.select(".cover");
const intro = d3.select(".intro");
const questions = d3.select("#questions");
const footer = d3.select("footer");
const questionsNavigation = d3.select("#questions-navigation");

if (questions.size() > 0) {
  Promise.all([d3.text("/info.yml"), d3.text("/questions.yml")]).then(
    ([info, questionsData]) => {
      info = jsyaml.load(info);
      questionsData = jsyaml.load(questionsData);

      const cover = home.selectAll("div").data([info]).enter().append("div");

      cover
        .append("h1")
        .text((d) => d.title)
        .classed("cover__title", true);

      cover
        .append("div")
        .classed("authors", true)
        .selectAll("span")
        .data((d) => d.authors)
        .join("span")
        .text((d) => d.name);

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
        .append("div");
      question.append("h1").text((d) => d.title);
      question.append("p").text((d) => d.description);
      question
        .append("a")
        .attr("href", (d) => `./${d.folder}`)
        .text("go to question");
      question.append("img").attr("src", (d) => `./${d.folder}/${d.cover}`);
    }
  );
}

if (questionsNavigation.size() > 0) {
  Promise.all([d3.text("/questions.yml")]).then(([questionsData]) => {
    questionsData = jsyaml.load(questionsData);
    questionsNavigation
      .append("ul")
      .selectAll("li")
      .data(questionsData)
      .join("li")
      .append("a")
      .attr("href", (d) => "/" + d.folder)
      .text((d) => d.title);
  });
}

const datasetsContainer = d3.select("#datasets-container");
if (datasetsContainer.size() > 0) {
  Promise.all([d3.text("/questions.yml")]).then(([questionsData]) => {
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
