import { useState } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { FlagIcon } from 'react-flag-kit';

import menu1Image from '../assets/menu1.png';
import menu2Image from '../assets/menu2.png';
import menu3Image from '../assets/menu3.png';
import menu4Image from '../assets/menu4.png';
import menu5Image from '../assets/menu5.png';
import menu6Image from '../assets/menu6.png';

const FilterModal = ({ isVisible, toggleFilterModal, setScreenData }) => {
  const [menuSelection, setMenuSelection] = useState([]);
  const [areaSelection, setAreaSelection] = useState([]);
  const [languageSelection, setLanguageSelection] = useState([]);
  const [weatherSelection, setWeatherSelection] = useState([]);
  const [temperatureRange, setTemperatureRange] = useState({ from: 0, to: 0 });
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const menuOptions = [
    { label: "Menü 1", value: "menu1", image: menu1Image },
    { label: "Menü 2", value: "menu2", image: menu2Image },
    { label: "Menü 3", value: "menu3", image: menu3Image },
    { label: "Menü 4", value: "menu4", image: menu4Image },
    { label: "Menü 5", value: "menu5", image: menu5Image },
    { label: "Menü 6", value: "menu6", image: menu6Image },
  ];

  const areaOptions = [
    { label: "KVV", value: "big", icon: <FaMapMarkerAlt /> },
    { label: "Außerhalb KVV", value: "middle", icon: <FaMapMarkerAlt /> },
  ];

  const languageOptions = [
    { label: "Deutsch", value: "DE", icon: <FlagIcon code="DE" size={24} /> },
    { label: "Englisch", value: "EN", icon: <FlagIcon code="GB" size={24} /> },
  ];

  const weatherOptions = [
    { label: "Sonne", value: "sunny", icon: <FaSun /> },
    { label: "Wolken", value: "cloudy", icon: <FaCloud /> },
    { label: "Regen", value: "rainy", icon: <FaCloudRain /> },
    { label: "Schnee", value: "snowy", icon: <FaSnowflake /> },
  ];

  const handleMenuSelection = (value) => {
    setMenuSelection(
      menuSelection.includes(value)
        ? menuSelection.filter((item) => item !== value)
        : [...menuSelection, value]
    );
  };

  const handleAreaSelection = (value) => {
    setAreaSelection(
      areaSelection.includes(value)
        ? areaSelection.filter((item) => item !== value)
        : [...areaSelection, value]
    );
  };

  const handleLanguageSelection = (value) => {
    setLanguageSelection(
      languageSelection.includes(value)
        ? languageSelection.filter((item) => item !== value)
        : [...languageSelection, value]
    );
  };

  const handleWeatherSelection = (value) => {
    setWeatherSelection(
      weatherSelection.includes(value)
        ? weatherSelection.filter((item) => item !== value)
        : [...weatherSelection, value]
    );
  };

  const handleTemperatureChange = (event) => {
    const { value, name } = event.target;
    setTemperatureRange((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleDateChange = (event) => {
    const { value, name } = event.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveFilters = () => {
    const filters = {
      menu: menuSelection,
      area: areaSelection,
      language: languageSelection,
      weather: weatherSelection,
      temperature: [temperatureRange.from, temperatureRange.to],
      date: dateRange,
    };

    fetch('http://localhost:8081/filtered-screenshots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => {
        setScreenData(data);
        toggleFilterModal();
      })
      .catch((error) => console.error(error));
  };

  return isVisible ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-screen-md max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Filteroptionen</h2>
          <button onClick={toggleFilterModal}>
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="font-bold mb-2">Menü</h3>
            <div className="flex flex-wrap gap-2">
              {menuOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer border p-2 rounded-lg ${
                    menuSelection.includes(option.value) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleMenuSelection(option.value)}
                >
                  <img src={option.image} alt={option.label} className="w-8 h-8" />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="font-bold mb-2">Gebiet</h3>
            <div className="flex flex-wrap gap-2">
              {areaOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer border p-2 rounded-lg ${
                    areaSelection.includes(option.value) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleAreaSelection(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="font-bold mb-2">Sprache</h3>
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer border p-2 rounded-lg ${
                    languageSelection.includes(option.value) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleLanguageSelection(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="font-bold mb-2">Wetter</h3>
            <div className="flex flex-wrap gap-2">
              {weatherOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer border p-2 rounded-lg ${
                    weatherSelection.includes(option.value) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handleWeatherSelection(option.value)}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="w-full md:w-1/2">
            <h3 className="font-bold mb-2">Temperaturbereich (°C)</h3>
            <div className="flex gap-2 items-center">
              <label>
                Von:
                <input
                  type="number"
                  name="from"
                  value={temperatureRange.from}
                  onChange={handleTemperatureChange}
                  className="border p-1 rounded-lg ml-2"
                />
              </label>
              <label>
                Bis:
                <input
                  type="number"
                  name="to"
                  value={temperatureRange.to}
                  onChange={handleTemperatureChange}
                  className="border p-1 rounded-lg ml-2"
                />
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="font-bold mb-2">Datumsbereich</h3>
            <div className="flex gap-2 items-center">
              <label>
                Von:
                <input
                  type="date"
                  name="from"
                  value={dateRange.from}
                  onChange={handleDateChange}
                  className="border p-1 rounded-lg ml-2"
                />
              </label>
              <label>
                Bis:
                <input
                  type="date"
                  name="to"
                  value={dateRange.to}
                  onChange={handleDateChange}
                  className="border p-1 rounded-lg ml-2"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSaveFilters}
          >
            Filter anwenden
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default FilterModal;
