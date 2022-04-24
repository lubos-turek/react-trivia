import styled from 'styled-components'
import Question from '../types/Question'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: grey;
  padding: 0.5em 0;
`

const IconContainer = styled.div`
  flex: 1 0 auto;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  min-width: 1.5em;
`

const QuestionTextContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  text-align: left;
`

const AnswerResult = ({ question }: { question: Question }) => {
  const isAnswerCorrect = question.userAnswer === question.correctAnswer

  return (
    <Wrapper>
      <IconContainer>{isAnswerCorrect ? '+' : '-'}</IconContainer>
      <QuestionTextContainer>{question.question}</QuestionTextContainer>
    </Wrapper>
  )
}

export default AnswerResult
