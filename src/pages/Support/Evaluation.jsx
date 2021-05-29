import React, {useState} from "react";

import {Wrapper} from "../../components/Wrapper";
import "../../css/Detail.css";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Button, Dropdown, Menu, Space, Tag} from "antd";
import {DataTable2} from "../../components/DataTable2";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";

async function getTables() {
    const response = await axios.get(
        'https://60aba7e95a4de40017cca8e4.mockapi.io/compensation'
    );
    return response.data;
}

const Evaluation = () => {
    const title = "보상평가관리";
    const subtitle = "HM 보험회사의 고객에게 처리된 보상들과 그 상세 내용을 보여주는 페이지입니다."

    const [data, setData] = useState([]);
    const [option, setOption] = useState("보험명");
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
            title: 'No',
            dataIndex: 'compensationId',
            key: 'compensationId',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '보상처리 직원 ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
            render: text => <a>{text}</a>,
        },
        {
            title: '직원 성명',
            dataIndex: 'employeeName',
            key: 'employeeName',
            render: text => <a>{text}</a>,
        },
        {
            title: '보상액',
            dataIndex: 'amount',
            key: 'amount',
            render: text => <a>{text}</a>,
        },
        {
            title: '보험 가입자 성명',
            dataIndex: 'clientName',
            key: 'clientName',
            render: text => <a>{text}</a>,
        },
        {
            title: '처리 마감일자',
            dataIndex: 'dateReceipt',
            key: 'dateReceipt',
            render: text => <a>{text}</a>,
        },

        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <a style={{color:'blueviolet'}}>Modify</a>
                </Space>
            ),
        },
    ];
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">보험상품 이름</Menu.Item>
            <Menu.Item key="2">보험 번호</Menu.Item>
        </Menu>
    );
    const menuRange = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">1개월</Menu.Item>
            <Menu.Item key="2">3개월</Menu.Item>
            <Menu.Item key="3">6개월</Menu.Item>
            <Menu.Item key="4">1년</Menu.Item>
            <Menu.Item key="5">전체 조회</Menu.Item>
        </Menu>
    );
    const onSearch = value => {
        console.log(typeof(value));
        console.log(value);
        if (value == "") {setSearchData(data);}

        else if (option == "보험번호") {
            console.log("number");
            console.log(value);
            setSearchData(
                data.filter(d => d.id === value)
            )
        }
        else if (option == "보험명"){
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
                <Dropdown overlay={menuRange}>
                    <Button style={{ width: 95 }}>
                        {option}<DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
            </Space>
            <DataTable2 loading={loading} dataSource={searchData} columns = {columns} title = {title}/>
        </Wrapper>
    )
}
export default Evaluation;