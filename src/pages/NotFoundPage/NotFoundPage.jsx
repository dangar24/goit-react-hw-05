import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return <h1>Ops! This page not found. Please go to <Link to="/">home page</Link></h1>
}