import ManageContactsStyled from "./ManageContactsStyled";
import SearchBar from "../SearchBar/SearchBar";

interface ManageContactsProps {
  visibility: boolean;
}

const ManageContacts = ({ visibility }: ManageContactsProps) => {
  return (
    <>
      {visibility && (
        <ManageContactsStyled>
          <section className="contacts">
            <h2 className="contacts__title page__title">Your contacts</h2>
            <SearchBar />
          </section>
        </ManageContactsStyled>
      )}
      {!visibility && <></>}
    </>
  );
};

export default ManageContacts;
