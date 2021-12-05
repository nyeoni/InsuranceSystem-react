import React, { useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import { DataTable2 } from "../../components/DataTable2";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import { Button, Dropdown, Menu, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

async function getContract() {
  const response = await axios.get("/api/contract");
  return response.data.data;
}

const Underwriting = ({ match, history }) => {
  const title = "인수심사";
  const subtitle =
    "각 계약에 따른 인수심사로 조건을 평가하여 계약을 인수하는 페이지";
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
      render: (record) => record.client.id,
    },
    {
      title: "고객 성명",
      width: "15%",
      render: (record) => record.client.name,
    },
    {
      title: "보험 이름",
      width: "15%",
      render: (record) => record.insurance.name,
    },
    {
      title: "계약 신청일",
      width: "10%",
      render: (record) => record.contractDate.registerDate.split("T")[0],
    },
    {
      title: "보험분류",
      width: "10%",
      filters: [
        {
          text: "자동차보험",
          value: "Car",
        },
        {
          text: "운전자보험",
          value: "Driver",
        },
        {
          text: "화재보험",
          value: "Fire",
        },
        {
          text: "여행보험",
          value: "Traveller",
        },
      ],
      onFilter: (value, record) =>
        record.insurace.category.indexOf(value) === 0,
      render: (record) => {
        let color;
        let value;
        if (record.insurance.category === "자동차") {
          value = "자동차보험";
          color = "geekblue";
        } else if (record.insurance.category === "운전자") {
          value = "운전자보험";
          color = "green";
        } else if (record.insurance.category === "화재") {
          value = "화재보험";
          color = "volcano";
        } else {
          value = "여행보험";
          color = "yellow";
        }
        return (
          <Tag color={color} key={record.insurance.category}>
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          {record.status === "계약신청" ? (
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
    history.push(`${match.url}/${record.id}`);
  };

  function handleMenuClick(e) {
    if (e.key === "1") {
      console.log("click", e.key);
      setOption("고객번호");
    } else if (e.key === "2") {
      console.log("click", e.key);
      setOption("보험번호");
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">고객번호</Menu.Item>
      <Menu.Item key="2">보험번호</Menu.Item>
    </Menu>
  );

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
      <DataTable2
        loading={loading}
        dataSource={searchData}
        columns={columns}
        title={title}
      />
    </Wrapper>
  );
};

export default Underwriting;
