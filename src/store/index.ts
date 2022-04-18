import { createStore } from 'redux'
import Store from '../types/Store'

const initialState: Store = {
  latestQuizResults: undefined
}

const quizResultsReducer = (state: Store = initialState, action: any): Store => {
  if (action.type === 'QUIZ_FINISHED') {
    return {...state,
        latestQuizResults: action?.payload
      }
  }

  return state
}

const store = createStore(quizResultsReducer)

export default store