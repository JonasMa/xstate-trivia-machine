import { assign } from "xstate";
import { AppMachineContext, AppMachineEvent } from "./types";

export const options = {
  actions: {
    updateAnswer: assign((ctx: AppMachineContext, { type }: AppMachineEvent) => {
      const answer = type === 'ANSWER_TRUE';
      return ({
        questions: [
          ...ctx.questions!.slice(0, ctx.currentQuestion),
          {
            ...ctx.questions![ctx.currentQuestion],
            userAnswer: answer,
            correct:
              ctx.questions![ctx.currentQuestion].correctAnswer === answer,
          },
          ...ctx.questions!.slice(ctx.currentQuestion + 1),
        ],
        totalCorrectAnswers:
          ctx.questions![ctx.currentQuestion].correctAnswer === answer
            ? (ctx.totalCorrectAnswers += 1)
            : ctx.totalCorrectAnswers,
        currentQuestion: ctx.currentQuestion += 1,
        currentQuestionDisplay: ctx.currentQuestionDisplay += 1,
      });
    }),
  },
  guards: {
    allQuestionsAnswered: (ctx: AppMachineContext) =>
      (
        ctx.questions!.every(
          (question) => question.correct !== undefined,
        )
      ),
  },
};
