import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-self: center;
  justify-content: center;
  flex-wrap: nowrap;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  min-height: 30vh;
  width: 80vw;
  padding: 0 1.5em;
  overflow: auto;
`

const ProgressBox = styled.div`
  display: flex;
  align-self: center;
  padding-top: 1em;
`

type QuestionProps = {
  children: ReactNode
  number: number
  total: number
}

const Question = ({ children, number, total }: QuestionProps) => (
  <Container>
    <Box>{children}</Box>
    <ProgressBox>
      {number} of {total}
    </ProgressBox>
  </Container>
)

export default Question
