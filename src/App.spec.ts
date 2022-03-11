import { machine } from "./machine";
import { interpret } from "xstate";
import { questions } from "./utils/quizData";

describe('App', () => {
  describe('transitions', () => {

    it('should transition to results when all questions answered', () => {
      const result = machine
        .withConfig({ guards: { allQuestionsAnswered: () => true } })
        .transition('quiz', 'ANSWER_FALSE');

      expect(result.value).toEqual('results');
    });
  })

  describe('integration', () => {

    it('should transition properly through machine', () => {
      // arrange
      const quizService = interpret(machine);
      quizService.start();

      // act
      quizService.send('START_QUIZ');
      questions.forEach(() => {
        quizService.send('ANSWER_TRUE');
      })

      // assert
      expect(quizService.state.value).toEqual('results')
      expect(quizService.state.context).toEqual({
        currentQuestion: 3,
        currentQuestionDisplay: 4,
        totalCorrectAnswers: 1,
        questions: expect.any(Array),
      })
    });
  })
})
