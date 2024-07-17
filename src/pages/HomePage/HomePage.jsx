import { useEffect, useState } from 'react'
import { getTrending } from '../../api'
import TrendingList from '../../components/TrendingList/TrendingList'
import Error from '../../components/Error/Error'
import Loader from '../../components/Loader/Loader'
import css from './HomePage.module.css'

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                setError(false)
                setLoader(true)
                const data = await getTrending();
                setMovies(data)
            } catch (error) {
                setError(true)
            } finally {
                setLoader(false)
            }
        }
        fetchTrending();
     },
     []);

    return <div>
        <h1 className={css.title}>Trending Today</h1>
        {loader && <Loader />}
        {error && <Error />}
        {movies.length >0 && <TrendingList movies={movies} />}
    </div>
}