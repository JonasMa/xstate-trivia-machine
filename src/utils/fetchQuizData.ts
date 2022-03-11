export const fetchQuizData = () =>
  fetch(
    `https://opentdb.com/api.php?amount=3&difficulty=easy&type=boolean`,
  ).then(response => response.json())
