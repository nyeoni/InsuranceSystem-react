import React from "react";
import axios from "axios";
import { Wrapper } from "../../components/Wrapper";
import "../../css/Detail.css";
import { GeneralTable } from "../../components/GeneralTable";
import useAsync from "../../customHooks/useAsync";

async function getBoards() {
  const response = await axios.get(
    "https://608c26ef9f42b20017c3d801.mockapi.io/api/v1/board"
  );
  return response.data;
}

const Board = ({ match, history }) => {
  const [state, refetch] = useAsync(getBoards, null, [getBoards]);
  const { loading, data, error } = state;

  const onRow = (record, rowIndex) => {
    return {
      onClick: () => {
        // 여기에 라우팅
        // history.push(`${match.url}/${record.id}`)
      },
    };
  };

  // TODO : NOTFOUND PAGE
  if (error) {
    return <div>에러가 발생하였습니다.</div>;
  }
  // if (!data) return null;

  return (
    <Wrapper title="공지사항" underline={true}>
      <GeneralTable
        dataSource={data}
        loading={loading}
        onRow={onRow}
        match={match}
      />
    </Wrapper>
  );
};

export default Board;
