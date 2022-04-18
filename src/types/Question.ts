type Question = {
  category: string
  question: string
  correctAnswer: boolean
  userAnswer?: boolean
}

// Question Type Guard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isQuestion = (question: any): question is Question =>
  question instanceof Object && question !== null &&
  typeof question?.category === 'string' &&
  typeof question?.question === 'string' &&
  typeof question?.correctAnswer === 'boolean'

export default Question
export { isQuestion }