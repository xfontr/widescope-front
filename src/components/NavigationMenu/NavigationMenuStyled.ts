import styled from "styled-components";

const NavigationStyled = styled.nav`
  position: fixed;
  right: 4%;
  z-index: 999;

  ul {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.gapSmall};
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
    padding: 8rem 4%;
    transform: translate(100%);
    transition: 0.4s;

    @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      width: 40%;
    }

    &--in {
      animation-name: slide-in;
      animation-duration: 0.5s;
      transform: translate(0);
    }

    &__links {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: auto;
    }

    &__link {
      width: fit-content;
      font-size: 2.5rem;
      cursor: pointer;
    }

    &__link::after {
      transition: 0.6s;
      content: "";
      display: block;
      width: 0%;
      opacity: 0%;
      background-color: ${({ theme }) => theme.colors.secondary};
      height: 0.1rem;
    }

    &__link:hover::after {
      opacity: 100%;
      width: 100%;
    }

    &__user-name {
      display: block;
      font-size: 1.5rem;
      line-height: 2rem;
      color: ${({ theme }) => theme.colors.secondaryBrigther};
      margin-top: ${({ theme }) => theme.spacing.paddingBig};
    }
  }

  .burger {
    &-icon {
      position: relative;
      height: 36px;
      display: flex;
      align-items: center;
      cursor: pointer;
      z-index: 9999;
    }

    &-line {
      background-color: black;
      width: 35px;
      height: 6px;
      border-radius: 3px;
      position: relative;
      transition: 0.5s;
    }

    &-line::after {
      content: "";
      position: absolute;
      bottom: 10px;
      background-color: black;
      width: 35px;
      height: 6px;
      border-radius: 3px;
      transition: 0.5s;
    }

    &-line::before {
      content: "";
      position: absolute;
      top: 10px;
      background-color: black;
      width: 35px;
      height: 6px;
      border-radius: 3px;
      transition: 0.5s;
    }

    &-line--crossed {
      height: 0px;
    }

    &-line--crossed::after {
      bottom: -2.5px;
      transform: rotate(315deg);
    }

    &-line--crossed::before {
      top: -3px;
      transform: rotate(-495deg);
    }
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
