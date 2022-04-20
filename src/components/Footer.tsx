import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 0 1 auto;
  align-self: center;
  font-size: 1em;
  padding: 1em 0;

  a {
    text-decoration: none;
    color: black;
  }
`

const Footer = ({ children }: { children: ReactNode }) => (
  <Container>{children}</Container>
)

export default Footer
