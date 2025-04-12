import { useState, useEffect } from "react";    

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(url)
            .then((response) => response.json())
            .then((result) => {  
                setData(result);
                setLoading(false);
            });
    }, [url]);

    return {data, loading};
}

export default useFetch;