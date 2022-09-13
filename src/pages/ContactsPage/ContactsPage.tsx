import SearchBar from "../../components/SearchBar/SearchBar";

const ManageContacts = (): JSX.Element => {
  return (
    <section className="contacts">
      <h2 className="page__title">
        Meet other <span className="page__title--bold">authors</span>
      </h2>
      <SearchBar />
    </section>
  );
};

export default ManageContacts;
