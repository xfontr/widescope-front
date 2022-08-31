import styled from "styled-components";

const NavigationStyled = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  button {
    width: 100%;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    width: 93%;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 70px;
    padding-right: 10px;
  }

  .navigation {
    background-color: white;
    height: 100%;
    width: 70%;
    text-align: right;
    padding: 8rem 7%;
    transform: translate(100%);
    transition: 0.4s;
  }

  .navigation--in {
    animation-name: slide-in;
    animation-duration: 0.5s;
    transform: translate(0);
  }

  .burger-icon {
    position: relative;
    cursor: pointer;
    z-index: 9999;
  }

  .burger-line {
    background-color: black;
    width: 35px;
    height: 6px;
    border-radius: 3px;
    position: relative;
    transition: 0.5s;
  }

  .burger-line::after {
    content: "";
    position: absolute;
    bottom: 10px;
    background-color: black;
    width: 35px;
    height: 6px;
    border-radius: 3px;
    transition: 0.5s;
  }

  .burger-line::before {
    content: "";
    position: absolute;
    top: 10px;
    background-color: black;
    width: 35px;
    height: 6px;
    border-radius: 3px;
    transition: 0.5s;
  }

  .burger-line--crossed {
    height: 0px;
  }

  .burger-line--crossed::after {
    bottom: -2.5px;
    transform: rotate(315deg);
  }

  .burger-line--crossed::before {
    top: -3px;
    transform: rotate(-495deg);
  }
`;

export default NavigationStyled;
