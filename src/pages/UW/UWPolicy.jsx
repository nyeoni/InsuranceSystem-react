import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { GeneralTable } from "../../components/GeneralTable";
import axios from "axios";
import useAsync from "../../customHooks/useAsync";
import { Button } from "antd";

async function getBoards() {
  const response = await axios.get(
    //hminsu.net/api/board/{id}
    "/board"
);
  return response.data.data;
}
const UWPolicy = ({ match, history }) => {
  const [state, refetch] = useAsync(getBoards, null, [getBoards]);
  const { loading, data, error } = state;

  const onRow = (record, rowIndex) => {
    return {
      onClick: () => {
        history.push(`${match.url}/${record.id}`);
      },
    };
  };
  if (error) {
    return <div>에러가 발생하였습니다.</div>;
  }
  const onClick = () => {
    history.push(`${match.url}/addpolicy`);
  };
  const title = "인수정책 수립";
  const subtitle = "계약 인수에 필요한 평가 기준을 수립해 공지할 페이지";
  return (
    <Wrapper title={title} subtitle={subtitle} underline={true}>
      <GeneralTable
        dataSource={data}
        loading={loading}
        onRow={onRow}
        match={match}
      />
      <Button
        variant="contained"
        style={{ float: "right" }}
        color="primary"
        onClick={onClick}
      >
        Add Policy
      </Button>
    </Wrapper>
  );
};

export default UWPolicy;
