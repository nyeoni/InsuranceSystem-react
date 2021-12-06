import React, {useEffect, useState} from "react";
import { Wrapper } from "../../../components/Wrapper";
import { DataTable2 } from "../../../components/DataTable2";
import {Button, Dropdown, Menu, Space, Spin, Tag} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import useAxios from "../../../swr/useAxios";


const Underwriting = ({ match, history }) => {
  const title = "인수심사";
  const subtitle = "각 계약에 따른 인수심사로 조건을 평가하여 계약을 인수하는 페이지";
  const { data: contracts, isLoading, isError } = useAxios('/contract', "get");
  const [searchData, setSearchData] = useState(contracts);

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

  //exception
  if (isError) {return <div>에러가 발생하였습니다.</div>;}
  if (isLoading) {return (<Wrapper><Spin style={{textAlign: "center", width: "100%", height: "100%", marginTop: "200px"}}/></Wrapper>);}

  return (
    <Wrapper title={title} subtitle={subtitle} underline={true}>
      <Space>
        <Dropdown overlay={menu}>
          <Button style={{ width: 95 }}>
            {option} <DownOutlined />
          </Button>
        </Dropdown>
        <Search placeholder="검색할 내용" allowClear style={{ width: 300 }} />
      </Space>
      <DataTable2 onRow={onRow} loading={isLoading} dataSource={searchData} columns={columns} title={title}/>
    </Wrapper>
  );
};

export default Underwriting;
