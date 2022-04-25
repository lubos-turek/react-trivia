import { screen } from '@testing-library/react'

import Results from './Results'
import renderWithRedux from '../test/renderWithRedux'
import sampleStoreDate from '../test/sampleStoreData'

describe('Results Page', () => {
  it('displays link to Quiz page if there are not results in store', () => {
    renderWithRedux(<Results />, {})
    const linkElement = screen.getByText('quiz', { exact: false })
    expect(linkElement).toBeInTheDocument()
  })

  it('does not display results if there are none', () => {
    renderWithRedux(<Results />, {})
    const headerElement = screen.queryByText('You Scored', { exact: false })
    expect(headerElement).toBeNull()
  })

  it('displays latest results from store', () => {
    renderWithRedux(<Results />, sampleStoreDate)
    const headerElement = screen.getByText('You Scored', { exact: false })
    expect(headerElement).toBeInTheDocument()
  })

  it('displays the correct score', () => {
    renderWithRedux(<Results />, sampleStoreDate)
    const scoreElement = screen.getByText('2 / 3', { exact: false })
    expect(scoreElement).toBeInTheDocument()
  })

  it('displays all answered questions', () => {
    renderWithRedux(<Results />, sampleStoreDate)

    if (!sampleStoreDate.latestQuizResults) {
      throw new Error('Unexpected store state')
    } else {
      for (const question of sampleStoreDate.latestQuizResults) {
        const questionElement = screen.getByText(question.question)
        expect(questionElement).toBeInTheDocument()
      }
    }
  })

  it('displays + next to correctly answered truthy question', () => {
    renderWithRedux(<Results />, sampleStoreDate)

    const questionElement = screen.getByText('It was once believed that', {
      exact: false,
    })
    const parentElement = questionElement.parentElement

    expect(parentElement?.firstChild?.textContent).toBe('+')
  })

  it('displays + next to correctly answered falsy question', () => {
    renderWithRedux(<Results />, sampleStoreDate)

    const questionElement = screen.getByText('In the game "Melty Blood', {
      exact: false,
    })
    const parentElement = questionElement.parentElement

    expect(parentElement?.firstChild?.textContent).toBe('+')
  })

  it('displays - next to incorrectly answered question', () => {
    renderWithRedux(<Results />, sampleStoreDate)

    const questionElement = screen.getByText('Unturned originally started as', {
      exact: false,
    })
    const parentElement = questionElement.parentElement

    expect(parentElement?.firstChild?.textContent).toBe('-')
  })
})
