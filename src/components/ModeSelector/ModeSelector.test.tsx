import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "solid-testing-library";
import { SELECTED_ITEM_TEST_ID } from "../NavList/NavList";
import { ModeSelector } from "./ModeSelector";

describe("ModeSelector", () => {
  const testModes = ["Mode 1", "Mode 2"];
  const Component = () => <ModeSelector modes={testModes} />;

  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(Component);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders the correct item names", () => {
    render(Component);
    testModes.forEach((item) => {
      const itemElement = screen.getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });

  it("First mode is selected by default", () => {
    render(Component);
    const selectedItem = screen.getByTestId(SELECTED_ITEM_TEST_ID);
    expect(selectedItem).toHaveTextContent(testModes[0]);
  });

  it("Change mode by clicking the new mode", () => {
    render(Component);
    // click mode
    const itemElement = screen.getByText(testModes[1]);
    userEvent.click(itemElement);
    // get clicked mode
    const selectedItem = screen.getByTestId(SELECTED_ITEM_TEST_ID);
    expect(itemElement).toBe(selectedItem);
  });
});
