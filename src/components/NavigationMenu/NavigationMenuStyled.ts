import styled from "styled-components";

const NavigationStyled = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.gapSmall};
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

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 40%;
    }
  }

  .navigation--in {
    animation-name: slide-in;
    animation-duration: 0.5s;
    transform: translate(0);
  }

  .burger-icon {
    position: relative;
    height: 36px;
    display: flex;
    align-items: center;
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

  .modal-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: flex-end;

    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
  }

  .modal-close-area {
    width: 30%;
    height: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 60%;
    }
  }

  .navigation__links {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: auto;
  }

  .navigation__link {
    width: fit-content;
    font-size: 2.5rem;
    cursor: pointer;
  }

  .navigation__link::after {
    transition: 0.6s;
    content: "";
    display: block;
    width: 0%;
    opacity: 0%;
    background-color: ${(props) => props.theme.colors.secondary};
    height: 0.1rem;
  }

  .navigation__link:hover::after {
    opacity: 100%;
    width: 100%;
  }

  @keyframes slide-in {
    from {
      transform: translate(100%);
    }
    to {
      transform: translate(0);
    }
  }
`;

export default NavigationStyled;
