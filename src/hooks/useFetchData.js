
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = ({ url, method = "get", body = null, headers = {}, refresh, transform,  }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const config = {
          method,
          url,
          headers,
          ...(body && { data: body }),
          withCredentials: true,
        };
  
        const response = await axios(config);
        console.log("response ====", response);
  
        const transformedData = transform
          ? transform(response.data)
          : response.data;
  
        setTimeout(() => {
          setData(transformedData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching:", err);
        setError(err);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      if (url) fetchData();
    }, [url, refresh]);
  
    return [data, isLoading, error];
  };
  

export default useFetchData;
