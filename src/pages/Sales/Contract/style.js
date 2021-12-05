import styled from "styled-components";

export const FilterPannel = styled.div`
  width: 100%;
  height: 67px;
  background-color: #f2f2f2;
  border-radius: 1em;
  margin: 1rem 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  display: flex;
  align-content: space-around;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

export const LargeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px auto;
  margin-bottom: 20px;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

export const SmallContainer = styled.div`
  width: 32%;
  min-width: 290px;
  height: 400px;
  border-radius: 1em;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1) !important;
  padding: 1rem 1rem 1rem 1rem;
  background-color: white;
`;
