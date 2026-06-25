import { useState } from "react";
import { useNavigate } from "react-router";

import StatusPanel from "../components/common/StatusPanel.jsx";
import { useLoginMutation } from "../features/hotsdata/hotsdataApi.js";

export default function SignInPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({
    email: "demo@hotsdata.test",
    password: "replay-data",
  });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login(form).unwrap();
      navigate("/replays");
    } catch (requestError) {
      setError(
        requestError?.message || "Could not sign in with those credentials.",
      );
    }
  }

  return (
    <section className="form-page">
      <div className="panel compact">
        <h1>Sign in</h1>
        <p>
          Use your HotsData account to review private replay and profile data.
        </p>
        {error ? (
          <StatusPanel tone="error" title="Sign in failed" message={error} />
        ) : null}
        <form className="stacked-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
            />
          </label>
          <button className="button primary" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
