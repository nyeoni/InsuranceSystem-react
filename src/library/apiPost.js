import axios from "axios";
import {notification} from "antd";

export const post = async (url, payload, form) => {
    console.log('분리된 함수에서 페이로드 ' + JSON.stringify(payload));
    return await axios( url,{
        method: 'post',
        headers: {'content-type': 'application/json'},
        data: payload,
    }).then((response) => {
        notification.open({message: 'Notification!', description: '전송 완료'});
        form.resetFields();
        return response.data.data;
    }).catch(err =>
    {console.log(err.message);});
}
//분리된 함수에서 페이로드 이거 된거임
// {"name":"분리한 보험",
// "category":"자동차",
// "description":"ㅇㅇ",
// "conditions":{"startAge":11,"endAge":16,"rating":3}}
// todo: 가끔씩 400뜨는거 무섭다...
