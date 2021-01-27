import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpSvg from '../../assets/sign-up.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  .is_therapist {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #232129;
    height: 50px;
    border-radius: 10px;
    input {
      margin-left: 10px;
    }
  }
`;

const appearFromRight = keyframes`
from {
  opacity: 0;
  transform: translateX(50px)

}to {
  opacity: 1;
  transform: translateX(0)

}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff7f39;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#FF7F39')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpSvg}) no-repeat center;
`;
