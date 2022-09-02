import Projects from "../../components/Projects/Projects";
import mockProject from "../../test-utils/mocks/mockProject";

const ExplorePage = (): JSX.Element => (
  <>
    <h2>
      These are the <span className={"marked"}>latest projects</span>
    </h2>

    <Projects projects={[mockProject, mockProject]} />
  </>
);

export default ExplorePage;
