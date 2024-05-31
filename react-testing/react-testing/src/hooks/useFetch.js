import { useEffect, useState } from 'react';

const useFetch = (url, oprions) =>{

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(url, options);
				const data = await res.json();
				console.log(data);
				setData(data);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};

		fetchData();
		//eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useFetch