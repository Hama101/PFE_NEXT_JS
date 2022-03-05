import { useState, useEffect, useCallback } from "react";

// working with axios for fetching data
import http from '../controllers/http'

function useFetch(query, page, maxPages) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    console.log(query, page, maxPages);
    const sendQuery = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);
            const res = await http.get(
                `/recipes/recipes-list/?page=${page - 1}&query=${query}`
            );
            setList(res.data.data);
            setLoading(false);
        } catch (err) {
            setError(err);
        }
    }, [query, page]);

    useEffect(() => {
        console.log(loading);
        if (page <= maxPages && !loading) {
            sendQuery(query);
        }
    }, [query, sendQuery, page]);
    return { loading, error, list };
}

export default useFetch;
