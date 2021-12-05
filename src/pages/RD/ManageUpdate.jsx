// import {Button, Col, Form, Input, InputNumber, notification, Row, Select} from "antd";
// import React from "react";
// import {SelectOptions} from "../../components/SelectOptions";
// import {post} from "../../library/apiPost";
// import axios from "axios";
//
// const ManageUpdate = (props) => {
//     // todo: put insurance/{id}가 수정.
//     //  조회하는 DTO 그대로, ID도 같이 보낼 필요없음 모든 값 다시 보내줘야함.
//     const {id,form, newData, setNewData} = props;
//
//
//     const handleSubmit = async () => {
//         const url = `/insurance/${id}`;
//         const payload = {
//             name: newData.name,
//             category: newData.category,
//             description: newData.description,
//             conditions: {
//                 startAge: newData.startAge,
//                 endAge: newData.endAge,
//                 rating: newData.rating
//             }
//         };
//         const data = await putUpdates(url, payload, form);
//         console.log(data);
//     }
//     const putUpdates = async (url, payload, form) =>{
//         return await axios( url,{
//             method: 'put',
//             headers: {'content-type': 'application/json'},
//             data: payload,
//         }).then((response) => {
//             notification.open({message: 'Notification!', description: '전송 완료'});
//             form.resetFields();
//             return response.data.data;
//         }).catch(err =>
//         {console.log(err.message);});
//     }
//     return(
//
//     )
// }
// export default ManageUpdate;
