import { useEffect, useState } from "react";
import Weather from "../Components/Weather";
import { useNavigate } from "react-router-dom";

function Home() {
  const [cityname, setCityname] = useState("");
  const [weatherList, setWeatherList] = useState(null);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCityname(e.target.value);
  };
  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("loginas");
    navigate("/");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityname
          .toLowerCase()
          .trim()}&units=metric&appid=0f9349d541a04854a5bfe3ec99306196`
      );
      let json = await res.json();
      console.log(json);

      setWeatherList(json.list);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("loginas")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between bg-light bg-gradient">
        <div className="mr-auto p-2 bd-highlight">
          <p className="font-weight-bold lead m-3">Home Page</p>
        </div>
        <div className="p-2 bd-highlight">
          <button
            type="button"
            className="btn btn-danger m-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center"
      >
        <div class="mt-5 w-25 d-flex flex-column align-items-center">
          <div class="d-flex flex-column align-items-center">
            <label htmlFor="city">
              <strong>Enter city name</strong>
            </label>
            <input
              type="text"
              class="form-control"
              name="city"
              placeholder="Enter city name"
              value={cityname}
              onChange={handleChange}
              required
            />
          </div>
          <div class="my-3 d-flex justify-content-center">
            <button class="btn btn-primary">Submit</button>
          </div>
        </div>

        <div className="row justify-content-center">
          {weatherList ? (
            weatherList.map((list, index) => {
              if (index % 7 === 0) {
                return (
                  <Weather
                    key={index}
                    date={new Date(list.dt_txt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                    desc={list.weather[0].description}
                    img={`http://openweathermap.org/img/w/${list.weather[0].icon}.png`}
                    temp={list.main.temp}
                    humid={list.main.humidity}
                    wind={list.wind.speed}
                  />
                );
              }
            })
          ) : (
            <h4>Enter appropriate city name !</h4>
          )}
        </div>
      </form>
    </>
  );
}

export default Home;
