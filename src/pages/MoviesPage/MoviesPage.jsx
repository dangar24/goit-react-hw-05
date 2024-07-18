import { useState, useEffect } from "react";
import {  useSearchParams  } from "react-router-dom";
import { getMovie } from '../../api'
import MovieList from '../../components/MovieList/MovieList'
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from './MoviesPage.module.css'

export default function MoviesPage() {

    const [searchMovie, setSearchMovie] = useState('');
    const [movies, setMovies] = useState([])
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [start, setStart] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    
    
    const ownerSearch = searchParams.get('query') ?? '';
    useEffect(() => {
        setSearchMovie(ownerSearch);
    }, [searchParams, ownerSearch])
    
    
    useEffect(() => {
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
    }, [searchMovie])


    return <>
        <form
            className={css.form}
            onSubmit={ (e) => {
                setSearchParams({ query: e.target.search.value });
                setSearchMovie(ownerSearch);
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
        {movies.length > 0 && <MovieList movies={movies} /> }
        {movies.length === 0 && start && !loader && <h1>Sorry, movie not found</h1>}
    </>
}