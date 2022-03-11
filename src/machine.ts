import { assign, createMachine } from 'xstate'
import { questions } from "./utils/quizData";
import { options } from "./options";
import { AppMachineContext, AppMachineEvent, MachineTypeState } from "./types";
import { inspect } from "@xstate/inspect";

inspect({ iframe: false /* open in new window*/ });

export const machine = createMachine<AppMachineContext, AppMachineEvent, MachineTypeState>(
  {
    id: 'Machine',
    initial: 'welcome',
    context: {
      currentQuestion: 0,
      currentQuestionDisplay: 1,
      totalCorrectAnswers: 0,
    },
    states: {
      welcome: {
        on: {
          START_QUIZ: 'loading',
        },
      },
      loading: {
        entry: assign({
          questions
        }),
        always: 'quiz',
      },
      failure: {
        after: {
          5000: 'loading',
        },
        on: {
          RETRY: 'loading',
          START_OVER: 'welcome',
        },
      },
      quiz: {
        always: {
          target: 'results',
          cond: 'allQuestionsAnswered',
        },
        on: {
          ANSWER_FALSE: {
            actions: 'updateAnswer',
          },
          ANSWER_TRUE: {
            actions: 'updateAnswer',
          },
        },
      },
      results: {
        on: {
          PLAY_AGAIN: 'welcome',
        },
        exit: assign({
          currentQuestion: 0,
          currentQuestionDisplay: 1,
          totalCorrectAnswers: 0,
          questions
        }),
      },
    },
  },
  options
)
