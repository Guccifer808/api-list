import { useState } from 'react';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig  } from 'axios';

interface AxiosData {
  categories?: string[];
  entries: any[];

}
interface ApiEntry {
  api: string;
  description: string;
  auth: string;
  cors: string;
  category: string;
  link: string;
}

interface AxiosHook {
  fetchData: (params?: AxiosRequestConfig<any>) => Promise<void>;
  response: AxiosData;
  loading: boolean;
  error: AxiosError | null;
  
}

const useAxios = (query: string): AxiosHook => {
  const [response, setResponse] = useState<AxiosData>({ categories: [], entries: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async (params?: AxiosRequestConfig<any>): Promise<void> => {
    try {
      setLoading(true);
      const result: AxiosResponse<AxiosData> = await axios.get(`https://api.publicapis.org/${query}`, params);
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
export type { AxiosData, ApiEntry, AxiosError, AxiosHook };