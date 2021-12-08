import axios from "axios";
import { notification } from "antd";

export const apiCall = async (url, method, payload, form) => {
  console.log("분리된 함수에서 페이로드 " + JSON.stringify(payload));
  return await axios(url, {
    method: method,
    // method: 'post',
    headers: { "content-type": "application/json" },
    data: payload,
    withCredentials: true,
  })
    .then((response) => {
      notification["success"]({
        message: "Success!",
        description: "전송에 성공하였습니다.",
      });
      form?.resetFields();
      return response.data.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Failed with response", error.response.data);
        notification["error"]({
          message: "Error!",
          description: error.response.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Failed request", error);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Failed in general", error);
      }
    });
};
// todo: 가끔씩 400뜨는거 무섭다...
