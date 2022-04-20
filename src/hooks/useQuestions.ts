import { useCallback, useEffect, useState } from 'react'
import Question, { isQuestion } from '../types/Question'

const useQuestions = (amount: number) => {
  const [questions, setQuestions] = useState<Array<Question>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const fetchQuestions = useCallback(async () => {
    setError('')
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=hard&type=boolean&encode=base64`

    try {
      const response = await fetch(url)
      const { results, errors } = await response.json()

      if (errors) {
        throw new Error(
          errors?.map((e: { message: string }) => e.message).join('\n') ??
            'Unknown API error'
        )
      }

      if (!(results instanceof Array) || results.length !== amount) {
        throw new Error('Server did not return right amount of questions')
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newQuestions = results.map((q: any) => ({
        category: window.atob(q?.category),
        question: window.atob(q?.question),
        correctAnswer: window.atob(q?.correct_answer) === 'True',
      }))

      if (!newQuestions.every(isQuestion)) {
        throw new Error('Wrong data format')
      }
      
      setQuestions(newQuestions)
    } catch (error) {
      setError(`Error fetching the data: ${error}`)
    }

    setLoading(false)
  }, [amount])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchQuestions()
  }, [fetchQuestions])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { questions, loading, refetch, error }
}

export default useQuestions
