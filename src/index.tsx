import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import Intro from './pages/Intro'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import store from './store'

const container = document.getElementById('root') as HTMLElement
render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  container
)
