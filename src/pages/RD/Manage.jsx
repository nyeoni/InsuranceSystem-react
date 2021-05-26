import React, {useEffect, useMemo, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import {DataTable} from "../../components/DataTable";
import {Button, Dropdown, Input, Menu, message, Space, Tag} from "antd";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {AudioOutlined, DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import 'antd/dist/antd.css';
import '../../css/Detail.css'

async function getInsurances() {
    const response = await axios.get(
        'https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/insurance'
    );
    return response.data;
}

const Manage = () => {
    const title = "상품관리"
    const subtitle = "HM 보험회사의 상품들을 수정하고 삭제할 수 있는 페이지 입니다"
    const [state, refetch] = useAsync(getInsurances, [getInsurances]);
    const { loading, data, error } = state;
    const [option, setOption] = useState("보험명");
    const [showdata, setShowdata] = useState([]);

    const dataFilter = (data) => {
        setShowdata(data);
    }

    if (data)
    {
        // data.forEach(
        //     (value) => {
        //         showdata.push()
        //     }
        // )
        console.log(data);
        // useMemo(data => dataFilter(data), [data]);
        // setShowdata(data);
        // console.log(showdata);
    }

    function handleMenuClick(e) {
        // message.info('Click on menu item.');
        if (e.key == 1)
        {
            console.log('click', e.key);
            setOption("보험명");
        }
        else if (e.key == 2)
        {
            console.log('click', e.key);
            setOption("보험번호");
        }
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            filteredValue: ["1"],
            render: text => <a>{text}</a>,
        },
        {
            title: '보험명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '보험분류',
            key: 'type',
            width: '15%',
            dataIndex: 'type',
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
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            render: type => {
                let color;
                let value;
                if (type === 'Car') {
                    value = "자동차보험";
                    color = 'geekblue';
                } else if (type === 'Driver') {
                    value = "운전자보험";
                    color = 'green';
                } else if (type === 'Fire') {
                    value = "화재보험";
                    color = 'volcano';
                } else {
                    value = "여행보험";
                    color = 'yellow';
                }
                return (
                    <Tag color={color} key={type}>
                        {value}
                    </Tag>
                );
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
            <Menu.Item key="1">
                보험명
            </Menu.Item>
            <Menu.Item key="2">
                보험번호
            </Menu.Item>
        </Menu>
    );

    if (error) {
        return (
            <div>
                에러가 발생하였습니다.
            </div>
        );
    }

    const onSearch = value => {
        if (option == "보험번호")
        {
            console.log("number");
            // data = data.filter(x => {
            //     x == value
            // });
        }
        else if (option == "보험명")
        {
            console.log("name");
        }
    };

    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Space>
                <Dropdown overlay={menu}>
                    <Button>
                        {option} <DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
            </Space>
            <DataTable2 loading={loading} dataSource={data} columns = {columns} title = {title}/>
        </Wrapper>
    )
}

export default Manage;