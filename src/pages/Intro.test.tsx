import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import Intro from './Intro'

const renderWithRouter = (component: React.ReactNode) =>
  render(<BrowserRouter>{component}</BrowserRouter>)

describe('Intro Page', () => {
  it('displays welcome message', () => {
    renderWithRouter(<Intro />)
    const headerElement = screen.getByText(/Welcome to the Trivia Challenge/i)
    expect(headerElement).toBeInTheDocument()
  })

  it('displays link to Quiz page', () => {
    renderWithRouter(<Intro />)
    const linkElement = screen.getByText('BEGIN')
    expect(linkElement).toBeInTheDocument()
  })
})
