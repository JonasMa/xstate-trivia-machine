import React from 'react'
import { Button, Container, H1, P, TextContainer } from '../components'

interface WelcomeProps {
  startQuiz: () => void;
}
export const Welcome: React.FC<WelcomeProps> = ({startQuiz}) => (
  <Container>
    <H1 data-testid='welcome-header'>Welcome to the Trivia Challenge</H1>
    <TextContainer>
      <P>You will be presented some true or false questions.</P>
      <P>Are you ready?</P>
    </TextContainer>
    <Button onClick={startQuiz} data-testid='begin-button'>
      HELL YEAH!
    </Button>
  </Container>
)
