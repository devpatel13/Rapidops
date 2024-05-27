import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Pages/Home";

// Mock window.location properties
delete window.location;
window.location = { pathname: "/home" };

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the Weather component to test rendering logic
jest.mock("../Components/Weather", () => (props) => (
  <div data-testid="weather">
    <p>{props.date}</p>
    <p>{props.desc}</p>
    <img src={props.img} alt="weather icon" />
    <p>{props.temp}</p>
    <p>{props.humid}</p>
    <p>{props.wind}</p>
  </div>
));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
describe("App Component", () => {
  beforeEach(() => {
    require("react-router-dom").useNavigate.mockReturnValue(jest.fn());
    localStorage.clear();

    jest.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  test("renders Home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/home page/i)).toBeInTheDocument(); // Adjust based on actual text in Home component
    window.localStorage.clear();
  });

  test("redirects to login page if not authenticated", () => {
    // Mock the localStorage to simulate unauthenticated state
    localStorage.getItem.mockReturnValue(null); // Simulate unauthenticated state

    // Mock the navigate function
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    // Render the component
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the navigate function has been called
    expect(require("react-router-dom").useNavigate).toHaveBeenCalled();
    expect(require("react-router-dom").useNavigate().mock.calls[0][0]).toBe(
      "/"
    );
    window.localStorage.clear();
  });

  test("shows error message for invalid city name", async () => {
    localStorage.setItem("loginas", "test@example.com");

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "invalid-city" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Enter appropriate city name !")
      ).toBeInTheDocument();
    });
    window.localStorage.clear();
  });

  test("fetches and displays weather data", async () => {
    localStorage.setItem("loginas", "test@example.com");

    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            list: [
              {
                dt_txt: "2023-05-20 12:00:00",
                weather: [{ description: "clear sky", icon: "01d" }],
                main: { temp: 25, humidity: 40 },
                wind: { speed: 5 },
              },
            ],
          }),
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
      target: { value: "valid-city" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Wait for both weather components to appear
    await waitFor(() => {
      expect(screen.getAllByTestId("weather")).toHaveLength(1);
    });

    // Check for specific weather descriptions
    expect(screen.getByText("clear sky")).toBeInTheDocument();
  });
});
