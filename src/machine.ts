import { assign, createMachine } from 'xstate'
import { questions } from "./utils/quizData";
import {Question} from './boilerplate/types';

export interface QuizContext {
  currentQuestion: number;
  currentQuestionDisplay: number;
  questions: Question[];
  totalCorrectAnswers: number;
}

export type QuizEvents =
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_FALSE' }
  | { type: 'ANSWER_TRUE' }
  | { type: 'PLAY_AGAIN' };

const INITIAL_CONTEXT: QuizContext = {
  currentQuestion: 0,
  currentQuestionDisplay: 1,
  totalCorrectAnswers: 0,
  questions,
};
export const machine = createMachine(
  {
    schema: {
      context: {} as QuizContext,
      events: {} as QuizEvents,
    },
    tsTypes: {} as import("./machine.typegen").Typegen0,
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
        const answer = type === 'ANSWER_FALSE';
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
      allQuestionsAnswered: (ctx) => ctx.questions!.every(question => question.correct !== undefined),
    }
  }
)
