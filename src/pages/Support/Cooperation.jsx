import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import {Button, Dropdown, Menu, Space, Tag, Typography} from "antd";
import {DataTable2} from "../../components/DataTable2";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import AccidentModal from "../../components/AccidentModal";

async function getInsurances() {
    const response = await axios.get(
        'https://60aba7e95a4de40017cca8e4.mockapi.io/partner'
    );
    return response.data;
}
//id, name, address, contactNumber, PartnerCategory(guswkdcnfehddjqcp , quddnjs wkehd), employee_id,
const Cooperation = () => {
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
            dataIndex: 'partnerName',
            key: 'partnerName',
            render: text => <a>{text}</a>,
        },
        {
            title: '업체 주소',
            dataIndex: 'partnerAddress',
            key: 'partnerAddress',
            width: '20%',
            render: text => <a>{text}</a>,
        },
        {
            title: '업체 분류',
            key: 'partnerCategory',
            width: '15%',
            dataIndex: 'partnerCategory',
            filters: [
                {
                    text: '병원',
                    value: 'Hospital',
                },
                {
                    text: '사고 현장관리',
                    value: 'Anycar',
                },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            render: partnerCategory => {
                let color;
                let value;
                if (partnerCategory === '병원') {
                    value = "병원";
                    color = 'geekblue';
                } else if (partnerCategory === '사고 현장관리') {
                    value = "사고 현장관리";
                    color = 'green';
                }
                return (
                    <Tag color={color} key={partnerCategory}>{value}</Tag>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',

            render: (text, record) =>(<Space size="middle"><a onClick={() => onRow(record)} style={{color:'blueviolet'}}>Modify</a></Space>)
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
            {/*<AccidentModal clickedRecord = {clickedRecord} visible = {visible} setVisible = {setVisible}/>*/}
        </Wrapper>

    )
}
export default Cooperation;