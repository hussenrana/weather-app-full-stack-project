const weatherModel = new WeatherModel();
const renderer = new Renderer();
const cityInput = $("#new-city");

weatherModel.getCities().then((citiesWeatherData) => {
  renderer.renderCities(citiesWeatherData);
});

const displayCityWeather = function () {
  const cityName = cityInput.val();
  weatherModel.getCity(cityName).then((cityWeatherData) => {
    renderer.renderCity(cityWeatherData);
  });
};

$("#show-city").on("click", displayCityWeather);

const removeCityFromDB = function () {
  const cityName = $(this).siblings(".name").text();
  weatherModel.deleteCityFromDB(cityName);
  $(this).closest(".city-weather").remove();
};

$("#cities").on("click", ".remove-city", removeCityFromDB);

const addCityToDB = function () {
  const cityName = $(this).siblings(".name").text();
  const cityTemp = parseFloat(
    $(this).siblings(".temperature").find(".temp-number").text()
  );
  const cityDescription = $(this).siblings(".condition").text();
  const cityIcon = $(this).siblings("img").attr("src");
  const cityWeatherData = {
    name: cityName,
    temperature: cityTemp,
    condition: cityDescription,
    conditionPic: cityIcon,
  };
  weatherModel.addCityToDB(cityWeatherData);

  $(this).text($(this).text().replace("+", "-"));
  $(this).addClass("remove-city").removeClass("add-city");
};

$("#cities").on("click", ".add-city", addCityToDB);
