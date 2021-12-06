import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import useAsync from "../../customHooks/useAsync";
import {Button, Dropdown, Menu, Space, Tag} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {DataTable2} from "../../components/DataTable2";
import useAxios from "../../swr/useAxios";

const Support = ({match, history}) => {
    const title = "상품지원"
    const subtitle = "HM 보험회사의 상품들을 확인 할 수 있는 페이지 입니다"

    const { data: insurance, isLoading, isError } = useAxios("/insurance", "get");
    const [searchData, setSearchData] = useState(insurance);
    const [option, setOption] = useState("보험명");

    function handleMenuClick(e) {
        if (e.key === '1') {setOption("보험명");}
        else if (e.key === '2') {setOption("보험번호");}
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
            title: '신용제한',
            width: '10%',
            dataIndex: ['conditions', 'rating'],
            key: ['conditions', 'rating'],
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
    ];
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                보험명
            </Menu.Item>
            <Menu.Item key="2">
                보험번호
            </Menu.Item>
        </Menu>
    );

    if (isError) {return (<div>에러가 발생하였습니다.</div>);}
    if (isLoading) {return <div>Loading</div>;}

    const onRow = (record, rowIndex) => {
        return {
            onClick: () => {
                history.push(`${match.url}/${record.id}`);
            },
        };
    };

    const onSearch = value => {
        if (value === "") {
            setSearchData(insurance);
        }
        else if (option === "보험번호") {
            setSearchData(
                insurance.filter(d => d.id == value)
            )
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

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Space>
                <Dropdown overlay={menu}>
                    <Button style={{ width: 95 }}>
                        {option} <DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
            </Space>
            <DataTable2 onRow={onRow} loading={isLoading} dataSource={searchData} columns = {columns} title = {title}/>
        </Wrapper>
    )
}

export default Support;
