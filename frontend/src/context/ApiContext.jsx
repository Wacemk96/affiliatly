import axios from 'axios';
import {createContext, useContext, useState} from 'react';

const SCRAPPER_ENDPOINT = `http://localhost:3000/api/product/scrape`;

const ApiContext = createContext();

export const ApiContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  const values = {
    getContent: async (url) => {
      try {
        setLoading(true);
        setError(null);
        if (!url) {
          throw new Error('product url can not be empty');
        }
        const response = await axios.post(SCRAPPER_ENDPOINT, {url});
        setContent(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    loading,
    content,
    error,
  };
  return <ApiContext.Provider value={values}>{props.children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
