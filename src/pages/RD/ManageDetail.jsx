import React, { useEffect, useState } from "react";
import { Wrapper } from "../../components/Wrapper";
import useAsync from "../../customHooks/useAsync";
import axios from "axios";
import { Row, Col, Form, Spin, Statistic, Tabs } from "antd";
import styled from "styled-components";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import ManageUpdate from "./ManageModify";
import { useParams } from "react-router-dom";
import useContracts from "../../swr/useContracts";
import useAxios from "../../swr/useAxios";

async function getInsurance(id) {
  const response = await axios.get(`/insurance/${id}`);
  return response.data.data;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-around;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-right: 3px;
  padding-left: 3px;
  margin-top: 2rem;
  background-color: white;
`;

const ManageDetail = () => {
  const params = useParams();
  const { id } = params;
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const [quaterData, setQuaterData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const { data: insurance } = useAxios(`/insurance/${id}`, "get");
  const { contracts, isLoading, isError } = useContracts();
  const [data, setData] = useState();

  console.log("insurance", insurance);
  const makeQuaterData = (items) => {
    console.log(items);
    let quater = [0, 0, 0, 0];
    let channel = [0, 0, 0];
    items?.forEach((d) => {
      const currentDate = new Date(d.contractDate.registerDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const date = currentDate.getDate();

      if (month >= 1 && month < 4) {
        quater[0] += 1;
      } else if (month >= 4 && month < 7) {
        quater[1] += 1;
      } else if (month >= 7 && month < 10) {
        quater[2] += 1;
      } else {
        quater[3] += 1;
      }
    });

    items?.forEach((d) => {
      const ch = d.channel;
      if (ch === "온라인") channel[0] += 1;
      else if (ch === "전화") channel[1] += 1;
      else channel[2] += 1;
    });

    setQuaterData({
      labels: ["1분기", "2분기", "3분기", "4분기"],
      datasets: [
        {
          label: "계약 고객",
          backgroundColor: "#A0CBED",
          barThickness: 40,
          fill: false,
          data: quater,
        },
      ],
    });
    setChannelData({
      labels: ["온라인", "전화", "대면"],
      datasets: [
        {
          label: "온라인, 전화, 대면",
          backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
          cutout: "50%",
          fill: false,
          data: channel,
        },
      ],
    });
  };

  useEffect(() => {
    console.log(contracts);
    const filterData = contracts?.filter(
      (contract) => contract.insuranceId === id
    );
    // contracts.forEach((c) => console.log(c));
    console.log(filterData);
    setData(filterData);
    makeQuaterData(filterData);
  }, [isLoading]);

  if (isError) return <div>에러가 발생했습니다</div>;
  if (!contracts || isLoading) {
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

  function callback(key) {
    console.log(key);
  }

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
    <Wrapper title={insurance?.name} underline={false}>
      {/*<div style={{marginTop: '1rem'}}>{insurance.description}</div>*/}
      <Tabs
        style={{ marginTop: "1rem" }}
        defaultActiveKey="1"
        onChange={callback}
      >
        <TabPane tab="상품분석" key="1">
          <div style={{ marginTop: "1rem" }}>
            <Row gutter={8}>
              <Col span={8}>
                <Statistic title="계약 수" value={112893} />
              </Col>
              <Col span={8}>
                <Statistic title="전체 차지 비율" value="15%" precision={2} />
              </Col>
            </Row>
            <StyledDiv>
              <div style={{ width: "60%" }}>
                <Line
                  data={quaterData}
                  width={30}
                  height={15}
                  options={options}
                />
              </div>

              <div style={{ height: "300px", width: "40%", marginTop: "15px" }}>
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
              </div>
            </StyledDiv>
          </div>
        </TabPane>
        <TabPane tab="상품수정" key="2">
          <ManageUpdate />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default ManageDetail;
