import React, { useState, useEffect } from 'react';
const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        let response;
        if (options) {
          response = await fetch(url, options);
        } else {
          response = await fetch(url);
          // console.log(response);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { data: data, error: error, loading: loading, setData: setData };
};

export default useFetch;
