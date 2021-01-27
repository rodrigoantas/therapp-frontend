import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const ContentTitle = styled.h1`
  margin: 50px;
`;
export const TherapistList = styled.div`
  background-color: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f5f5f6;
`;
export const Therapist = styled(Link)`
  box-shadow: 2px 2px 2px 1px black;
  border-radius: 30px;
  width: 800px;
  padding: 10px;
  background-color: #0b212b;
  margin-bottom: 50px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  img {
    margin-left: 10px;
    width: 150px;
    height: 150px;
    border: 3px solid white;
    border-radius: 50%;
    object-fit: cover;
  }
  > div {
    margin-right: 40px;
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;

    h2 {
      margin-bottom: 10px;
      border-bottom: 1px solid white;
    }

    > p {
      color: #e5e5e5;
      margin-bottom: 10px;
    }
    span {
      font-size: medium;
      color: black;
      padding: 5px;
      background-color: #9fd356;
      border: 1px solid white;
      align-self: flex-end;
      justify-self: flex-end;
      border-radius: 5px;

      p {
        color: black;
      }
    }
  }

  div:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      padding: 10px 30px;
      border: 1px solid white;
      background: transparent;
      border-radius: 10px;
      transition: 0.5s;
    }

    span:hover {
      background-color: ${shade(0.25, '#FF7F39')};
    }
  }
`;
