
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Wrapper} from "../../components/Wrapper";
import styled from "styled-components";
import {Button, DatePicker, Dropdown, Menu, Select, Space, Spin, Statistic} from "antd";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";

const { Option } = Select;

const FilterPannel = styled.div`
    width : 100%;
    height : 67px;
    background-color : #f2f2f2;
    border-radius : 1em;
    margin : 1rem 0;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    display : flex;
    align-content : space-around;
    justify-content: space-between;
    padding : 1rem 2rem;
`

const LargeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px auto;
    margin-bottom: 20px;
    @media (max-width:1200px) {
        flex-wrap: wrap;
        flex-direction: column;
    }
`

const SmallContainer = styled.div`
    width: 32%;
    min-width: 290px;
    height: 400px;
    border-radius: 1em;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1) !important;
    padding: 1rem 1rem 1rem 1rem;
    background-color: white;
    
`

async function getInsurances() {
    const response = await axios.get(
        '/insurance'
    );
    return response.data.data;
}

const Contract = () => {
    const title = "계약관리"
    const subtitle = "보험상품의 대시보드를 통해 잠재적 가치 창출을 할 수 있는 페이지입니다."
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState({});
    const [option, setOption] = useState("전체");
    const [category, setCategory] = useState("HM 운전자 보험");
    const [skip, setSkip] = useState(false);
    const settingData = (data) => {
        if (data) {
            setData(data);
            setSearchData(data[0]);
            setSkip(true);
        } else {
            console.log("데이터 설정 실패");
        }
    }
    const [initialState, refetch] = useAsync(getInsurances, settingData, [getInsurances], skip);

    const { loading, error } = initialState;
    const [target, setTarget] = useState("전체");
    const [insu, setInsu] = useState(1);
    const [quaterData, setQuaterData] = useState({});
    const [channelData, setChannelData] = useState({});
    const [ageData, setAgeData] = useState({});

    const [year, setYear] = useState();

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getInsurances();
            console.log(data[insu-1].contractList);
            // makeQuaterData(data[insu-1].contractList);
            console.log("whatthe");
        }
        fetchEvent();
    }, [insu])

    // const makeQuaterData = (items) => {
    //     console.log(items);
    //     let quater = [0, 0, 0, 0];
    //     let channel = [0, 0, 0];
    //     let age = [0,0,0,0,0];
    //     items.forEach(d => {
    //         const currentDate = new Date(d.contractDate.registerDate);
    //         const year = currentDate.getFullYear();
    //         const month = currentDate.getMonth();
    //         const date = currentDate.getDate();
    //
    //         if (month >= 1 && month < 4) {
    //             quater[0] += 1;
    //         } else if (month >= 4 && month < 7) {
    //             quater[1] += 1;
    //         } else if (month >= 7 && month < 10) {
    //             quater[2] += 1;
    //         } else {
    //             quater[3] += 1;
    //         }
    //         console.log(quater);
    //     });
    //     items.forEach(d => {
    //         const ch = d.channel;
    //         if (ch === "온라인")
    //             channel[0] += 1;
    //         else if (ch === "전화")
    //             channel[1] += 1;
    //         else
    //             channel[2] += 1;
    //         console.log(channel);
    //     });
    //     items.forEach(d => {
    //         const age = d.clientAge;
    //         if (age === "온라인")
    //             channel[0] += 1;
    //         else if (age === "전화")
    //             channel[1] += 1;
    //         else
    //             channel[2] += 1;
    //         console.log(channel);
    //     });
    //
    //     setQuaterData({
    //         labels: ["1분기", "2분기", "3분기", "4분기"],
    //         datasets: [
    //             {
    //                 label : "계약 고객",
    //                 backgroundColor : "#A0CBED",
    //                 barThickness: 40,
    //                 fill : true,
    //                 data : quater
    //             }
    //         ]
    //     });
    //     setChannelData({
    //         labels: ["온라인", "전화", "대면"],
    //         datasets: [
    //             {
    //                 label : "온라인, 전화, 대면",
    //                 backgroundColor : ["#ff3d67", "#059bff", "#ffc233"],
    //                 cutout : '50%',
    //                 fill : false,
    //                 data : channel
    //             }
    //         ]
    //     });
    //     setAgeData({
    //         labels: ["20대", "30대", "40대", "50대", "60대 이상"],
    //         datasets: [
    //             {
    //                 label : "온라인, 전화, 대면",
    //                 backgroundColor : ["#ff3d67", "#059bff", "#ffc233", "#F7E7D6", "#F29D9D"],
    //                 cutout : '50%',
    //                 fill : false,
    //                 data : [5, 10, 15, 10, 5]
    //             }
    //         ]
    //     });
    // }

    // Handler
    const handleCategoryChange = useCallback((value, info) => {
        setCategory(value);
        setInsu(info.key);
        console.log(info.key);
        // makeQuaterData(targetData.contractList);
    }, [])

    const handleEmployeeClick = useCallback((e) => {
        if (e.key === '1')
        {
            console.log('click', e.key);
            setOption("전체");
        }
        else if (e.key === '2')
        {
            console.log('click', e.key);
            setOption("사원ID");
        }
    }, [])

    const handleDateChange = useCallback((date, dateString) => {
            console.log(date, dateString);
        }, [])

    const menu = (
        <Menu onClick={handleEmployeeClick}>
            <Menu.Item key="1">
                전체
            </Menu.Item>
            <Menu.Item key="2">
                사원ID
            </Menu.Item>
        </Menu>
    );

    const onSearch = value => {

    };

    if (!data || loading) {
        return(
            <Wrapper>
                <Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <div>
                에러가 발생하였습니다.
            </div>
        );
    }

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '분기별 계약 추세',
            }
        },

    }

    return (
        <Wrapper title={title} subtitle={subtitle}>
            <FilterPannel>
                <Space>
                    <DatePicker placeholder="2020" onChange={handleDateChange} picker="year" />
                    <Select defaultValue={category} style={{ width: 150, alignContent: 'space-between' }} onChange={handleCategoryChange}>
                        {data.map(data =>
                            <Option key={data.id} value={data.name}>{data.name}</Option>
                        )}
                    </Select>
                </Space>
                <Space>
                    <Dropdown overlay={menu}>
                        <Button style={{ width: 95 }}>
                            {option} <DownOutlined style={{alignSelf: 'end'}}/>
                        </Button>
                    </Dropdown>
                    <Search placeholder="검색할 내용" allowClear onSearch={onSearch} style={{ width: 300 }} />
                </Space>
            </FilterPannel>
            <LargeContainer>
                <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-between', width: '58%'}}>
                    <SmallContainer  style={{width: '100%', height: '30%'}}>
                        <div style={{marginLeft: '1.5rem', marginRight: '7rem', marginTop: '1rem'}}>
                            <div style={{marginBottom: '1.5rem'}}>{target} 실적 리포트</div>
                            <LargeContainer>
                                <Statistic title="총 영업건수" value={112893} />
                                <Statistic
                                    title="전 분기대비"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={true ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                    suffix="%"
                                />
                                <Statistic
                                    title="매출실적"
                                    value={9.3}
                                    precision={2}
                                    suffix="₩"
                                />
                            </LargeContainer>
                        </div>

                    </SmallContainer>
                    <SmallContainer style={{width: '100%', height: '68%'}}>
                        <Bar data={quaterData} width={23} height={13} options={options}/>
                    </SmallContainer>
                </div>

                <SmallContainer style={{width: '40%', height: '650px',padding: '1rem 1rem 1rem 1rem'}}>
                    <div style={{height: '300px'}}>
                        <Doughnut width={7} height={7} className="doughnut" data={channelData} options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: '채널별 비율',
                                    fontSize: 16
                                },

                            }}} />
                        <Doughnut width={7} height={7} className="doughnut" data={ageData} options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                title: {
                                    display: true,
                                    text: '연령대 비율',
                                    fontSize: 16
                                },

                            }}} />
                    </div>
                </SmallContainer>
            </LargeContainer>
        </Wrapper>
    )
}

export default React.memo(Contract);
