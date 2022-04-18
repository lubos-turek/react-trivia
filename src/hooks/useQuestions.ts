import { useCallback, useEffect, useState } from "react"
import Question, { isQuestion } from "../types/Question"

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

      if(errors) {
        setError(errors?.map((e: {message: string}) => e.message).join('\n') ?? 'Unknown API error')
      } else if (results instanceof Array && results.length === amount) {
        const newQuestions = results.map((q: any) => (
            { category: window.atob(q.category), question: window.atob(q.question), correctAnswer: q.correct_answer === 'True' }
          ))
        if(newQuestions.every(isQuestion)) {
          setQuestions(newQuestions)
        } else {
          setError('One or more questions retrieved from the server has wrong format')
        }
      } else {
        setError('Server did not return right amount of questions')
      }
    } catch (error) {
      setError('Error fetching the data: ' + error)
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