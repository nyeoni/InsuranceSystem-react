
import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import "../../css/Detail.css";
import {Button, Dropdown, DatePicker, Radio, Menu, Space, Tag, Input, Select, Divider, Descriptions} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import styled from "styled-components";
import ClientDetail from "./ClientDetail";
const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpan = styled.span`
    font-size: 14px;
`

const FilterDiv = styled.div`
    display: flex;
    align-content: space-around;
    justify-content: space-between;
    flex-direction: column;
`

const FlexDiv = styled.div`
    display: flex;
    align-content: space-around;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`

async function getClients() {
    const response = await axios.get(
        '/client/'
    );
    return response.data.data;
}
// todo: 유저 스키마 확인하기. 수정하기
const Client = ({match, history}) => {
    const title = "고객관리";
    const subtitle = "잠재 고객 및 계약 고객을 분석하여 추가 영업기회 확보";

    // load data and setting
    const [searchData, setSearchData] = useState([]);
    const [state, refetch] = useAsync(getClients, setSearchData, [getClients]);
    const { loading, data, error } = state;

    const [option, setOption] = useState("고객명"); // search
    const [dateRange, setDateRange] = useState({
        minDate: '',
        maxDate: ''
    });

    const [gender, setGender] = useState('전체'); // gender pick
    const [visible, setVisible] = useState(false);
    const [clickedRecord, setClickedRecord] = useState([]);

    // table utils
    const onRow = (record, rowIndex) => {
        return {
            onClick: () => {
                setVisible(true);
                setClickedRecord(record);
                console.log(record);
                console.log(rowIndex);
            },
        };
    };
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
            width: '20%',
            render: text => <a>{text}</a>,
        },
        {
            title: '성별',
            dataIndex: ['privacy', 'gender'],
            key: 'gender',
            width: '10%',
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
            render: gender => {
                let color, value;
                switch (gender){
                    case 'MALE': value = 'MALE'; color = 'green'; break;
                    case 'FEMALE': value = 'FEMALE'; color = 'geekblue'; break;
                }
                return (<Tag color={color} key={gender}>{value}</Tag>);
            }
        },
        {
            title: '전화번호',
            dataIndex: ['privacy', 'phoneNumber'],
            key: 'phoneNumber',
            width: '20%',
            render: text => <a>{text}</a>,
        },
        {
            title: '주민등록번호 앞자리',
            key: 'rrnFront',
            dataIndex: ['privacy', 'rrn', 'rrnFront'],
            width: '20%',
            render: text => <a>{text}</a>,
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

    // search utils
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

    // date range
    const dateChange = val => {
        if (val !== null) {
            setDateRange({
                minDate: val[0]._d,
                maxDate: val[1]._d,
            })
        }
        console.log(dateRange);
        console.log(val);
        console.log(val[0]);
        console.log(val[0]._d);
    }
    // exception
    if (error) {
        return (
            <div>
                에러가 발생하였습니다.
            </div>
        );
    }
    const genderChange = (event) => {
        if (gender === '남' && event.target.value == '남')
        {
            setGender('');
            console.log('남!');
        }
        else if (gender === '' && event.target.value == '')
        {
            setGender('');
            console.log('!');
        }
        else
            setGender(event.target.value);
    }

    return (
        <Wrapper title={title} underline={true} subtitle={subtitle} >
            <FilterDiv>
            <FlexDiv>
                <Space>
                    <Dropdown overlay={menu}>
                        <Button style={{ width: 95 }}>
                            {option} <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
                </Space>
                <Divider type="vertical" />
                <Space><StyledSpan>계약 만기일</StyledSpan><RangePicker onChange={dateChange}/></Space>
                <Divider type="vertical" />
                <Space>
                    <StyledSpan>연령대</StyledSpan>
                    <div className="site-input-group-wrapper">
                        <Input.Group compact>
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
                </Space>
                <Divider type="vertical" />
                <Radio.Group value={gender} onChange={genderChange}>
                    <Radio.Button value='남'>남</Radio.Button>
                    <Radio.Button value='여'>여</Radio.Button>
                    <Radio.Button value='전체'>전체</Radio.Button>
                </Radio.Group>
            </FlexDiv>
            </FilterDiv>
            <DataTable2 dataSource={searchData} columns={columns} loading={loading} onRow={onRow}/>
            <ClientDetail visible={visible} setVisible={setVisible} clickedRecord={clickedRecord}/>
        </Wrapper>
    )
}

export default Client;
