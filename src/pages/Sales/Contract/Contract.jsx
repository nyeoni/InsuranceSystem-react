import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "../../../components/Wrapper";
import { FilterPannel, LargeContainer, SmallContainer } from "./style";
import {
  Button,
  DatePicker,
  Dropdown,
  Menu,
  Select,
  Space,
  Spin,
  Statistic,
} from "antd";
import axios from "axios";
import useAsync from "../../../customHooks/useAsync";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import useAxios from "../../../swr/useAxios";
import Search from "antd/es/input/Search";

const { Option } = Select;

async function getInsurances() {
  const response = await axios.get("http://hminsu.net:8000/insurance");
  console.log("response Fuck you!", response);
  return response.data.data;
}

// ID, 보험이름, 고객이름, 관리인아이디, 채널
// 분기는 안하는걸로
const Contract = () => {
  const title = "계약관리";
  const subtitle =
    "보험상품의 대시보드를 통해 잠재적 가치 창출을 할 수 있는 페이지입니다.";
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [option, setOption] = useState("전체");
  const [category, setCategory] = useState("HM 운전자 보험");
  const [skip, setSkip] = useState(false);

  const {
    data: insurances,
    isLoading,
    isError,
  } = useAxios("/insurance", "get");

  const [target, setTarget] = useState("전체");
  const [insu, setInsu] = useState(1);
  const [quaterData, setQuaterData] = useState({});
  const [channelData, setChannelData] = useState({});
  const [ageData, setAgeData] = useState({});

  const [year, setYear] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getInsurances();
      setData(data);
      //   console.log(data[insu - 1].contractList);
    };
    fetchEvent();
  }, [insu]);

  // Handler
  const handleCategoryChange = useCallback((value, info) => {
    setCategory(value);
    setInsu(info.key);
    console.log(info.key);
  }, []);

  const handleEmployeeClick = useCallback((e) => {
    switch (e.key) {
      case "전체조회":
        setOption("전체");
        break;
      case "직원ID":
        setOption("사원ID");
        break;
      default:
        setOption("전체");
    }
  }, []);

  const handleDateChange = useCallback((date, dateString) => {
    console.log(date, dateString);
  }, []);

  const menu = (
    <Menu onClick={handleEmployeeClick}>
      <Menu.Item key="전체조회">전체 조회</Menu.Item>
      <Menu.Item key="직원ID">관리 직원ID</Menu.Item>
    </Menu>
  );

  const onSearch = (value) => {};

  if (!data || isLoading) {
    return (
      <Wrapper>
        <Spin
          style={{
            textAlign: "center",
            width: "100%",
            height: "100%",
            marginTop: "200px",
          }}
        />
      </Wrapper>
    );
  }

  if (isError) {
    return <div>에러가 발생하였습니다.</div>;
  }
  if (isLoading) return <div>Fuck you</div>;

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "분기별 계약 추세",
      },
    },
  };

  return (
    <Wrapper title={title} subtitle={subtitle}>
      <FilterPannel>
        <Space>
          <DatePicker
            placeholder="2021"
            onChange={handleDateChange}
            picker="year"
          />
          <Select
            defaultValue={category}
            style={{ width: 150, alignContent: "space-between" }}
            onChange={handleCategoryChange}
          >
            {data.map((data) => (
              <Option key={data.id} value={data.name}>
                {data.name}
              </Option>
            ))}
          </Select>
        </Space>
        <Space>
          <Dropdown overlay={menu}>
            <Button style={{ width: 95 }}>
              {option} <DownOutlined style={{ alignSelf: "end" }} />
            </Button>
          </Dropdown>
          <Search
            placeholder="검색할 내용"
            allowClear
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </Space>
      </FilterPannel>
      {/* <LargeContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
          }}
        >
          <SmallContainer style={{ width: "100%", height: "30%" }}>
            <div
              style={{
                marginLeft: "1.5rem",
                marginRight: "7rem",
                marginTop: "1rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>{target} 실적 리포트</div>
              <LargeContainer>
                <Statistic title="총 영업건수" value={112893} />
                <Statistic
                  title="전 분기대비"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
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
          <SmallContainer style={{ width: "100%", height: "68%" }}>
            <Bar data={quaterData} width={23} height={13} options={options} />
          </SmallContainer>
        </div>

        <SmallContainer
          style={{
            width: "40%",
            height: "650px",
            padding: "1rem 1rem 1rem 1rem",
          }}
        >
          <div style={{ height: "300px" }}>
            <Doughnut
              width={7}
              height={7}
              className="doughnut"
              data={channelData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  title: {
                    display: true,
                    text: "채널별 비율",
                    fontSize: 16,
                  },
                },
              }}
            />
            <Doughnut
              width={7}
              height={7}
              className="doughnut"
              data={ageData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  title: {
                    display: true,
                    text: "연령대 비율",
                    fontSize: 16,
                  },
                },
              }}
            />
          </div>
        </SmallContainer>
      </LargeContainer> */}
    </Wrapper>
  );
};

export default React.memo(Contract);
