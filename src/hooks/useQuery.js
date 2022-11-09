import axios from 'axios';
import config from 'config';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from 'Context/AuthContext';

const { baseUrl } = config;

const useQuery = (
  url,
  page = 1,
  municipality = '',
  needAuth = true
) => {
  const paramsResolve = useMemo(() => {
    return {
      page,
      municipality,
    };
  }, [page, municipality]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const { token } = useAuth();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, {
        headers: needAuth ? { 'auth-token': token } : {},
        params: { ...paramsResolve },
      });
      setData(data);
      setLoading(false);
    } catch (err) {
      setErrors(err);
      setData(null);
      setLoading(false);
      throw new Error(err);
    }
  }, [url, token, needAuth, paramsResolve]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

//Hola
export default useQuery;
