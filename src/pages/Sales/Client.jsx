import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import "../../css/Detail.css";
import {Button, Dropdown, DatePicker, Radio, Menu, Space, Tag, Input, Select, Divider} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import styled from "styled-components";
const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpan = styled.span`
    font-size: 14px;
`

async function getClients() {
    const response = await axios.get(
        'http://localhost:4000/client'
    );
    return response.data;
}

const Client = ({match, history}) => {
    const title = "고객관리";
    const subtitle = "잠재 고객 및 계약 고객을 분석하여 추가 영업기회 확보";
    const [searchData, setSearchData] = useState([]);
    const [state, refetch] = useAsync(getClients, setSearchData, [getClients]);
    const { loading, data, error } = state;
    const [option, setOption] = useState("고객명");

    const onRow = (record, rowIndex) => {
        return {
            onClick: () => {
                // history.push(`${match.url}/${record.id}`)
            },
        };
    };

    function handleMenuClick(e) {
        if (e.key === '1')
        {
            console.log('click', e.key);
            setOption("고객명");
        }
        else if (e.key === '2')
        {
            console.log('click', e.key);
            setOption("전화번호");
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
            title: '고객명',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '전화번호',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber',
            width: '20%',
        },
        {
            title: '가입상태',
            key: 'id',
            width: '15%',
            dataIndex: 'contractList',
            filters: [
                {
                    text: '가입고객',
                    value: 1
                },
                {
                    text: '미가입고객',
                    value: 0
                }],
            onFilter: (value, record) => {
                console.log(record.contractList.length);
                if (value == 0) {
                    if (record.contractList.length == 0)
                        return true;
                    else if (record.contractList.length > 0)
                        return false;
                } else if (value == 1) {
                    if (record.contractList.length == 0)
                        return false;
                    else if (record.contractList.length > 0)
                        return true;
                }
            },
            render: (contractList, data) => {
                let status;
                let color;
                if (contractList.length === 0) {
                    status = "미가입고객";
                    color = "volcano";
                } else if (contractList.length > 0) {
                    status = "가입고객";
                    color = "geekblue";
                }
                return (
                    <Tag color={color} key={data.id}>
                        {status}
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
                    <a style={{color:'purple'}}>Modify</a>
                </Space>
            ),
        },
    ];

    if (error) {
        return (
            <div>
                에러가 발생하였습니다.
            </div>
        );
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                고객명
            </Menu.Item>
            <Menu.Item key="2">
                전화번호
            </Menu.Item>
        </Menu>
    );

    const onSearch = value => {
        if (value === "")
        {
            setSearchData(data);
        }
        else if (option === "전화번호")
        {
            console.log("number");
            console.log(value);
            let res = [];
            data.forEach(function (d){
                if (d.phoneNumber.includes(value))
                    res.push(d);
            })
            setSearchData(res);
        }
        else if (option === "고객명")
        {
            console.log("name");
            console.log(value);
            let res = [];
            data.forEach(function (d){
                if (d.name.includes(value))
                    res.push(d);
            })
            setSearchData(res);
        }
    };

    return (
        <Wrapper title={title} underline={true} subtitle={subtitle} >
            <Space>
                <Dropdown overlay={menu}>
                    <Button style={{ width: 95 }}>
                        {option} <DownOutlined />
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
                <Divider type="vertical" />
                <StyledSpan>계약 만기일</StyledSpan><RangePicker />
                <Divider type="vertical" />
                <StyledSpan>연령대</StyledSpan>
                <div className="site-input-group-wrapper">
                    <Input.Group compact>
                        <Select defaultValue="1">
                            <Option value="1">Between</Option>
                            <Option value="2">Except</Option>
                        </Select>
                        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                        <Input
                            className="site-input-split"
                            style={{
                                width: 30,
                                borderLeft: 0,
                                borderRight: 0,
                                pointerEvents: 'none',
                            }}
                            placeholder="~"
                            disabled
                        />
                        <Input
                            className="site-input-right"
                            style={{
                                width: 100,
                                textAlign: 'center',
                            }}
                            placeholder="Maximum"
                        />
                    </Input.Group>
                </div>
                <Divider type="vertical" />
                <Radio.Group value="15px">
                    <Radio.Button value="남">남</Radio.Button>
                    <Radio.Button value="여">여</Radio.Button>
                </Radio.Group>
            </Space>
            <DataTable2 dataSource={searchData} columns={columns} loading={loading} onRow={onRow}/>
        </Wrapper>
    )
}

export default Client;