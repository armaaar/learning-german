import { cleanup, fireEvent, render, screen } from "solid-testing-library";
import { NavList } from "./NavList";

describe("NavList", () => {
  const testItems = ["Item 1", "Item 2"];
  const mockCallback = jest.fn();
  const Component = () => <NavList list={testItems} onSelect={mockCallback} />;

  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(Component);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders the correct item names", () => {
    render(Component);
    testItems.forEach((item) => {
      const itemElement = screen.getByText(item);
      expect(itemElement).toBeInTheDocument();
    });
  });

  it("call `onSelect` method when an item clicked", () => {
    render(Component);
    testItems.forEach((item, index) => {
      const itemElement = screen.getByText(item);
      fireEvent.click(itemElement);
      expect(mockCallback).toBeCalledTimes(index + 1);
      expect(mockCallback).toBeCalledWith(item);
    });
  });
});
