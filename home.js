// This script generates HTML nodes for the home page of the project
const questions = d3.select('#questions');

Promise.all([
    d3.text('info.yml'),
    d3.text('questions.yml'),
  ])
  .then(([info, questionsData]) =>  {
    info = jsyaml.load(info);
    questionsData = jsyaml.load(questionsData);

    const question = questions.selectAll('div').data(questionsData).enter().append('div');
    question.append('h1').text(d=>d.title);
    question.append('p').text(d=>d.description);
    question.append('a').attr('href',d=>`./${d.folder}`).text('go to question');
    question.append('img').attr('src',d=>`./${d.folder}/${d.cover}`);

  });