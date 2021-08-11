import styled from 'styled-components'

export const LoadingBall = styled.div`
  margin: auto;
  position: relative;
  width: 125px;
  height: 125px;
  background: #c9f364;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  animation: animate 1.5s linear infinite;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    background: transparent;
    border: 5px solid #fff;
    left: -65%;
    filter: blur(1px);
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    background: transparent;
    border: 5px solid #fff;
    right: -65%;
    filter: blur(1px);
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(225deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`
