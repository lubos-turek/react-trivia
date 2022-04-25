import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Quiz from './Quiz'
import renderWithRedux from '../test/renderWithRedux'
import useQuestions from '../hooks/useQuestions'
import sampleUseQuestionData from '../test/sampleUseQuestionsData'
import { useDispatch } from 'react-redux'

jest.mock('../hooks/useQuestions', () => jest.fn())

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

describe('Quiz Page', () => {
  it('displays "Loading" when questions request is loading', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({ loading: true })

    renderWithRedux(<Quiz />, {})
    const loadingElement = screen.getByText('Loading')

    expect(loadingElement).toBeInTheDocument()
  })

  it('displays error if fetch request fails', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: 'Sample Error',
    })

    renderWithRedux(<Quiz />, {})
    const errorElement = screen.getByText('Sample Error', { exact: false })

    expect(errorElement).toBeInTheDocument()
  })

  it('displays refetch button if fetch request fails', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: 'Sample Error',
    })

    renderWithRedux(<Quiz />, {})
    const buttons = screen.getAllByRole('button')
    const refetchButton = buttons.find((b) => b.innerHTML === 'Refetch')

    expect(refetchButton).toBeInTheDocument()
  })

  it('calls refetch function from useQuestions if refetch button is clicked', () => {
    // As strange as it sounds, the semicolon below is needed ¯\_(ツ)_/¯
    const mockedRefetch = jest.fn();
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: 'Sample Error',
      refetch: mockedRefetch,
    })

    renderWithRedux(<Quiz />, {})
    const refetchButton = screen.getByText('Refetch')
    userEvent.click(refetchButton)

    expect(mockedRefetch).toHaveBeenCalled()
  })

  it('displays question category', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      questions: sampleUseQuestionData,
    })

    renderWithRedux(<Quiz />, {})
    const questionCategory = screen.getByText(sampleUseQuestionData[0].category)

    expect(questionCategory).toBeInTheDocument()
  })

  it('displays question text', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      questions: sampleUseQuestionData,
    })

    renderWithRedux(<Quiz />, {})
    const firstQuestion = screen.getByText(sampleUseQuestionData[0].question)

    expect(firstQuestion).toBeInTheDocument()
  })

  it('displays question number', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      questions: sampleUseQuestionData,
    })

    renderWithRedux(<Quiz />, {})
    const questionNumber = screen.getByText('1 of 10', { exact: false })

    expect(questionNumber).toBeInTheDocument()
  })

  it('renders true button', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      questions: sampleUseQuestionData,
    })

    renderWithRedux(<Quiz />, {})
    const trueButton = screen.getByText('True', { exact: false })

    expect(trueButton).toBeInTheDocument()
  })

  it('renders false button', () => {
    (useQuestions as jest.Mock).mockReturnValueOnce({
      loading: false,
      questions: sampleUseQuestionData,
    })

    renderWithRedux(<Quiz />, {})
    const falseButton = screen.getByText('False', { exact: false })

    expect(falseButton).toBeInTheDocument()
  })

  it('dispatches QUIZ_FINISHED when all questions are answered', () => {
    (useQuestions as jest.Mock).mockReturnValue({
      loading: false,
      questions: sampleUseQuestionData,
    })
    const mockedDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockedDispatch)

    renderWithRedux(<Quiz />, {})
    for (let i = 0; i < 10; i++) {
      const trueButton = screen.getByText('True', { exact: false })
      userEvent.click(trueButton)
    }

    const expectedAction = {
      type: 'QUIZ_FINISHED',
      payload: sampleUseQuestionData.map((q) => ({ ...q, userAnswer: true })),
    }
    expect(mockedDispatch).toHaveBeenCalledWith(expectedAction)
  })
})
