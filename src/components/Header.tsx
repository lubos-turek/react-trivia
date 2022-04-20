import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 0 1 auto;
  align-self: center;
`

const Headline = styled.h1`
  font-size: 1em;
`

const Header = ({ children }: { children: ReactNode }) => (
  <Container>
    <Headline>{children}</Headline>
  </Container>
)

export default Header
