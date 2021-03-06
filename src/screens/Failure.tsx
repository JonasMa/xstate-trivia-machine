import React from 'react'
import { Actions, Button, Container, H1, P, TextContainer } from '../components'

interface FailureProps {
  retry: () => void
  startOver: () => void
}

export const Failure: React.FC<FailureProps> = ({retry, startOver}) => (
  <Container>
    <H1 data-testid='failure-header'>Failure!</H1>
    <TextContainer>
      <P>Looks like there where a problem.</P>
      <P>You can retry loading the game or start over.</P>
      <P>Automatic retry in 5 seconds.</P>
    </TextContainer>
    <Actions>
      <Button onClick={retry} data-testid='retry-button'>
        Retry
      </Button>
      <Button onClick={startOver} data-testid='start-over-button'>
        Start Over
      </Button>
    </Actions>
  </Container>
)
