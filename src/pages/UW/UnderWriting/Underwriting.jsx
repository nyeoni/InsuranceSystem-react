import React, {useEffect, useState} from "react";
import { Wrapper } from "../../../components/Wrapper";
import { DataTable2 } from "../../../components/DataTable2";
import axios from "axios";
import useAsync from "../../../customHooks/useAsync";
import { Button, Dropdown, Menu, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

async function getContract() {
  const response = await axios.get("/contract");
  console.log("contract", response.data.data);
  return response.data.data;
}

const Underwriting = ({ match, history }) => {
  const title = "인수심사";
  const subtitle =
    "각 계약에 따른 인수심사로 조건을 평가하여 계약을 인수하는 페이지";
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [clickedRecord, setClickedRecord] = React.useState([]);
  //contract
  const [data, setData] = useState([]);
  const [option, setOption] = useState("보험번호");
  const [searchData, setSearchData] = useState([]);
  const [skip, setSkip] = useState(false);
  const settingData = (data) => {
    if (data) {
      setData(data);
      setSearchData(data);
    } else {
      console.log("데이터 설정 실패");
    }
  };
  const [initialState, refetch] = useAsync(
    getContract,
    settingData,
    [getContract],
    skip
  );
  const { loading, error } = initialState;
  if (error) {
    return <div>에러가 발생하였습니다.</div>;
  }

  useEffect(() => {
    setSearchData(contracts);
  },[contracts])

  //contract
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "고객 ID",
      width: "10%",
      render: (record) => record.clientId,
    },
    {
      title: "고객 성명",
      width: "15%",
      render: (record) => record.clientId,
    },
    {
      title: "보험 이름",
      width: "15%",
      render: (record) => record.insuranceName,
    },
    {
      title: "계약 채널",
      width: "10%",
      render: (record) => record.contractDate.startDate,
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          {record.contractStatus === "계약신청" ? (
            <Button
              onClick={() => onRow(record)}
              style={{ color: "blueviolet" }}
            >
              인수심사
            </Button>
          ) : (
            <Button disabled={true}>인수심사 마감</Button>
          )}
        </Space>
      ),
    },
  ];

  const onRow = (record) => {
    navigate(`/uw/underwriting/${record.id}`);
  };

  const statueFilterChange = (event) => {
    setStatueFilter(event.target.value);
    let temp = [];
    switch (event.target.value){
      case '계약신청':
        contracts.forEach(function (d){if(d.contractStatus === '계약신청') temp.push(d);});
        setSearchData(temp);break;
      case '계약중':
        contracts.forEach(function (d){if(d.contractStatus === '계약중') temp.push(d);});
        setSearchData(temp);break;
      default :
        setSearchData(contracts); break;
    }
  }

  //exception
  if (isError) {return <div>에러가 발생하였습니다.</div>;}
  if (isLoading) {return <div>로딩 중 입니다.</div>;}

  return (
    <Wrapper title={title} subtitle={subtitle} underline={true}>
      <Space>
        <Radio.Group value={statueFilter} onChange={statueFilterChange}>
          <Radio.Button value="전체">전체</Radio.Button>
          <Radio.Button value="계약신청">계약 신청</Radio.Button>
          <Radio.Button value="계약중">계약 중</Radio.Button>
        </Radio.Group>
      </Space>
      <DataTable2 onRow={onRow} loading={isLoading} dataSource={searchData} columns={columns} title={title}/>
    </Wrapper>
  );
};

export default Underwriting;
