import { lazy } from "react";

const ExplorePage = lazy(() => import("./ExplorePage/ExplorePage"));
const LogInPage = lazy(() => import("./LogInPage/LogInPage"));
const ManageProjectPage = lazy(
  () => import("./ManageProjectPage/ManageProjectPage")
);
const NotFoundPage = lazy(() => import("./NotFoundPage/NotFoundPage"));
const ProjectDetailsPage = lazy(
  () => import("./ProjectDetailsPage/ProjectDetailsPage")
);
const SignUpPage = lazy(() => import("./SignUpPage/SignUpPage"));

const UserProjectsPage = lazy(
  () => import("./UserProjectsPage/UserProjectsPage")
);

const ContactsPage = lazy(() => import("./ContactsPage/ContactsPage"));

const LandingPage = lazy(() => import("./LandingPage/LandingPage"));

export {
  ExplorePage,
  LogInPage,
  ManageProjectPage,
  NotFoundPage,
  ProjectDetailsPage,
  SignUpPage,
  UserProjectsPage,
  ContactsPage,
  LandingPage,
};
