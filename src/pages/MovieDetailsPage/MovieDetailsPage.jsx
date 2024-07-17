import { Suspense, useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import { getDetails } from "../../api"
import MovieDetailsCard from "../../components/MovieDetailsCard/MovieDetailsCard";
import Loader from '../../components/Loader/Loader'
import Error from "../../components/Error/Error";

export default function MovieDetailsPage() {

    const { movieId } = useParams();
    const [details, setDetails] = useState(null);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setError(false)
                setLoader(true)
                const data = await getDetails(movieId);
                setDetails(data)
            } catch (error) {
                setError(true)
            } finally {
                setLoader(false)
            }
        }
        fetchDetails()
    }, [movieId]);


    return <>
        {loader && <Loader />}
        {error && <Error />}
        {details && <MovieDetailsCard data={details} />}
        <Suspense fallback={<div>Loading code...</div>}>
            <Outlet />
        </Suspense>
    </>
}

