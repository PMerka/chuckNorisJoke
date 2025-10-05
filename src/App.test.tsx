import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { renderWithTestingQueryClient } from "./test/testingQueryClient";

describe("App main features testing", () => {
  it("renders random joke on the init load", async () => {
    renderWithTestingQueryClient(<App />);
    const joke = await screen.findByText(/Funny random joke/i);
    expect(joke).toBeInTheDocument();
  });

  it("select category to dev and get random dev joke", async () => {
    renderWithTestingQueryClient(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByLabelText(/Category/i));

    // select dev option from category list
    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("dev");
    fireEvent.click(option);

    // Click on search button
    const button = await screen.findByRole("button", { name: /Get Joke About dev/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Funny joke about dev/i)).toBeInTheDocument();
    });
  });

  it("gets random joke based on search text", async () => {
    renderWithTestingQueryClient(<App />);

    // write st to input "abc"
    const input = screen.getByLabelText(/search joke/i);
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue("abc");

    vi.spyOn(Math, "random").mockReturnValueOnce(0.1);

    // Click on search button
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/1st funny joke with abc/i)).toBeInTheDocument();
    });

    vi.spyOn(Math, "random").mockReturnValueOnce(0.9);

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/2nd funny joke with abc/i)).toBeInTheDocument();
    });
  });
});
