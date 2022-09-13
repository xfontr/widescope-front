import SearchBar from "../../components/SearchBar/SearchBar";
import Contacts from "../../components/Contacts/Contacts";
import mockContact from "../../test-utils/mocks/mockContact";

const ManageContacts = (): JSX.Element => {
  return (
    <section className="contacts">
      <h2 className="page__title">
        Meet other <span className="page__title--bold">authors</span>
      </h2>
      <SearchBar />

      <h3 className="page__subheading">Your friends</h3>
      <Contacts contacts={[mockContact]} />
    </section>
  );
};

export default ManageContacts;
