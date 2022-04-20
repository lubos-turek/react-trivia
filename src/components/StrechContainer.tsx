import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7 1 auto;

  align-self: center;
  justify-content: center;
  flex-wrap: nowrap;
`

const StretchContainer = ({ children }: { children: ReactNode }) => (
  <Container>{children}</Container>
)

export default StretchContainer
