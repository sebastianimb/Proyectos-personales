import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { Button } from "../components/Button";
import getFact from "../services/facts";

const mockGetFact = vi.hoisted(() => vi.fn());

vi.mock("../services/facts", () => {
  return {
    default: mockGetFact,
  };
});

beforeEach(() => {
  mockGetFact.mockResolvedValue("Cats are awesome!");
});

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App component", () => {
  it("renders headline", async () => {
    render(<App />);
    expect(
      screen.getByText("Random Cat Image by a Random Fact")
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    const headings = screen.getAllByRole("heading");
    expect(headings[0]).toHaveTextContent("Random Cat Image by a Random Fact");
    expect(headings[0]).toBeInTheDocument();
    expect(
      screen.queryByText("Hola soy un texto que no existe")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hola soy un texto que no existe")).toBeNull();
    // Esperamos a que se cargue el hecho para evitar el warning de "act"
    await screen.findByText(/Fact received:/);
  });

  it("renders fact", async () => {
    render(<App />);
    expect(await screen.findByText(/Fact received:/)).toBeInTheDocument();
  });

  it("learning waitFor", async () => {
    render(<App />);
    waitFor(() => {
      expect(screen.getByText(/Fact received:/)).toBeInTheDocument();
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

  it("call the search image after receiving a fact", async () => {
    render(<App />);
    const fact = await screen.findByText(/Fact received:/);
    expect(fact).toBeInTheDocument();
    const url =
      "https://cataas.com/cat/m0O3lbu9KDJK5ful/says/Female%20cats%20tend?position=center&font=Impact&fontSize=50&fontColor=%23fff&fontBackground=none";
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ url: url }),
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(url);
    });
  });

  it("handles fetch failure", async () => {
    const fetchMock = vi
      .fn()
      .mockImplementation(() => Promise.reject("Network error"));

    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    const responseFactService = await getFact();
    expect(responseFactService).toBe("Cats are awesome!");
    const fact = await screen.findByText(/Fact received:/);
    expect(fact).toBeInTheDocument();
    expect(fact).not.toBeNull();

    waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(screen.getByText(/Loading cat image.../)).toBeInTheDocument();
    });
  });
});
