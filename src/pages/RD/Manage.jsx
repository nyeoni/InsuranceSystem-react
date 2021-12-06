import React, {useEffect, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import {Button, Dropdown, Input, Menu, message, Space, Tag} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import 'antd/dist/antd.css';
import '../../css/Detail.css'
import useAxios from "../../swr/useAxios";

const Manage = ({match, history}) => {
    const title = "상품관리"
    const subtitle = "HM 보험회사의 상품들을 수정하고 삭제할 수 있는 페이지 입니다"
    const { data: insurance, isLoading, isError } = useAxios("/insurance", "get")
    const [option, setOption] = useState("보험명");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {setSearchData(insurance);},[insurance]);

    function handleMenuClick(event) {
        switch (event.key){
            case "보험명": setOption("보험명"); break;
            case "보험번호": setOption("보험번호"); break;
        }
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '보험명',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '보험분류',
            key: 'category',
            width: '15%',
            dataIndex: 'category',
            filters: [
                {
                    text: '자동차보험',
                    value: 'Car',
                },
                {
                    text: '운전자보험',
                    value: 'Driver',
                },
                {
                    text: '화재보험',
                    value: 'Fire',
                },
                {
                    text: '여행보험',
                    value: 'Traveller',
                }
            ],
            onFilter: (value, record) => record.insuranceCategory.indexOf(value) === 0,
            render: category => {
                let color, value;
                switch (category){
                    case '자동차': value = '자동차보험'; color = 'geekblue'; break;
                    case '운전자': value = '운전자보험'; color = 'green'; break;
                    case '화재': value = '화재보험'; color = 'volcano'; break;
                    case '여행': value = '여행보험'; color = 'yellow'; break;
                }
                return (<Tag color={color} key={category}>{value}</Tag>);
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle">
                    <a style={{color:'red'}}>Delete</a>
                </Space>
            ),
        },
    ];
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="보험명">
                보험명
            </Menu.Item>
            <Menu.Item key="보험번호">
                보험번호
            </Menu.Item>
        </Menu>
    );


    const onRow = (record, rowIndex) => {
        return {onClick: () => {history.push(`${match.url}/${record.id}`);},};
    };

    const onSearch = value => {
        if (value === "") {
            setSearchData(insurance);
        }
        else if (option === "보험번호") {
            setSearchData(insurance.filter(d => d.id === value))
        }
        else if (option === "보험명") {
            let res = [];
            insurance.forEach(function (d){
                if (d.name.includes(value))
                    res.push(d);
            })
            setSearchData(res);
        }
    };
    if (isError) {return (<div>에러가 발생하였습니다.</div>);}
    if (isLoading) {return (<div>로딩 중 입니다.</div>);}

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Space>
                <Dropdown overlay={menu}>
                    <Button style={{ width: 95 }}>
                        {option} <DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear style={{ width: 300 }} />
            </Space>
            <DataTable2 onRow={onRow} loading={isLoading} dataSource={searchData} columns = {columns} title = {title}/>
        </Wrapper>
    )
}

export default Manage;
