import React, {useEffect, useState} from "react";
import { Wrapper } from "../../../components/Wrapper";
import { DataTable2 } from "../../../components/DataTable2";
import {Button, Dropdown, Menu, Radio, Space, Spin, Tag} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import useAxios from "../../../swr/useAxios";

const Underwriting = ({ match, history }) => {
  const title = "인수심사";
  const subtitle = "각 계약에 따른 인수심사로 조건을 평가하여 계약을 인수하는 페이지";
  const { data: contracts, isLoading, isError } = useAxios('/contract', "get");
  const [searchData, setSearchData] = useState(contracts);

  const {statueFilter, setStatueFilter} = useState('전체');

  useEffect(() => {
    setSearchData(contracts);
  },[contracts])

  //contract
  const [option, setOption] = useState("보험번호");
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
      width: "20%",
      render: (record) => record.clientId,
    },
    {
      title: "보험 이름",
      width: "20%",
      render: (record) => record.insuranceId,
    },
    {
      title: "계약 채널",
      width: "10%",
      render: (record) => record.channel,
    },
    {
      title: "계약 상태",
      width: "10%",
      render: (record) => record.contractStatus,
    },
  ];

  const onRow = (record) => {
    return{
        onClick: () => {
          history.push(`${match.url}/${record.id}`);
        },
    }
  };

  function handleMenuClick(e) {
    if (e.key === "1") {
      setOption("고객번호");
    } else if (e.key === "2") {
      setOption("보험번호");
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">고객번호</Menu.Item>
      <Menu.Item key="2">보험번호</Menu.Item>
    </Menu>
  );

  function statueFilterChange(event) {
    let res = [];
    switch (event.target.value){
      case '계약신청':
        contracts.forEach(function (d){if(d.contractStatus === '계약신청') res.push(d);});
        setSearchData(res);break;
      case '계약중':
        contracts.forEach(function (d){if(d.contractStatus === '계약중') res.push(d);});
        setSearchData(res);break;
      default :
        setSearchData(contracts); break;
    }
  }

  //exception
  if (isError) {return <div>에러가 발생하였습니다.</div>;}
  if (isLoading) {return (<Wrapper><Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/></Wrapper>);}


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
