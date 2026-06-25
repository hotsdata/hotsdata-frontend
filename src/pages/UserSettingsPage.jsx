import { useEffect, useState } from "react";

import StatusPanel from "../components/common/StatusPanel.jsx";
import {
  useChangePasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../features/hotsdata/hotsdataApi.js";

export default function UserSettingsPage() {
  const { data: user } = useGetUserQuery();
  const [updateUser, updateState] = useUpdateUserMutation();
  const [changePassword, passwordState] = useChangePasswordMutation();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    battleTag: "",
  });
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        battleTag: user.battleTag || "",
      });
    }
  }, [user]);

  async function handleProfileSubmit(event) {
    event.preventDefault();
    await updateUser(profile);
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    await changePassword({ email: profile.email, newPassword });
    setNewPassword("");
  }

  return (
    <section className="content-section settings-grid">
      <div className="panel">
        <h1>User settings</h1>
        {updateState.isSuccess ? (
          <StatusPanel
            tone="success"
            title="Profile saved"
            message="Your profile settings were updated."
          />
        ) : null}
        <form className="stacked-form" onSubmit={handleProfileSubmit}>
          <label>
            Display name
            <input
              value={profile.name}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={profile.email}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
            />
          </label>
          <label>
            BattleTag
            <input
              value={profile.battleTag}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  battleTag: event.target.value,
                }))
              }
            />
          </label>
          <button
            className="button primary"
            type="submit"
            disabled={updateState.isLoading}
          >
            {updateState.isLoading ? "Saving..." : "Save profile"}
          </button>
        </form>
      </div>

      <div className="panel">
        <h2>Password</h2>
        {passwordState.isSuccess ? (
          <StatusPanel
            tone="success"
            title="Password updated"
            message="Use the new password next time you sign in."
          />
        ) : null}
        <form className="stacked-form" onSubmit={handlePasswordSubmit}>
          <label>
            New password
            <input
              type="password"
              required
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </label>
          <button
            className="button secondary"
            type="submit"
            disabled={passwordState.isLoading}
          >
            {passwordState.isLoading ? "Updating..." : "Change password"}
          </button>
        </form>
      </div>
    </section>
  );
}
