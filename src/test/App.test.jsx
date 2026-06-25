import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "../app/App.jsx";

describe("modern app shell", () => {
  it("renders the HotsData home route", async () => {
    window.location.hash = "#/";
    render(<App />);

    expect(
      await screen.findByRole("heading", { name: /hotsdata beta/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /upload replay/i }),
    ).toBeInTheDocument();
  });
});
