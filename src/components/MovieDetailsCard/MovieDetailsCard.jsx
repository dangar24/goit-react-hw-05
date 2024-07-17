import {  Link, NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";
import clsx from "clsx";
import css from './MovieDetailsCard.module.css'

export default function MovieDetailsCard({ data }) {

    const location = useLocation()
    const backLink = useRef(location.state ?? "/movies")

    const posterImg = `https://image.tmdb.org/t/p/w400${data.poster_path}`;

    return <>
        <Link to={backLink.current}><button className={css.btn} type="button">Go back</button></Link>
        <div className={css.box}>
            <img src={posterImg} alt={data.title} />
            <div className={css.textbox}>
                <h1 className={css.title}>{data.title}</h1>
                <h4 className={css.per}> User score: {Math.round(data.vote_average * 10)}%</h4>
                <h3 className={css.subtitle}>Overwie</h3>
                <p className={css.overwie}>{data.overview}</p>
                <h3 className={css.subtitle}>Genres</h3>
                <ul className={css.list}>{data.genres.map((genre) => (<li key={genre.id} className={css.item}>{genre.name}</li>))}</ul>
            </div>
        </div>
        <div>
            <h3 className={css.text}>Additional info</h3>
            <ul className={css.listInfo}>
                <li><NavLink to='cast' className={({ isActive }) => {
                    return clsx(css.listItem, isActive && css.active)
                }}>Cast</NavLink></li>
                <li><NavLink to='reviews' className={({ isActive }) => {
                    return clsx(css.listItem, isActive && css.active)
                }}>Reviews</NavLink></li>
            </ul>
        </div>
    </>
}
