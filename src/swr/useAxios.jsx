
import useSWR from "swr";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/modules/user";

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
  const dispatch = useDispatch();

  if (error) {
    console.log("hihi");
    dispatch(
      loginUser({
        status: false,
        data: null,
        result: false,
      })
    );
  }
  console.log("useSWR DATA", data);
  console.log("useSWR error", error);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAxios;
