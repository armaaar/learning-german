import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "solid-testing-library";
import { NavList, SELECTED_ITEM_TEST_ID } from "./NavList";

describe("NavList", () => {
  const testItems = ["Item 1", "Item 2"];

  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(() => <NavList list={testItems} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders the correct item names", () => {
    render(() => <NavList list={testItems} />);
    testItems.forEach((item) => {
      const itemElement = screen.getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });

  it("Select correct item", () => {
    render(() => <NavList list={testItems} selected={testItems[1]} />);
    const selectedItem = screen.getByTestId(SELECTED_ITEM_TEST_ID);
    expect(selectedItem).toHaveTextContent(testItems[1]);
  });

  it("call `onSelect` method when an item clicked", () => {
    const mockCallback = jest.fn();
    render(() => <NavList list={testItems} onSelect={mockCallback} />);
    testItems.forEach((item, index) => {
      const itemElement = screen.getByText(item);
      userEvent.click(itemElement);
      expect(mockCallback).toBeCalledTimes(index + 1);
      expect(mockCallback).toBeCalledWith(item);
    });
  });

  it("Cannot reselect an already selected item", () => {
    const mockCallback = jest.fn();
    render(() => (
      <NavList
        list={testItems}
        selected={testItems[0]}
        onSelect={mockCallback}
      />
    ));
    const selectedItem = screen.getByTestId(SELECTED_ITEM_TEST_ID);
    userEvent.click(selectedItem);
    expect(mockCallback).not.toBeCalled();
  });
});
