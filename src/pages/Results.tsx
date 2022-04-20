import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Question from '../types/Question'
import Store from '../types/Store'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnswerResult from '../components/AnswerResult'

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
      <Header>
        You Scored
        <br />
        {score} / {questionsAmount}
      </Header>

      {latestResults.map((question, i) => (
        <AnswerResult question={question} key={i} />
      ))}

      <Footer>
        <Link to="/quiz">PLAY AGAIN?</Link>
      </Footer>
    </>
  )
}

export default Results
