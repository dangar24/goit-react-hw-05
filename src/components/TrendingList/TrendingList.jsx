import { Link, useLocation } from "react-router-dom"
import css from './TrendingList.module.css'

export default function TrendingList({ movies }) {

    const location = useLocation()

    return <ol className={css.list}>
        {movies.map((movie) => (
            <li key={movie.id} className={css.item}>
                <Link state={location} className={css.link} to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
        ))}
    </ol>
}