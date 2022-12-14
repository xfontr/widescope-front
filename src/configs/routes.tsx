import { Navigate } from "react-router-dom";
import {
  ContactsPage,
  ExplorePage,
  LandingPage,
  LogInPage,
  ManageProjectPage,
  NotFoundPage,
  ProjectDetailsPage,
  SignUpPage,
  UserProjectsPage,
} from "../pages";

export interface NavRoute {
  path: string;
  display: "never" | "always" | "notLogged" | "logged";
  name: string;
  skip?: boolean;
  action?: (action: () => void) => void;
  render?: () => JSX.Element;
}

export const navRoutes: Record<string, NavRoute> = {
  notFound: {
    path: "*",
    display: "never",
    name: "Not found",
    render: () => <NotFoundPage />,
  },

  root: {
    path: "/",
    display: "never",
    name: "Home",
    render: () => <Navigate to={navRoutes.home.path} />,
  },

  home: {
    path: "/home",
    display: "always",
    name: "Home",
    render: () => <LandingPage />,
  },

  explore: {
    path: "/explore",
    display: "always",
    name: "Explore",
    render: () => <ExplorePage />,
  },

  signUp: {
    path: "/sign-up",
    display: "notLogged",
    name: "Sign up",
    render: () => <SignUpPage />,
  },

  logIn: {
    path: "/log-in",
    display: "notLogged",
    name: "Log in",
    render: () => <LogInPage />,
  },

  logOut: {
    path: "",
    display: "logged",
    name: "Log out",
    action: (action) => action(),
  },

  personalProjects: {
    path: "/personal-projects",
    display: "logged",
    name: "Your projects",
    render: () => <UserProjectsPage />,
  },

  createProject: {
    path: "/project/new",
    display: "logged",
    skip: true,
    name: "Post a project",
    render: () => <ManageProjectPage isCreate={true} />,
  },

  updateProject: {
    path: "/projects/update/:projectId",
    display: "never",
    name: "Update project",
    render: () => <ManageProjectPage isCreate={false} />,
  },

  projectDetails: {
    path: "/project/:projectId",
    display: "never",
    name: "Project details",
    render: () => <ProjectDetailsPage />,
  },

  contactsPage: {
    path: "/contacts",
    display: "logged",
    name: "Contacts",
    render: () => <ContactsPage />,
  },
};
