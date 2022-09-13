import IContact from "../../types/IContact";
import Contact from "../Contact/Contact";
import ContactsStyled from "./ContactsStyled";

interface ContactsProps {
  contacts: IContact[];
}

const Contacts = ({ contacts }: ContactsProps): JSX.Element => (
  <ContactsStyled>
    {contacts.map((contact) => (
      <li className="contact" key={contact.id}>
        <Contact contact={contact} />
      </li>
    ))}
  </ContactsStyled>
);

export default Contacts;
