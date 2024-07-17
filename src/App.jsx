import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navigation from './components/Navigation/Navigation'
// import MoviesPage from './pages/MoviesPage/MoviesPage'
// import HomePage from './pages/HomePage/HomePage'
// import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage'
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
// import MovieCast from './components/MovieCast/MovieCast'
// import MovieReviews from './components/MovieReviews/MovieReviews'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const MovieCast = lazy(()=>import('./components/MovieCast/MovieCast'))
const MovieReviews = lazy(()=>import('./components/MovieReviews/MovieReviews'))

function App() {

  return <>
    <Navigation />
    <Suspense fallback={<div>Loading page code...</div>}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/:movieId' element={<MovieDetailsPage />} >
          <Route path='cast' element={<MovieCast/>} />
          <Route path='reviews' element={<MovieReviews />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </>
}

export default App
