import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Results from './Results'
import Store from '../types/Store'

const renderWithRedux = (component: React.ReactNode, initialState: Store) => {
  const store = createStore((state) => ({ ...state }), initialState)
  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    ),
    store,
  }
}

const sampleStoreDate: Store = {
  latestQuizResults: [
    {
      category: 'Entertainment: Video Games',
      question: 'Unturned originally started as a Roblox game.',
      correctAnswer: true,
      userAnswer: false,
    },
    {
      category: 'Entertainment: Video Games',
      question:
        'In the game "Melty Blood Actress Again Current Code", you can enter Blood Heat mode in Half Moon style.',
      correctAnswer: false,
      userAnswer: false,
    },
    {
      category: 'Science & Nature',
      question:
        'It was once believed that injecting shark cartilage into people would prevent them from contracting cancer.',
      correctAnswer: true,
      userAnswer: true,
    },
  ],
}

describe('Results Page', () => {
  afterEach(cleanup)

  it('displays link to Quiz page if there are not results in store', () => {
    renderWithRedux(<Results />, {})
    const linkElement = screen.getByText('quiz', { exact: false })
    expect(linkElement).toBeInTheDocument()
  })

  it('does not display results if there are none', () => {
    renderWithRedux(<Results />, {})
    const headerElement = screen.queryByText('You Scored', { exact: false })
    expect(headerElement).not.toBeInTheDocument()
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

  it('displays - next to correctly answered falsy question', () => {
    renderWithRedux(<Results />, sampleStoreDate)

    const questionElement = screen.getByText('Unturned originally started as', {
      exact: false,
    })
    const parentElement = questionElement.parentElement

    expect(parentElement?.firstChild?.textContent).toBe('-')
  })
})
