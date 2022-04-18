import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import useQuestions from "../hooks/useQuestions"

const QUESTIONS_AMOUNT = 10;

const Quiz = () => {
  const { questions, loading } = useQuestions(QUESTIONS_AMOUNT)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (loading) {
    return <p>Loading</p>
  }

  const currentQuestion = questions[currentQuestionIndex]
  const handleAnswer = (answer: boolean) => {
    currentQuestion.userAnswer = answer
    if (currentQuestionIndex +1 >= QUESTIONS_AMOUNT) {
      navigate('/results')
      dispatch({type: 'QUIZ_FINISHED', payload: questions})
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <>
      <h1>{currentQuestion.category}</h1>
      <p>{currentQuestion.question}</p>
      <p>{currentQuestionIndex + 1} of {QUESTIONS_AMOUNT}</p>
      <button onClick={() => handleAnswer(true)}>TRUE</button>
      <button onClick={() => handleAnswer(false)}>FALSE</button>
    </>
  )
}

export default Quiz