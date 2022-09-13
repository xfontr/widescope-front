import SearchBar from "../../components/SearchBar/SearchBar";
import Contacts from "../../components/Contacts/Contacts";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser/useUser";
import { useAppSelector } from "../../app/hooks";
import Messages from "../../components/Messages/Messages";

const ManageContacts = (): JSX.Element => {
  const { loadFriends } = useUser();

  useEffect(() => {
    (async () => {
      await loadFriends();
    })();
  }, [loadFriends]);

  const { friends } = useAppSelector(({ userData }) => userData);

  return (
    <>
      <section className="contacts">
        <h2 className="page__title">
          Meet other <span className="page__title--bold">authors</span>
        </h2>
        <SearchBar />

        <h3 className="page__subheading">Your friends</h3>
        <Contacts contacts={friends} />
      </section>
    </>
  );
};

export default ManageContacts;
