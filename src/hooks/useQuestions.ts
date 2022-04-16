import { useEffect, useState } from "react"
import Question, { isQuestion } from "../types/Question"

// TODO: retry-loop if there is an error?
const useQuestions = (amount: number) => {
  const [questions, setQuestions] = useState<Array<Question>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchQuestions = async () => {
      setError('')
      const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=hard&type=boolean&encode=base64`
      const response = await fetch(url)
      const { results, errors } = await response.json()

      if(errors) {
        setError(JSON.stringify(errors))
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

      setLoading(false)
    }

    setLoading(true)
    fetchQuestions()
  }, [amount])

  return { questions, loading, error }
}

export default useQuestions