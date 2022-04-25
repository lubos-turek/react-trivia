import store from '.'
import sampleStoreDate from '../test/sampleStoreData'

describe('Quiz Results Reducer', () => {
  it('saves results on QUIZ_FINISHED action', () => {
    store.dispatch({
      type: 'QUIZ_FINISHED',
      payload: sampleStoreDate.latestQuizResults,
    })
    const state = store.getState()
    expect(state.latestQuizResults?.length).toBe(3)
  })

  it('saves empty results on QUIZ_FINISHED action with empty payload', () => {
    store.dispatch({ type: 'QUIZ_FINISHED', payload: undefined })
    const state = store.getState()
    expect(state.latestQuizResults).toBe(undefined)
  })
})
