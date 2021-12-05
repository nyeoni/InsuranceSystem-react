import styled from "styled-components";

export const StyledSpan = styled.span`
  font-size: 14px;
`;

export const FilterDiv = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  flex-direction: column;
  > * > * {
    margin-top: 0.5rem;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
