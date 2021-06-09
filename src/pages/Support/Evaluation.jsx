import React, {useEffect, useRef, useState} from "react";

import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Button, Dropdown, Menu, Space, Tag} from "antd";
import {DataTable2} from "../../components/DataTable2";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import InfoModal from "../../components/InfoModal";

async function getTables() {
    const response = await axios.get(
        'https://60aba7e95a4de40017cca8e4.mockapi.io/compensation'
    );
    return response.data;
}
const Evaluation = () => {
    const title = "보상평가관리";
    const subtitle = "HM 보험회사의 고객에게 처리된 보상들과 그 상세 내용을 보여주는 페이지입니다."

    const [clickedRecord, setClickedRecord] = React.useState([]);
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
            setOption("보험명");
        }
        else if (e.key === '2') {
            console.log('click', e.key);
            setOption("보험번호");
        }
    }
    const columns = [
        {
            title: '보상처리 직원 ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        //보상처리 직원, 처리한 보상 list
        // {
        //     title: '보상처리 직원 ID',
        //     render: (record) => record.employee.id,
        // },
        {
            title: '전체 보상액',
            dataIndex: 'cost',
            key: 'cost',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Claim ID',
            render: (record) => record.claim.id
        },
        {
            title: '보상 처리일자',
            dataIndex: 'dateTime',
            key: 'dateTime',
            render: text => <a>{text}</a>,
        },
        {
            title: '보상 상태',
            dataIndex: 'status',
            key: 'status',
            render: text => <a>{text}</a>,
        },
    ];
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">직원 성명</Menu.Item>
            {/*<Menu.Item key="2">보험 번호</Menu.Item>*/}
        </Menu>
    );

    const onSearch = value => {
        console.log(typeof(value));
        console.log(value);
        if (value == "") {setSearchData(data);}
        // else if (option == "보험번호") {
        //     console.log("number");
        //     console.log(value);
        //     setSearchData(
        //         data.filter(d => d.id === value)
        //     )
        // }
        else if (option == "직원 성명"){
            console.log("name");
            console.log(value);
            let res = [];
            data.forEach(function (d){if (d.name.includes(value)) res.push(d);})
            setSearchData(res);
        }
    };
    const onRow = (record, rowIndex) => {
        return {onClick: (record) => {
            console.log('before', clickedRecord);
            setClickedRecord(searchData[rowIndex]);
            setVisible(true);
            }
        };
    }
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
            <DataTable2 onRow={onRow} loading={loading} dataSource={searchData} columns = {columns} title = {title}/>
            {/*<InfoModal visible={false} setVisible = {setVisible()} clickedRecord={clickedRecord}/>*/}
        </Wrapper>
    )
}
export default Evaluation;