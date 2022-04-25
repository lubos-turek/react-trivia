import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import useQuestions from './useQuestions'
import sampleAPIData from '../test/sampleAPIData';

window.fetch = jest.fn()

describe('useQuestions Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets loading to true when API request is in progress', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => ({})))

    const { result } = renderHook(() => useQuestions(5))

    expect(result.current.loading).toBe(true)
  })

  it('sets loading to false when API request finishes', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: sampleAPIData}),
      }))

    const { result, waitForValueToChange} = renderHook(() => useQuestions(5))
    await act(async () => {
      await waitForValueToChange(() => result.current.loading)
    })

    expect(result.current.loading).toBe(false)
  })

  it('decodes API response from base64', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: sampleAPIData}),
    }))

    const { result, waitFor} = renderHook(() => useQuestions(5))
    await act(async () => {
      await waitFor(() => result.current.loading === false)
    })

    const { questions } = result.current
    expect(questions[0].category).toBe('History')
    expect(questions[0].question).toBe('Joseph Stalin\'s real name was Ioseb Bessarionis dze Dzugashvili.')
    expect(questions[0].correctAnswer).toBe(true)
  })

  it('fires new API request if refetch is called', async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: sampleAPIData}),
      }))

    await act(async () => {
      const { result } = renderHook(() => useQuestions(5))
      const refetch = result.current.refetch
      refetch()
      refetch()
    })

    expect(fetch).toBeCalledTimes(3)
  })

  it('returns error if API request fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject("API is down"))
    const { result, waitForValueToChange } = renderHook(() => useQuestions(5))

    await act(async () => {
      await waitForValueToChange(() => result.current.error)
    })

    expect(result.current.error).toBe('Error fetching the data: API is down')
  })

  it('returns error if API returns wrong amount of questions', async () => {
    (fetch as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: [...sampleAPIData, ...sampleAPIData]}),
    }))
    const { result, waitForValueToChange } = renderHook(() => useQuestions(5))

    await act(async () => {
      await waitForValueToChange(() => result.current.error)
    })

    expect(result.current.error).toBe('Error fetching the data: Error: Server did not return right amount of questions')
  })

  it('returns error if API returns unexpected data format', async () => {
    (fetch as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: 100}),
    }))
    const { result, waitForValueToChange } = renderHook(() => useQuestions(5))

    await act(async () => {
      await waitForValueToChange(() => result.current.error)
    })

    expect(result.current.error).toBe('Error fetching the data: Error: Server did not return right amount of questions')
  })
})