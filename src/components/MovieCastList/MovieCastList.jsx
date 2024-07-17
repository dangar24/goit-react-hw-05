import css from './MovieCastList.module.css'

export default function MovieCastList({ data }) {

    
    return <ul className={css.list}>
        {data.map((actor) => (<li key={actor.id}>
            <img className={css.img} src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            <h3>{actor.name}</h3>
            <p>{actor.character}</p>
        </li>))}
    </ul>
}