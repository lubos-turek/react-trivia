import { Link } from 'react-router-dom'

import Header from '../components/Header'
import StretchContainer from '../components/StrechContainer'
import Footer from '../components/Footer'

const Intro = () => {
  return (
    <>
      <Header>Welcome to the Trivia Challenge</Header>
      <StretchContainer>
        <StretchContainer>
          <p>You will be presented with 10 True or False questions.</p>
        </StretchContainer>
        <StretchContainer>
          <p>Can you score 100%?</p>
        </StretchContainer>
      </StretchContainer>
      <Footer>
        <Link to="/quiz">BEGIN</Link>
      </Footer>
    </>
  )
}

export default Intro
