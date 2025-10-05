import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import CategorySelect from "./CategorySelect";
import { renderWithTestingQueryClient } from "src/test/testingQueryClient";
import { testingServer } from "src/test/mocks/server";
import { http, HttpResponse } from "msw";
import apiRoutes, { VITE_API_URL } from "src/constants/apiRoutes";

describe("CategorySelect tests", () => {
  it("Happy path. Shows categories, allows selection and submit", async () => {
    const setSearchCategory = vi.fn();
    renderWithTestingQueryClient(<CategorySelect setSearchCategory={setSearchCategory} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByLabelText(/Category/i));

    // select dev option
    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("dev");
    fireEvent.click(option);

    // fire select "setSearchCategory"
    const button = await screen.findByRole("button", { name: /Get Joke About dev/i });
    fireEvent.click(button);

    expect(setSearchCategory).toHaveBeenCalledWith("dev");
  });

  it("shows init loading state button and check disabled button", () => {
    renderWithTestingQueryClient(<CategorySelect setSearchCategory={() => {}} />);

    // InputLabel by měl říkat "Loading..."
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Select by měl být disabled
    expect(screen.getByText(/Please select category/i)).toBeInTheDocument();
  });

  it("shows error state when API fails", async () => {
    // overwrite response to error
    testingServer.use(
      http.get(`${VITE_API_URL}${apiRoutes.categories}`, () => {
        return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
      })
    );

    renderWithTestingQueryClient(<CategorySelect setSearchCategory={() => {}} />);

    // wait for error
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});
