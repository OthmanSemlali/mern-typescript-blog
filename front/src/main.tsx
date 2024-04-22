import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeContextProvider from './Context/ThemeContext.tsx'
import { PostContextProvider } from './Context/PostContext.tsx'
import CategoryContextProvider from './Context/CategoryContext.tsx'
import CommentContextProvider from './Context/CommentContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <ThemeContextProvider>
      <CategoryContextProvider>
      <CommentContextProvider>

        <PostContextProvider>

          <App />

        </PostContextProvider>
        </CommentContextProvider>

      </CategoryContextProvider>



    </ThemeContextProvider>

  </React.StrictMode>,
)
