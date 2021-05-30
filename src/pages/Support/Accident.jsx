import React, {useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import {DataTable2} from "../../components/DataTable2";
import {Button, Dropdown, Menu, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import {render} from "react-dom";
import InfoModal from "../../components/InfoModal";
import AccidentModal from "../../components/AccidentModal";
//고객들의 리스트(고객명, 고객번호, 상품이름, 전화번호, 접수사유, 접수 상태)
//고객번호 또는 성명으로 검색
async function getAccident() {
    const response = await axios.get(
        'https://60aba7e95a4de40017cca8e4.mockapi.io/accident'
    );
    return response.data;
}

const Accident = () => {
    const title = "사고접수처리";
    const subtitle  = "고객의 사고 접수에 따른 보상을 위해 추가적인 정보를 입력하여 사고접수 처리하는 페이지입니다"
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
    const { loading, error } = initialState;
    if (error) {
        return (<div>에러가 발생하였습니다.</div>);
    }

    function handleMenuClick(e) {
        if (e.key === '2') {
            console.log('click', e.key);
            setOption("고객 성명");
        }
        else if (e.key === '1') {
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
            title: '고객 성명',
            dataIndex: 'clientName',
            key: 'clientName',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '고객 ID번호',
            dataIndex: 'clientId',
            key: 'clientId',
            width: '10%',
            render: text => <a>{text}</a>,
        },
        {
            title: '가입된 상품',
            dataIndex: 'registeredInsuranceId',
            key: 'registeredInsuranceId',
            render: text => <a>{text}</a>,
        },
        {
            title: '전화번호',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
            render: text => <a>{text}</a>,
        },
        {
            title: '접수 사유',
            dataIndex: 'reason',
            key: 'reason',
            render: text => <a>{text}</a>,
        },
        {
            title: '접수 상태',
            dataIndex: 'status',
            key: 'status',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (<Space size="middle"><a onClick={() => onRow(record)} style={{color:'orangered'}}>사고 접수</a></Space>),
        },
    ];
    const onRow = (record) => {
        console.log('a', record.id)
        setClickedRecord(searchData.find(r => r.id === record.id))
        setVisible(true);

    };
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">고객 ID</Menu.Item>
            <Menu.Item key="2">고객 성명</Menu.Item>
        </Menu>
    );

    const onSearch = value => {
        let name;
        console.log(typeof(value));
        console.log(value);
        if (value == "") {setSearchData(data);}
        else if (option == "고객 성명") {
            console.log("clientName");
            console.log(value);
            let res = [];
            data.forEach(function (d){
                if (d.clientName.includes(value)) res.push(d);
            })
            setSearchData(res);
        }
        else if (option == "고객 ID") {
            console.log("number");
            console.log(value);
            setSearchData(data.filter(d => d.id === value))
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
            <DataTable2 loading={loading} dataSource={searchData} columns = {columns} title = {title}/>
            <AccidentModal clickedRecord = {clickedRecord} visible = {visible} setVisible = {setVisible}/>
        </Wrapper>
    )
}

export default Accident;