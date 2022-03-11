import React from 'react'
import { useMachine } from '@xstate/react'
import { GlobalStyle } from './components'
import { machine } from './machine'
import { Quiz as QuizScreen, Results as ResultsScreen, Welcome as WelcomeScreen, } from './screens'
import { AppWrapper, Main } from './screens/ScreenUtils'

function App() {
  const [state, send] = useMachine(machine, { devTools: true })

  const renderScreen = () => {
    if (state.matches('welcome')) {
      return <WelcomeScreen startQuiz={() => send('START_QUIZ')}/>
    } else if (state.matches('quiz')) {
      return (
        <QuizScreen
          answerFalse={() => send({ type: 'ANSWER_FALSE' })}
          answerTrue={() => send({ type: 'ANSWER_TRUE' })}
          currentQuestionNumber={state.context.currentQuestionDisplay}
          question={
            state.context.questions[state.context.currentQuestion]
          }
          totalQuestions={state.context.questions.length}
        />
      );
    } else if (state.matches('results')) {
      return (
        <ResultsScreen
          playAgain={() => send('PLAY_AGAIN')}
          questions={state.context.questions}
          totalCorrectAnswers={state.context.totalCorrectAnswers}
          totalQuestions={state.context.questions.length}
        />
      )
    }
  }

  return (
    <AppWrapper>
      <GlobalStyle/>
      <Main>{renderScreen()}</Main>
    </AppWrapper>
  )
}

export default App
