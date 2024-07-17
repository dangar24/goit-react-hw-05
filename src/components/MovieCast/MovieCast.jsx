import { getCast } from "../../api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import MovieCastList from "../MovieCastList/MovieCastList";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

export default function MovieCast() {

    const [cast, setCast] = useState([]);
    const { movieId } = useParams();
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setError(false)
                setLoader(true)
                const data = await getCast(movieId);
                setCast(data.cast);
            } catch (error) {
                setError(true)
            } finally {
                setLoader(false)
            }
        }
        fetchCast();
    }, [movieId])

    return <>
        {loader && <Loader />}
        {error && <Error />}
        {cast && <MovieCastList data={cast} />}
        </>
}