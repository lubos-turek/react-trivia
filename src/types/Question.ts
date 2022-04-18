type Question = {
  category: string
  question: string
  correctAnswer: boolean
  userAnswer?: boolean
}

// Question Type Guard
const isQuestion = (question: any): question is Question =>
  typeof question === 'object' && question !== null &&
  typeof question.category === 'string' &&
  typeof question.question === 'string' &&
  typeof question.correctAnswer === 'boolean'

export default Question
export { isQuestion }