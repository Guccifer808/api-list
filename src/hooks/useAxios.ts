import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AxiosData {
  categories?: string[];
  entries: any[];

}

interface AxiosError {
  message: string;
  [key: string]: any;
}

interface AxiosHook {
  fetchData: (params?: any) => Promise<void>;
  response: AxiosData;
  loading: boolean;
  error: AxiosError | null;
  
}

const useAxios = (query: string): AxiosHook => {
  const [response, setResponse] = useState<AxiosData>({ categories: [], entries: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async (params?: any): Promise<void> => {
    try {
      setLoading(true);
      const result: AxiosResponse = await axios.get(`https://api.publicapis.org/${query}`, params);
      setResponse(result.data);
    } catch (err: AxiosError | any) {
      setError(err.response?.data || { message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, response, loading, error };
};

export default useAxios;
export type { AxiosData}