import IContact from "../../types/IContact";

interface ContactProps {
  contact: IContact;
}

const Contact = ({ contact }: ContactProps): JSX.Element => (
  <article>
    <h3 className="contact__name">{contact.name}</h3>
  </article>
);

export default Contact;
