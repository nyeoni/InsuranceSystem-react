import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  DatePicker,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Divider,
  Select,
  Modal,
  Spin,
  notification,
  Descriptions,
  Badge,
} from "antd";
import "../../css/Detail.css";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import { useForm } from "antd/es/form/Form";
import { Wrapper } from "../../components/Wrapper";
import { useParams } from "react-router-dom";
import useAxios from "../../swr/useAxios";
import { useSWRConfig } from "swr";
import { apiCall } from "../../library/ApiCall";

const UWDetail = (props) => {
  const params = useParams();
  console.log("params", params);
  const { id } = params;
  const url = `/contract/${id}`;
  const { mutate } = useSWRConfig();

  const {
    data: contract,
    isLoading,
    isError,
  } = useAxios(`/contract/${id}`, "get");

  if (isError) return <div>에러가 발생했습니다</div>;
  if (!contract || isLoading) {
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

  function onUWButton() {
    const res = apiCall(url, "put", { ...contract, contractStatus: "계약중" });
    mutate(`/contract/${id}`, { ...contract, contractStatus: "계약중" }, false);
    console.log("mutate success");
    console.log(res);
  }

  return (
    <Wrapper
      title={"인수심사"}
      subtitle={"해당 계약신청을 심사합니다."}
      underline={true}
    >
      <Descriptions bordered>
        <Descriptions.Item label="가입보험 ID">
          {contract.insuranceId}
        </Descriptions.Item>
        <Descriptions.Item label="고객 ID">
          {contract.clientId}
        </Descriptions.Item>
        <Descriptions.Item label="신청 경로">
          {contract.channel}
        </Descriptions.Item>
        <Descriptions.Item label="계약 ID">{contract.id}</Descriptions.Item>
        <Descriptions.Item label="가입보험 이름" span={2}>
          {contract.insuranceName}
        </Descriptions.Item>
        <Descriptions.Item label="계약기간" span={2}>
          {contract.contractDate.startDate.split("T")[0]} ~{" "}
          {contract.contractDate.endDate.split("T")[0]}
        </Descriptions.Item>
        <Descriptions.Item label="계약상태">
          <Badge
            status={
              contract.contractStatus === "계약중" ? "processing" : "success"
            }
            text={contract.contractStatus}
          />
        </Descriptions.Item>
      </Descriptions>
      <hr />
      <Button
        disabled={contract.contractStatus === "계약중" ? true : false}
        onClick={onUWButton}
      >
        인수심사
      </Button>
    </Wrapper>
  );
};
export default UWDetail;
