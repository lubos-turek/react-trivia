import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from '../types/Question'
import Store from '../types/Store'

const Results = () => {
  const latestResults = useSelector<Store, Question[] | undefined>(
    (state) => state.latestQuizResults
  )

  if (!latestResults) {
    return (
      <p>
        Complete the <Link to="/quiz">quiz</Link> first to see your results
      </p>
    )
  }

  const score = latestResults.filter(
    (q) => q.userAnswer === q.correctAnswer
  ).length
  const questionsAmount = latestResults.length

  return (
    <>
      <h1>
        You Scored
        <br />
        {score} / {questionsAmount}
      </h1>
      {latestResults.map((question, i) => (
        <p key={i}>
          {question.userAnswer === question.correctAnswer ? '+' : '-'}{' '}
          {question.question}
        </p>
      ))}
      <Link to="/quiz">PLAY AGAIN?</Link>
    </>
  )
}

export default Results
