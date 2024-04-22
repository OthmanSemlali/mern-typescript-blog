import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
// import Header from './Components/Header'
// import Posts from './Components/Posts'
import SharedLayout from './Components/SharedLayout'
// import Post from './Components/Post'
import Posts from './Components/Posts'
import SinglePost from './Components/SinglePost'
import About from './Components/About'
import ErrorPage from './Components/Error'
import Search from './Components/Search'
import Markdown from 'react-markdown'
import MyComponent from './Components/Markdown'

function App() {



  return (
    <Router>
      
      <Routes>
        <Route
          element={<SharedLayout />}
        >


          <Route path='/blog/:page?' element={<Posts />} />
          <Route path="/post/:title" element={<SinglePost />} />
          <Route path='/category/:categoryName/:page?' element={<Posts />} />
          <Route path='/tag/:tagName/:page?' element={<Posts />} />
          <Route path='/search' element={<Search />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<ErrorPage status={404} type='Route Not Found' />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
