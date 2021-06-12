
import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Button, Dropdown, Menu, Space, Tag, Typography} from "antd";
import {DataTable2} from "../../components/DataTable2";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ClaimDetail from "./ClaimDetail";
import InfoModal from "../../components/InfoModal";

async function getInsurances() {
    const response = await axios.get(
        'http://hminsu.net/api/partner'
    );
    return response.data.data;
}
const Cooperation = ({match, history}) => {
    const title = "협력업체관리";
    const subtitle = "HM 보험회사와 협력 관계를 가지는 업체들을 조회하고, 관리할 수 있는 페이지 입니다"
    const [visible, setVisible] = React.useState(false);
    const [clickedRecord, setClickedRecord] = React.useState([]);

    const [data, setData] = useState([]);
    const [option, setOption] = useState("업체 이름");
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
    const [initialState, refetch] = useAsync(getInsurances, settingData, [getInsurances], skip);
    const { loading, error } = initialState;
    if (error) {
        return (<div>에러가 발생하였습니다.</div>
        );
    }
    function handleMenuClick(e) {
        if (e.key === '1')
        {
            console.log('click', e.key);
            setOption("업체 이름");
        }
        else if (e.key === '2')
        {
            console.log('click', e.key);
            setOption("업체 주소");
        }
    }

    const columns = [
        {
            title: '협력업체 번호',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '업체 이름',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '업체 주소',
            dataIndex: 'address',
            key: 'address',
            width: '20%',
            render: text => <a>{text}</a>,
        },
        {
            title: '관리 직원 ID',
            width: '10%',
            render: (record) => record.employee.id,
        },
        {
            title: '업체 분류',
            key: 'category',
            dataIndex: 'category',
            width: '20%',
            filters: [
                {
                    text: '병원',
                    value: '병원',
                },
                {
                    text: '현장출동업체',
                    value: '현장출동업체',
                },
                {
                    text: '자동차정비업체',
                    value: '자동차정비업체',
                },
                {
                    text: '변호사',
                    value: '변호사',
                },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            render: partnerCategory => {
                let color;
                let value;
                if (partnerCategory === '병원') {
                    value = "병원";
                    color = 'geekblue';
                } else if (partnerCategory === '현장출동업체') {
                    value = "현장출동업체";
                    color = 'green';
                } else if (partnerCategory === '자동차정비업체') {
                    value = "자동차정비업체";
                    color = 'yellow';
                } else if (partnerCategory === '변호사') {
                    value = "변호사";
                    color = 'red';
                }
                return (
                    <Tag color={color} key={partnerCategory}>{value}</Tag>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (text, record) =>(<Space size="middle"><Button onClick={(event) => onRow(record)} style={{color:'blueviolet'}}>담당 처리사고 조회</Button></Space>)
        },
    ];
    const onRow = (record) => {
        console.log('a', record.id)
        setClickedRecord(searchData.find(r => r.id === record.id))
        setVisible(true);
    };
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">업체 이름</Menu.Item>
            <Menu.Item key="2">업체 주소</Menu.Item>
        </Menu>
    );
    const onSearch = value => {
        console.log(typeof(value));
        console.log(value);
        if (value == "") {setSearchData(data);}

        else if (option == "업체 이름") {
            console.log(value);
            setSearchData(data.filter(d => d.partnerName === value))
        }

        else if (option == "업체 주소"){
            console.log(value);
            let res = [];
            data.forEach(function (d){if (d.partnerAddress.includes(value)) res.push(d);})
            setSearchData(res);
        }
    };
    const onClick = () => {
        history.push(`${match.url}/addpartner`)
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
            <Button variant="contained" style={{float: 'right'}} color="primary" onClick={onClick}>Add Partner</Button>
            <DataTable2 loading={loading} dataSource={searchData} columns = {columns} title = {title}/>
            <InfoModal title = {title} clickedRecord = {clickedRecord} visible = {visible} setVisible = {setVisible}/>
        </Wrapper>

    )
}
export default Cooperation;
