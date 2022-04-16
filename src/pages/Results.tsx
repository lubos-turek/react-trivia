import { Link } from "react-router-dom"

const Results = () => {
  return (
    <>
      <h1>You Scored<br />3 / 10</h1>
      <Link to="/quiz">PLAY AGAIN?</Link>
    </>
  )
}

export default Results