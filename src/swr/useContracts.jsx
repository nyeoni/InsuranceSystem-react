import useSWR from "swr";
import axios from "axios";

const getFetcher = async (url) => {
  const res = await axios
    .get(url, { withCredentials: true })
    .then((res) => res.data);
  return res.data;
};

const useContracts = () => {
  const { data, error } = useSWR("/contract", getFetcher);

  //   console.log("imdata", data);

  return {
    contracts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useContracts;
