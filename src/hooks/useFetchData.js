// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetchData = ({ method, url, body = null, headers = {} }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios({
//           method,
//           url,
//           data: body,
//           headers,
//         });
//         setData(response.data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching:", err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (url && method) fetchData();
//   }, [method, url, body, headers]);

//   return { data, loading, error };
// };

// export default useFetchData;


import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = ({ url, method = "get", body = null, headers = {}, refresh, transform }) => {
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
