// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './assets/index.css'
import './assets/editor.less'
import App from './App.tsx'
import { store } from './store/index'
import { Provider } from 'react-redux'
import "mathlive";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App /> 
      </Provider>
    </HashRouter>
  // </StrictMode>,
)
