import { fetchQuizData, normalizeQuizData } from '.';

export const fetchAndNormalizeQuizData = async () => {
  try {
    const data: FetchQuizDataResponse = await fetchQuizData()
    return Promise.resolve(normalizeQuizData(data.results))
  } catch (error) {
    return Promise.reject(error)
  }
}


export interface FetchQuizDataResponse {
  response_code: number
  results: QuizDataQuestion[]
}

export interface QuizDataQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
