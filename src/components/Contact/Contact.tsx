import IContact from "../../types/IContact";
import ContactStyled from "./ContactStyled";
import Button from "../Button/Button";
import { useState } from "react";
import Messages from "../Messages/Messages";

interface ContactProps {
  contact: IContact;
}

const Contact = ({ contact }: ContactProps): JSX.Element => {
  const [messagesDisplay, setMessagesDisplay] = useState(false);

  return (
    <>
      {messagesDisplay && (
        <Messages friend={contact} close={setMessagesDisplay} />
      )}
      <ContactStyled>
        <h3 className="contact__name">{contact.name}</h3>
        <Button action={() => setMessagesDisplay(true)}>Talk</Button>
      </ContactStyled>
    </>
  );
};

export default Contact;
