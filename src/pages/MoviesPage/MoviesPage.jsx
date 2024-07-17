import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { getMovie } from '../../api'
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from './MoviesPage.module.css'

export default function MoviesPage() {

    const location = useLocation()
    const [searchMovie, setSearchMovie] = useState('');
    const [movies, setMovies] = useState([])
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [start, setStart] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const ownerSearch = searchParams.get('query') ?? '';
    
    useEffect(() => {
        setSearchMovie(ownerSearch)
        if (searchMovie === '') {
            return
        }
        const fetchMovies = async () => {
            try {
                setStart(true)
                setError(false);
                setLoader(true);
                const data = await getMovie(searchMovie);
                setMovies(data.results);
            } catch (error) {
                setError(true)
            } finally {
                setLoader(false)
            }
        }
        fetchMovies();
    }, [searchMovie, ownerSearch])


    return <>
        <form
            className={css.form}
            onSubmit={(e) => {
                setSearchParams({query: e.target.search.value });
                setSearchMovie(searchParams)
                e.preventDefault();
                e.currentTarget.reset();
            }}>
            <input
                name='search'
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search films"
                />
            <button type="submit" >Search</button>
        </form>
        
        {loader && <Loader />}
        {error && <Error />}
        {movies.length === 0 && start && !loader && <h1>Sorry, movie not found</h1>}
        {movies.length > 0 && <ol className={css.list}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.item}>
                <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
            </li>
            ))}
        </ol>}
    </>
}