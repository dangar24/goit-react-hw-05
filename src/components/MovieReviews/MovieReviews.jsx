import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { getReviews } from "../../api";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import css from './MovieReviews.module.css'

export default function MoviesReviews() {

    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setError(false);
                setLoader(true);
                const data = await getReviews(movieId);
                setReviews(data.results)
            } catch (error) {
                setError(true);
            } finally {
                setLoader(false);
            }
        }
        fetchReviews();
    }, [movieId])
    
    return <>
        {loader && <Loader />}
        {error && <Error />}
        {reviews.length > 0 && <ul className={css.list}>
            {reviews.map((review) => (<li key={review.id}>
                <h3 className={css.title}>Author: {review.author}</h3>
                <p>{review.content}</p>
            </li>))}
        </ul>}
        {reviews.length === 0 && !loader && <h1>No reviews yet...</h1>}
    </>
}