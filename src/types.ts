// Typestate
export type MachineTypeState = MachineDefaultState | MachineQuizState;

export interface MachineDefaultState {
  value: 'welcome' | 'loading' | 'failure';
  context: AppMachineContext;
}

export interface MachineQuizState {
  value: 'quiz' | 'results';
  context: AppMachineQuizContext;
}


// Events
export interface AppMachineEvent {
  type: 'START_QUIZ' | 'RETRY' | 'START_OVER' | 'PLAY_AGAIN' | 'ANSWER_TRUE' | 'ANSWER_FALSE';
}

export interface AppMachineQuizContext extends AppMachineContext {
  questions: Question[];
}


// Context
export interface AppMachineContext {
  currentQuestion: number;
  currentQuestionDisplay: number;
  questions?: Question[];
  totalCorrectAnswers: number;
}

export interface Question {
  category: string
  question: string
  correctAnswer: boolean
  userAnswer?: boolean
  correct?: boolean
}
