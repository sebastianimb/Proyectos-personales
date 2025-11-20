import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { Button } from "../components/Button";
//import getFact from "../services/facts";

/* const mockGetFact = vi.hoisted(() => vi.fn() as ReturnType<typeof vi.fn>);

vi.mock("../services/facts", () => {
  return {
    default: mockGetFact,
  };
}); */

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App component", () => {
  it("renders headline", () => {
    render(<App />);
    expect(
      screen.getByText("Random Cat Image by a Random Fact")
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Random Cat Image by a Random Fact"
    );
    expect(
      screen.queryByText("Hola soy un texto que no existe")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hola soy un texto que no existe")).toBeNull();
  });

  /* it("renders fact", async () => {
    render(<App />);
    mockGetFact.mockResolvedValueOnce("Cats are great!");
    const fn = await getFact();
    console.log(fn);
    //expect(await screen.findByText(/Hecho recibido:/)).toBeInTheDocument();
  }); */

  it("learning waitFor", async () => {
    render(<App />);
    waitFor(() => {
      expect(screen.getByText(/Hecho recibido:/)).toBeInTheDocument();
    });
  });

  it("call the onClick function when button is clicked", async () => {
    const refreshFact = vi.fn();
    render(<Button OnClick={refreshFact} />);
    await fireEvent.click(screen.getByRole("button"));
    expect(refreshFact).toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button"));
    expect(refreshFact).toHaveBeenCalledTimes(2);
  });

  /* it("learning fireEvent", async () => {
        render(<App />);
        const button = await screen.findByRole("button", { name: "Search Fact" });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        });
    */
});
