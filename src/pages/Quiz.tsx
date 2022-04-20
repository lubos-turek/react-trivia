import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useQuestions from '../hooks/useQuestions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Question from '../components/Question'
import AnswerButton from '../components/AnswerButton'

const QUESTIONS_AMOUNT = 10

const Quiz = () => {
  const { questions, loading, refetch, error } = useQuestions(QUESTIONS_AMOUNT)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <p>
        {error}
        <button onClick={refetch}>Refetch</button>
      </p>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const handleAnswer = (answer: boolean) => {
    currentQuestion.userAnswer = answer
    if (currentQuestionIndex + 1 >= QUESTIONS_AMOUNT) {
      navigate('/results')
      dispatch({ type: 'QUIZ_FINISHED', payload: questions })
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <>
      <Header>{currentQuestion.category}</Header>

      <Question number={currentQuestionIndex + 1} total={QUESTIONS_AMOUNT}>
        {currentQuestion.question}
      </Question>

      <Footer>
        <AnswerButton onClick={() => handleAnswer(true)}>TRUE</AnswerButton>
        <AnswerButton onClick={() => handleAnswer(false)}>FALSE</AnswerButton>
      </Footer>
    </>
  )
}

export default Quiz
