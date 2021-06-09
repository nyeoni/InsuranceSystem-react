import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import {Button, Dropdown, Menu, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import ClaimDetail from "./ClaimDetail";
import {Route} from "react-router-dom";

async function getAccident() {
    const response = await axios.get(
        '/api/claim'
    );
    return response.data.data;
}

const Claim = ({match, history}) => {
    const title = "사고접수처리";
    const subtitle = "고객의 사고 접수에 따른 보상을 위해 추가적인 정보를 입력하여 사고접수 처리하는 페이지입니다"
    const [visible, setVisible] = React.useState(false);
    const [clickedRecord, setClickedRecord] = React.useState([]);

    const [data, setData] = useState([]);
    const [option, setOption] = useState("고객 성명");
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
    const [initialState, refetch] = useAsync(getAccident, settingData, [getAccident], skip);
    const {loading, error} = initialState;
    if (error) {
        console.log('Error', error.message);
        return (<div>에러가 발생하였습니다.</div>);
    }

    function handleMenuClick(e) {
        if (e.key === '2') {
            console.log('click', e.key);
            setOption("고객 성명");
        } else if (e.key === '1') {
            console.log('click', e.key);
            setOption("고객 ID");
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
            title: '담당 직원 ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '계약 번호',
            dataIndex: 'contractId',
            key: 'contractId',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '손해액',
            dataIndex: 'damageCost',
            key: 'damageCost',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '상세 내용',
            dataIndex: 'claimDetail',
            key: 'claimDetail',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '과실 비율',
            dataIndex: 'claimRate',
            key: 'claimRate',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '사고 원인',
            dataIndex: 'reason',
            key: 'reason',
            render: text => <a>{text}</a>,
        },
        {
            title: '사고일자',
            dataIndex: 'accidentDate',
            key: 'accidentDate',
            render: text => <a>{text}</a>,
        },
        {
            title: '접수 상태',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => <a onClick={() => onRow(record)} style={{color: 'orangered'}}>{text}(변경하기)</a>,
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <Space size="middle"><a onClick={() => evaluatePartner(record)} style={{color: 'blue'}}>업체 평가하기</a></Space>),
        },
    ];
    const onRow = (record) => {
        let clickedRecord = searchData.find(r => r.id === record.id)
        setClickedRecord(searchData.find(r => r.id === record.id))
        setVisible(true);
    };
    const evaluatePartner = (record) => {
        let clickedRecord = searchData.find(r => r.id === record.id)
        setClickedRecord(searchData.find(r => r.id === record.id))
        alert("보상 대기중일때 업체 등록과 평가가 가능합니다.")
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">고객 ID</Menu.Item>
            <Menu.Item key="2">고객 성명</Menu.Item>
        </Menu>
    );

    const onSearch = value => {
        let name;
        console.log(typeof (value));
        console.log(value);
        if (value == "") {
            setSearchData(data);
        } else if (option == "고객 성명") {
            console.log("clientName");
            console.log(value);
            let res = [];
            data.forEach(function (d) {
                if (d.clientName.includes(value)) res.push(d);
            })
            setSearchData(res);
        } else if (option == "고객 ID") {
            console.log("number");
            console.log(value);
            setSearchData(data.filter(d => d.id === value))
        }
    };
    const onClick = () => {
        history.push(`${match.url}/addclaim`)
    }
    return (
        <Wrapper title={title} subtitle={subtitle} underline={true}>
            <Space>
                <Dropdown overlay={menu}>
                    <Button style={{width: 95}}>
                        {option} <DownOutlined/>
                    </Button>
                </Dropdown>
                <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{width: 300}}/>
            </Space>
            <Button variant="contained" style={{float: 'right'}} color="primary" onClick={onClick}>Add Claim</Button>
            <DataTable2 loading={loading} dataSource={searchData}
                        columns={columns.filter(col => col.dataIndex !== 'claimDetail' && col.dataIndex !== 'damageCost' && col.dataIndex !== 'claimRate')}
                        title={title}/>
            <ClaimDetail visible={visible} setVisible={setVisible} clickedRecord={clickedRecord} columns={columns}/>
        </Wrapper>
    )
}

export default Claim;