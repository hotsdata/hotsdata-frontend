import { useState } from "react";
import { useNavigate } from "react-router";

import StatusPanel from "../components/common/StatusPanel.jsx";
import { useRegisterMutation } from "../features/hotsdata/hotsdataApi.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    battleTag: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await register(form).unwrap();
      navigate("/replays");
    } catch (requestError) {
      setError(requestError?.message || "Registration failed.");
    }
  }

  return (
    <section className="form-page">
      <div className="panel compact">
        <h1>Create account</h1>
        <p>
          Create an account to connect your BattleTag and keep replay history
          private.
        </p>
        {error ? (
          <StatusPanel
            tone="error"
            title="Registration failed"
            message={error}
          />
        ) : null}
        <form className="stacked-form" onSubmit={handleSubmit}>
          <label>
            Display name
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
            />
          </label>
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
            BattleTag
            <input
              placeholder="Player#1234"
              value={form.battleTag}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  battleTag: event.target.value,
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
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}
