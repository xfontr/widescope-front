import IContact from "../../types/IContact";
import ContactStyled from "./ContactStyled";

interface ContactProps {
  contact: IContact;
}

const Contact = ({ contact }: ContactProps): JSX.Element => (
  <ContactStyled>
    <h3 className="contact__name">{contact.name}</h3>
  </ContactStyled>
);

export default Contact;
