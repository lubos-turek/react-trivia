import { render } from '@testing-library/react'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

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

export default renderWithRedux
