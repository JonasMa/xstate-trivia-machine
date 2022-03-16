import { assign, createMachine } from 'xstate'
import { questions } from "./utils/quizData";

const INITIAL_CONTEXT = {
  currentQuestion: 0,
  currentQuestionDisplay: 1,
  totalCorrectAnswers: 0,
  questions,
};

export const machine = createMachine(
  {
    id: "QuizMachine",
    initial: "welcome",
    context: INITIAL_CONTEXT,
    states: {
      welcome: {
        on: {
          START_QUIZ: {
            target: "#QuizMachine.quiz"
          }
        }
      },
      quiz: {
        always: {
          cond: "allQuestionsAnswered",
          target: "#QuizMachine.results"
        },
        on: {
          ANSWER_FALSE: {
            actions: "updateAnswer",
            target: "#QuizMachine.quiz"
          },
          ANSWER_TRUE: {
            actions: "updateAnswer",
            target: "#QuizMachine.quiz"
          }
        }
      },
      results: {
        exit: "resetQuiz",
        on: {
          PLAY_AGAIN: {
            target: "#QuizMachine.welcome"
          }
        }
      }
    }
  },
  {
    actions: {
      updateAnswer: assign((ctx, {type}) => {
        const answer = type === 'ANSWER_TRUE';
        return {
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
        };
      }),
      resetQuiz: assign(INITIAL_CONTEXT),
    },
    guards: {
      allQuestionsAnswered: (ctx) => ctx.questions.every(question => question.correct !== undefined),
    }
  }
)
