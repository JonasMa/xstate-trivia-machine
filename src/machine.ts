import { assign, createMachine, DoneInvokeEvent } from 'xstate'
import { questions } from "./utils/quizData";
import { options } from "./options";
import { AppMachineContext, AppMachineEvent, MachineTypeState, Question } from "./types";
import { inspect } from "@xstate/inspect";
import { fetchAndNormalizeQuizData } from "./utils";

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
        invoke: {
          id: 'getQuizData',
          src: () => fetchAndNormalizeQuizData(),
          onDone: {
            target: 'quiz',
            actions: assign({
              questions: (_, event: DoneInvokeEvent<Question[]>) => event.data,
            }),
          },
          onError: {
            target: 'failure',
          },
        },
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
