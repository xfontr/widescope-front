import { lazy, Suspense, memo, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import Button from "../../components/Button/Button";
import useProjects from "../../hooks/useProjects/useProjects";
import { CTASectionStyled, HeroSectionStyled } from "./LandingPageStyled";
import { useNavigate } from "react-router-dom";
import { navRoutes } from "../../configs/routes";

const Projects = lazy(() => import("../../components/Projects/Projects"));
const SignForm = lazy(() => import("../../components/SignForm/SignForm"));

const LandingPage = memo((): JSX.Element => {
  const { getAll } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getAll(0);
    })();
  }, [getAll]);

  const projects = useAppSelector(({ projects }) =>
    projects.filter((project, index) => index < 6)
  );
  const isLogged = useAppSelector(({ user }) => user.isLogged);

  return (
    <>
      <HeroSectionStyled className="full-width">
        <div className="container">
          <h1 className="page__title page__title--landing">
            Let them know
            <span className="page__title--bold"> what you've got</span>
          </h1>

          <p className="page__title-subheading page__title-subheading--landing">
            Set your projects to a new level by sharing them with wideScope's
            glowing community of developers.
          </p>

          <Button
            renderAs="a"
            action={() => {
              navigate(navRoutes.signUp.path);
            }}
            children="Get started"
          />

          <Button
            customStyle="outline"
            renderAs="a"
            action={() => {
              navigate(navRoutes.explore.path);
            }}
            children="Explore"
          />
        </div>
      </HeroSectionStyled>

      <Suspense fallback={<p>Getting some projects...</p>}>
        <section className="langing-page__projects">
          <Projects projects={projects}></Projects>
        </section>
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <CTASectionStyled className="full-width">
          <div className="container">
            {!isLogged && (
              <div className="landing-page__log-in">
                <div className="cta-section">
                  <h2 className="page__title">
                    Start sharing your projects. <br />
                    <span className="page__title--bold"> It's free</span>
                  </h2>
                </div>

                <SignForm isLogin={true} />
              </div>
            )}

            {isLogged && (
              <div className="landing-page__create">
                <div className="cta-section">
                  <h2 className="page__title">
                    Share your projects. <br />
                    <span className="page__title--bold"> It's free</span>
                  </h2>

                  <Button
                    customStyle="outline-invert"
                    renderAs="a"
                    action={() => {
                      navigate(navRoutes.createProject.path);
                    }}
                  >
                    Post a project
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CTASectionStyled>
      </Suspense>
    </>
  );
});

export default LandingPage;
