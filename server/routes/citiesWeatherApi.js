const express = require("express");
const axios = require("axios");
const router = express.Router();
const City = require("../model/City");
const API_KEY = "24c0851fe09ae96eaf8ca388068f9089";

const filteringWeatherApiData = function (weatherApiData) {
  const iconName = weatherApiData.weather[0].icon;
  const filteringWeatherData = {
    name: weatherApiData.name,
    temperature: weatherApiData.main.temp,
    condition: weatherApiData.weather[0].description,
    conditionPic: `http://openweathermap.org/img/wn/${iconName}.png`,
  };
  return filteringWeatherData;
};

router.get("/weather", function (req, res) {
  City.find({}).then(function (cities) {
    res.send(cities);
  });
});

router.get("/weather/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=${API_KEY}`
    )
    .then((result) => {
      const filteringWeatherData = filteringWeatherApiData(result.data);
      res.send(filteringWeatherData);
    });
});

router.post("/weather", function (req, res) {
  const city = new City(req.body);
  city.save().then(function () {
    res.status(201).send();
  });
});

router.delete("/weather/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  City.deleteOne({ name: cityName }).then(function (city) {
    res.status(204).send();
  });
});

module.exports = router;
