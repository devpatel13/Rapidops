import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
  Router,
  BrowserRouter,
} from "react-router-dom";
import App from "../App";
import Weather from "../Components/Weather";
import Home from "../Pages/Home";

// Mock the navigate function from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
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

// Mock window.location properties
const { location } = window;
delete window.location;
window.location = { pathname: "/home" };

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    require("react-router-dom").useNavigate.mockReturnValue(jest.fn());

    localStorage.clear();
  });
  afterEach(() => cleanup());

  test("renders Home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/home page/i)).toBeInTheDocument(); // Adjust based on actual text in Home component
  });

  test("redirects to login page if not authenticated", () => {
    // Mock the localStorage to simulate unauthenticated state
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(null), // Simulate unauthenticated state
    };
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });

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
  });

  //   test("handles logout correctly", () => {
  //     localStorage.setItem("loginas", "test@example.com");

  //     render(
  //       <MemoryRouter initialEntries={["/home"]}>
  //         <Routes>
  //           <Route path="/" element={<div>Login Page</div>} />
  //           <Route path="/home" element={<App />} />
  //         </Routes>
  //       </MemoryRouter>
  //     );

  //     fireEvent.click(screen.getByRole("button", { name: /Logout/i }));

  //     expect(localStorage.getItem("loginas")).toBeNull();
  //     expect(screen.getByText("Login Page")).toBeInTheDocument();
  //   });

  //   test("shows error message for invalid city name", async () => {
  //     localStorage.setItem("loginas", "test@example.com");

  //     render(
  //       <MemoryRouter initialEntries={["/home"]}>
  //         <Routes>
  //           <Route path="/" element={<div>Login Page</div>} />
  //           <Route path="/home" element={<App />} />
  //         </Routes>
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
  //       target: { value: "invalid-city" },
  //     });
  //     fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

  //     await waitFor(() => {
  //       expect(screen.getByText("Enter appropriate city name !")).toBeInTheDocument();
  //     });
  //   });

  //   test("fetches and displays weather data", async () => {
  //     localStorage.setItem("loginas", "test@example.com");

  //     // Mock fetch API
  //     global.fetch = jest.fn(() =>
  //       Promise.resolve({
  //         json: () => Promise.resolve({
  //           list: [
  //             {
  //               dt_txt: "2023-05-20 12:00:00",
  //               weather: [{ description: "clear sky", icon: "01d" }],
  //               main: { temp: 25, humidity: 40 },
  //               wind: { speed: 5 },
  //             },
  //             {
  //               dt_txt: "2023-05-21 12:00:00",
  //               weather: [{ description: "cloudy", icon: "02d" }],
  //               main: { temp: 22, humidity: 45 },
  //               wind: { speed: 6 },
  //             },
  //           ],
  //         }),
  //       })
  //     );

  //     render(
  //       <MemoryRouter initialEntries={["/home"]}>
  //         <Routes>
  //           <Route path="/" element={<div>Login Page</div>} />
  //           <Route path="/home" element={<App />} />
  //         </Routes>
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText("Enter city name"), {
  //       target: { value: "valid-city" },
  //     });
  //     fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

  //     await waitFor(() => {
  //       expect(screen.getAllByTestId("weather")).toHaveLength(2);
  //     });
  //     await waitFor(() => {
  //         expect(screen.getByText("clear sky")).toBeInTheDocument();

  //     });
  //     await waitFor(() => {
  //         expect(screen.getByText("cloudy")).toBeInTheDocument();

  //       });
  //   });
});
