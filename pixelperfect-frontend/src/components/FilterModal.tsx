import { useState } from "react";
import { FaCog, FaMapMarkerAlt, FaLanguage, FaSun, FaCloud, FaCloudRain, FaSnowflake, FaTimes } from 'react-icons/fa';
import { FlagIcon } from 'react-flag-kit';

import menu1Image from '../assets/menu1.png';
import menu2Image from '../assets/menu2.png';
import menu3Image from '../assets/menu3.png';
import menu4Image from '../assets/menu4.png';
import menu5Image from '../assets/menu5.png';
import menu6Image from '../assets/menu6.png';

const FilterModal = ({ isVisible, toggleFilterModal }) => {
  const [menuSelection, setMenuSelection] = useState([]);
  const [areaSelection, setAreaSelection] = useState([]);
  const [languageSelection, setLanguageSelection] = useState([]);
  const [weatherSelection, setWeatherSelection] = useState([]);
  const [temperatureRange, setTemperatureRange] = useState([0, 30]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const handleCheckboxChange = (selection, setSelection, value) => {
    setSelection(selection.includes(value) ? selection.filter(v => v !== value) : [...selection, value]);
  };

  const handleSaveFilters = async () => {
    const filters = {
      menu: menuSelection,
      area: areaSelection,
      language: languageSelection,
      weather: weatherSelection,
      temperature: temperatureRange,
      date: dateRange,
    };
    
    try {
      const response = await fetch('http://localhost:8081/filtered-screenshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      const data = await response.json();
      console.log('Filtered Data:', data);
      // weiterverarbeiten oder an eine andere Komponente weitergeben
    } catch (error) {
      console.error('Error fetching filtered screenshots:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80%] overflow-y-auto relative border border-gray-700 custom-scrollbar">
        <button
          onClick={toggleFilterModal}
          className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 border border-gray-600"
        >
          <FaTimes size={20} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <h3 className="flex items-center">
              <span style={{ marginRight: '8px' }}>
                <FaCog size={20} />
              </span>
              Menüpunkte
            </h3>
            <div className="flex flex-wrap gap-4">
              {[menu1Image, menu2Image, menu3Image, menu4Image, menu5Image, menu6Image].map((img, index) => (
                <div key={index} className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    name="menu"
                    value={`menu${index + 1}`}
                    checked={menuSelection.includes(`menu${index + 1}`)}
                    onChange={(e) => handleCheckboxChange(menuSelection, setMenuSelection, e.target.value)}
                    className="mb-2"
                  />
                  <img src={img} alt={`Menu ${index + 1}`} className="w-12 h-12 object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <h3 className="flex items-center">
              <span style={{ marginRight: '8px' }}>
                <FaMapMarkerAlt size={20} />
              </span>
              Gebiete
            </h3>
            {["KVV", "Außerhalb KVV"].map((area, index) => (
              <div key={index} className="flex items-center my-2">
                <input
                  type="checkbox"
                  name="area"
                  value={area}
                  checked={areaSelection.includes(area)}
                  onChange={(e) => handleCheckboxChange(areaSelection, setAreaSelection, e.target.value)}
                  className="mr-2"
                />
                <span>{area}</span>
              </div>
            ))}
          </div>
        
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <h3 className="flex items-center">
              <span style={{ marginRight: '8px' }}>
                <FaLanguage size={20} />
              </span>
              Sprachen
            </h3>
            {[
              { code: "DE", label: "Deutsch", value: "Deutsch" },
              { code: "GB", label: "Englisch", value: "Englisch" },
            ].map((lang, index) => (
              <div key={index} className="flex items-center my-2">
                <input
                  type="checkbox"
                  name="language"
                  value={lang.value}
                  checked={languageSelection.includes(lang.value)}
                  onChange={(e) => handleCheckboxChange(languageSelection, setLanguageSelection, e.target.value)}
                  className="mr-2"
                />
                <FlagIcon code={lang.code} size={16} className="mr-2" />
                <span>{lang.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <h3>Wetter</h3>
            {[
              { icon: <FaSun size={20} />, label: "Sonnig", value: "sunny" },
              { icon: <FaCloud size={20} />, label: "Bewölkt", value: "cloudy" },
              { icon: <FaCloudRain size={20} />, label: "Regnerisch", value: "rainy" },
              { icon: <FaSnowflake size={20} />, label: "Schnee", value: "snowy" },
            ].map((weather, index) => (
              <div key={index} className="flex items-center my-2">
                <input
                  type="checkbox"
                  name="weather"
                  value={weather.value}
                  checked={weatherSelection.includes(weather.value)}
                  onChange={(e) => handleCheckboxChange(weatherSelection, setWeatherSelection, e.target.value)}
                  className="mr-2"
                />
                <span className="mr-2">{weather.icon}</span>
                <span>{weather.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <h3>Temperatur</h3>
            <div className="flex items-center">
              <input
                type="number"
                value={temperatureRange[0]}
                onChange={(e) => setTemperatureRange([+e.target.value, temperatureRange[1]])}
                className="bg-gray-700 text-white p-2 rounded w-full mr-2"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={temperatureRange[1]}
                onChange={(e) => setTemperatureRange([temperatureRange[0], +e.target.value])}
                className="bg-gray-700 text-white p-2 rounded w-full ml-2"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <h3>Datum</h3>
            <div className="flex flex-col space-y-2">
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded w-full"
                placeholder="Von"
              />
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded w-full"
                placeholder="Bis"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveFilters}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Filter anwenden
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
