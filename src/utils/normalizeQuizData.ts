import decode from 'lean-he/decode'
import { Question } from '../types'
import { QuizDataQuestion } from "./fetchAndNormalizeQuizData";

export const normalizeQuizData = (data: QuizDataQuestion[]): Question[] =>
  data.reduce(
    (acc: Question[], obj: QuizDataQuestion) => [
      ...acc,
      {
        category: decode(obj.category),
        question: decode(obj.question),
        correctAnswer: obj.correct_answer === 'True',
        userAnswer: undefined,
        correct: undefined,
      },
    ],
    [],
  )
