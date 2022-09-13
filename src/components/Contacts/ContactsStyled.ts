import styled from "styled-components";

const ContactsStyled = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & .contact {
    width: 33%;
  }
`;

export default ContactsStyled;
