import { toast } from 'react-toastify';

export const handleResponse = async (response: Response) => {
  const isJson = response.headers?.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;
  if (!response.ok) {
    const err = data ? data.message : response.statusText;
    toast.error(err);
    return Promise.reject(err);
  }
  return data;
};
