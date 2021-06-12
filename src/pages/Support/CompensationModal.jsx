import React, {useEffect, useState} from "react";
import {Divider, Form, Input, InputNumber, Modal} from 'antd';
import {useForm} from "antd/es/form/Form";
import axios from "axios";


async function postCompensation(id, data) {
    const url = `hminsu.net/api/compensation/${id}/status`;
    const response = await axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'content-type': 'application/json'}
    }).catch(err => {
        console.log(err.message);
    });
    console.log(response);
    return response.data;
}

const CompensationModal = (props) => {
        // const {id} = props.clickedRecord.id;
        const [form] = useForm();

        const [state, setState] = useState({
            cost : '',
            status : '보상완료'
        })

        const handleChange = (event) =>{
            const target = event.target;
            const name = target.name;
            const value = target.value;
            if(Array.isArray(value)){
                setState({
                    ...state,
                    [name] : [...value] //[target.startAge]
                });
                console.log('array val', value)
            }else{
                setState({...state, [name]: value});
                console.log('single val', value)
            }
        }
        useEffect(() => {
            console.log('useEffect ',state);
        }, [state])

        const handleSubmit = async () => {
            const data = await postCompensation(props.clickedRecord.id, state);
            console.log(data);
        }
    function onCancel() {
        props.setVisible(false);
    }

        return(
            <Modal title={props.title + "의 추가정보"} visible= {props.visible} width={1000} onCancel={onCancel}>
                <Form form = {form} labelCol={10} wrapperCol={12} layout={"vertical"}>
                    <Divider style={{fontSize: '1em'}} orientation="center">해당 보상의 상태는 자동으로 '보상완료'로 변경됩니다.</Divider>
                    <Form.Item label={"Compensation ID"}>
                        <Input  value={props.clickedRecord.id}/>
                    </Form.Item>
                    <Form.Item label={"Contract ID"}>
                        {/*<Input value={props.clickedRecord.contract.id}/>*/}
                    </Form.Item>
                    <Form.Item label={"Claim ID"}>
                        {/*<Input  value={props.clickedRecord.claim.id}/>*/}
                    </Form.Item>
                    <Form.Item rules={[{required: true, message: '보상할 금액을 입력해야합니다!'}]} name="cost" label="사고 보상금액(KRW)" >
                        <InputNumber value={state.cost} placeholder="보상할 금액을 입력해주세요" min = '0'
                                     style={{width : '100%'}}
                                     onChange={(val)=>{handleChange({target: {name: 'cost', value: val}})}} />
                    </Form.Item>
                </Form>
            </Modal>
        )

}
export default CompensationModal;