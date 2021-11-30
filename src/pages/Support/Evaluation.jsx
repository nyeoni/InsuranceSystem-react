
import React, {useEffect, useRef, useState} from "react";

import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Button, Dropdown, Menu, Space, Tag} from "antd";
import {DataTable2} from "../../components/DataTable2";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import EvaluationModal from "../../components/EvaluationModal";

async function getTables() {
    const response = await axios.get(
        '/api/employee/compensation'
    );
    return response.data.data;
}
const Evaluation = () => {
    const title = "보상평가관리";
    const subtitle = "HM 보험회사의 고객에게 처리된 보상들과 그 상세 내용을 보여주는 페이지입니다."
    const [clickedRecord, setClickedRecord] = React.useState(undefined);
    const [visible, setVisible] = React.useState(false);

    const [data, setData] = useState([]);
    const [option, setOption] = useState("직원 성명");
    const [searchData, setSearchData] = useState([]);
    const [skip, setSkip] = useState(false);
    const settingData = (data) => {
        if (data) {
            setData(data);
            setSearchData(data);
            setSkip(true);
        } else {
            console.log("데이터 설정 실패");
        }
    }
    const [initialState, refetch] = useAsync(getTables, settingData, [getTables], skip);
    const { loading, error } = initialState;

    if (error) {
        return (<div>에러가 발생하였습니다.</div>);
    }

    function handleMenuClick(e) {
        if (e.key === '1') {
            console.log('click', e.key);
            setOption("직원 성명");
        }
    }
    const columns = [
        {
            title: '직원 ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '직원 성명',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            render: text => <a>{text}</a>,
        },
        {
            title: '직급',
            dataIndex: 'role',
            key: 'role',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '누적 보상횟수',
            width: '10%',
            render: (record) => record.compensationList.length
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) =>(<Space size="middle"><Button onClick={() => onRow(record)} style={{color:'blueviolet'}}>담당 처리사고 조회</Button></Space>)
        },
    ];
    const onRow = (record) => {
        setClickedRecord(searchData.find(r => r.id === record.id))
        setVisible(true);
    };
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">직원 성명</Menu.Item>
        </Menu>
    );

    const onSearch = value => {
        console.log(typeof(value));
        console.log(value);
        if (value == "") {setSearchData(data);}
        else if (option == "직원 성명"){
            console.log("name");
            console.log(value);
            let res = [];
            data.forEach(function (d){if (d.name.includes(value)) res.push(d);})
            setSearchData(res);
        }
    };

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Space>
                <Dropdown overlay={menu}>
                    <Button style={{ width: 95 }}>
                        {option}<DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
            </Space>
            <DataTable2 loading={loading} dataSource={searchData} columns = {columns} title = {title}/>
            <EvaluationModal clickedRecord = {clickedRecord} visible = {visible} setVisible = {setVisible}/>
        </Wrapper>
    )
}
export default Evaluation;
