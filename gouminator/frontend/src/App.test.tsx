import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

vi.mock("axios");

describe("App", () => {
  test("renders the form correctly", () => {
    render(<App />);

    expect(screen.getByLabelText("Goumin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("handles form submission and displays goumin amount", async () => {
    const mockResponse = {
      volume: 123,
      radius: 5,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    render(<App />);

    const input = screen.getByLabelText("Goumin");
    fireEvent.change(input, { target: { value: "5" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(
        screen.getByText("Your goumin amount is 123 cm3")
      ).toBeInTheDocument();
    });
  });
});
