

import useSWR from "swr";
// import apiManager from "./apiManager";
import axios from "axios";

const getFetcher = async (url) => {
  const res = await axios
      .get(url, { withCredentials: true })
      .then((res) => res.data);
  return res.data;
};

const postFetcher = async (url, body) => {
  const res = await axios
      .post(url, body, { withCredentials: true })
      .then((res) => res.data);
  return res.data;
};

const useAxios = (url, method, body = null) => {
  const fetcher =
      method === "get"
          ? () => getFetcher(url)
          : method === "post"
              ? () => postFetcher(url, body)
              : console.log("fuckyou");
  const { data, error } = useSWR(url, fetcher);

  console.log("useSWR DATA", data);
  console.log("useSWR error", error);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAxios;
