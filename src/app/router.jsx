import { createHashRouter, Navigate } from "react-router";

import Layout from "../components/common/Layout.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ChangelogPage from "../pages/ChangelogPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import PlayerComparePage from "../pages/PlayerComparePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ReplaysPage from "../pages/ReplaysPage.jsx";
import ReplayDetailPage from "../pages/ReplayDetailPage.jsx";
import SignInPage from "../pages/SignInPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import UploadPage from "../pages/UploadPage.jsx";
import UserSettingsPage from "../pages/UserSettingsPage.jsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "changelog", element: <ChangelogPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "players/compare", element: <PlayerComparePage /> },
      {
        path: "replays",
        element: (
          <ProtectedRoute>
            <ReplaysPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "replays/:replayId",
        element: <ReplayDetailPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "profile/:toonhandle", element: <ProfilePage /> },
      {
        path: "profile/heroes",
        element: <Navigate to="/profile" replace />,
      },
      {
        path: "profile/heroes/:hero",
        element: <Navigate to="/profile" replace />,
      },
      {
        path: "user-settings",
        element: (
          <ProtectedRoute>
            <UserSettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
