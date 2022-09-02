import Projects from "../../components/Projects/Projects";
import mockProject from "../../test-utils/mocks/mockProject";

const ExplorePage = (): JSX.Element => (
  <>
    <h2 className="page__title">
      These are the <span className="page__title--bold">latest projects</span>
    </h2>

    <Projects projects={[mockProject, mockProject]} />
  </>
);

export default ExplorePage;
