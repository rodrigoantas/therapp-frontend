import styled from 'styled-components';
import { shade } from 'polished';

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;

  h2 {
    color: #ff7f39;
  }

  button {
    margin-top: 50px;
    padding: 15px;

    border: none;
    width: 300px;
    align-self: center;
    background: #ff7f39;
    transition: 0.5s;
    border-radius: 3px;
    &:hover {
      background: ${shade(0.2, '#FF7F39')};
    }
  }
`;
