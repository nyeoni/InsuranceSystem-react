import axios from "axios";
import {notification} from "antd";

export const post = async (url, payload, form) => {
    console.log('분리된 함수에서 페이로드 ' + JSON.stringify(payload));
    return await axios( url,{
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: payload,
    }).then((response) => {
        notification["success"]({message: 'Success!', description: '전송에 성공하였습니다.'});
        form.resetFields();
        return response.data.data;
    }).catch(err => {
        console.log(err.message);
        notification["error"]({message: 'Error!', description: err.response.message});
    });
}
// todo: 가끔씩 400뜨는거 무섭다...
// todo: error message: 상황별 디버그, message 띄우기
