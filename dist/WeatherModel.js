class WeatherModel {
  constructor() {
    this.citiesWeatherData = [];
  }

  getCities() {
    return $.get("/weather").then((citiesWeatherDataResult) => {
      this.citiesWeatherData = citiesWeatherDataResult;
      return this.citiesWeatherData;
    });
  }

  getCity(cityName) {
    if (cityName !== "") {
      return $.get(`weather/${cityName}`);
    }
  }

  addCityToDB(cityWeatherData) {
    $.post("weather/", cityWeatherData).then((cityWeatherDataResult) => {
      return cityWeatherData;
    });
  }
  deleteCityFromDB(cityName) {
    $.ajax({
      url: `weather/${cityName}`,
      type: "DELETE",
      success: function (result) {
        // Do something with the result
      },
    });
    return this.citiesWeatherData;
  }
}
