import {useState} from "react";
import { FaUtensils, FaMapMarkerAlt, FaLanguage, FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';
import { FlagIcon } from 'react-flag-kit';

import menu1Image from '../assets/menu1.png';
import menu2Image from '../assets/menu2.png';
import menu3Image from '../assets/menu3.png';
import menu4Image from '../assets/menu4.png';
import menu5Image from '../assets/menu5.png';
import menu6Image from '../assets/menu6.png';

const FilterModal = ({ isVisible, toggleFilterModal }) => {
  const [menuSelection, setMenuSelection] = useState('');
  const [areaSelection, setAreaSelection] = useState('');
  const [dropdownSelection, setDropdownSelection] = useState('');
  const [languageSelection, setLanguageSelection] = useState('');
  const [weatherSelection, setWeatherSelection] = useState('');
  const [temperatureRange, setTemperatureRange] = useState([0, 30]);
  if (!isVisible) return null;

  const handleSaveFilters = () => {
    const filters = {
      menu: menuSelection,
      area: areaSelection,
      dropdown: dropdownSelection,
      language: languageSelection,
      weather: weatherSelection,
      temperature: temperatureRange,
    };
    console.log('Selected Filters:', filters)
    return filters;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
        <button onClick={toggleFilterModal} className="absolute top-4 right-4 text-2xl">&times;</button>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3><FaUtensils /> Menüpunkte</h3>
            <div>
              <input
                type="radio"
                name="menu"
                value="menu1"
                checked={menuSelection === 'menu1'}
                onChange={(e) => setMenuSelection(e.target.value)}
              />
              <img src={menu1Image} alt="Menu 1" /> {/* Bild für Menu 1 */}
            </div>
            <div>
              <input
                type="radio"
                name="menu"
                value="menu2"
                checked={menuSelection === 'menu2'}
                onChange={(e) => setMenuSelection(e.target.value)}
              />
              <img src={menu2Image} alt="Menu 2" /> {/* Bild für Menu 2 */}
            </div>
            <div>
              <input
                type="radio"
                name="menu"
                value="menu3"
                checked={menuSelection === 'menu3'}
                onChange={(e) => setMenuSelection(e.target.value)}
              />
              <img src={menu3Image} alt="Menu 3" /> {/* Bild für Menu 3 */}
            </div>
            <div>
              <input
                type="radio"
                name="menu"
                value="menu4"
                checked={menuSelection === 'menu4'}
                onChange={(e) => setMenuSelection(e.target.value)}
              />
              <img src={menu4Image} alt="Menu 4" /> {/* Bild für Menu 4 */}
            </div>
            <div>
              <input
                type="radio"
                name="menu"
                value="menu5"
                checked={menuSelection === 'menu5'}
                onChange={(e) => setMenuSelection(e.target.value)}
              />
              <img src={menu5Image} alt="Menu 5" /> {/* Bild für Menu 5 */}
            </div>
            <div>
              <input
                type="radio"
                name="menu"
                value="menu6"
                checked={menuSelection === 'menu6'}
                onChange={(e) => setMenuSelection(e.target.value)}
              />
              <img src={menu6Image} alt="Menu 6" /> {/* Bild für Menu 6 */}
            </div>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3><FaMapMarkerAlt /> Gebiete</h3>
            <div>
              <input
                type="radio"
                name="area"
                value="area1"
                checked={areaSelection === 'area1'}
                onChange={(e) => setAreaSelection(e.target.value)}
              />
              <span> KVV</span>
            </div>
            <div>
              <input
                type="radio"
                name="area"
                value="area2"
                checked={areaSelection === 'area2'}
                onChange={(e) => setAreaSelection(e.target.value)}
              />
              <span> Außerhalb KVV</span>
            </div>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Dropdown Menü</h3>
            <select
              value={dropdownSelection}
              onChange={(e) => setDropdownSelection(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded w-full"
            >
              <option value="">Bitte wählen</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3><FaLanguage /> Sprachen</h3>
            <div>
              <input
                type="radio"
                name="language"
                value="de"
                checked={languageSelection === 'de'}
                onChange={(e) => setLanguageSelection(e.target.value)}
              />
              <span><FlagIcon code="DE" size={16} /> Deutsch</span>
            </div>
            <div>
              <input
                type="radio"
                name="language"
                value="en"
                checked={languageSelection === 'en'}
                onChange={(e) => setLanguageSelection(e.target.value)}
              />
              <span><FlagIcon code="GB" size={16} /> Englisch</span>
            </div>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Wetter</h3>
            <div>
              <input
                type="radio"
                name="weather"
                value="sunny"
                checked={weatherSelection === 'sunny'}
                onChange={(e) => setWeatherSelection(e.target.value)}
              />
              <span><FaSun /> Sonnig</span>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="cloudy"
                checked={weatherSelection === 'cloudy'}
                onChange={(e) => setWeatherSelection(e.target.value)}
              />
              <span><FaCloud /> Bewölkt</span>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="rain"
                checked={weatherSelection === 'rain'}
                onChange={(e) => setWeatherSelection(e.target.value)}
              />
              <span><FaCloudRain /> Regen</span>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="snow"
                checked={weatherSelection === 'snow'}
                onChange={(e) => setWeatherSelection(e.target.value)}
              />
              <span><FaSnowflake /> Schnee</span>
            </div>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Temperatur</h3>
            <div className="flex items-center">
              <input
                type="range"
                min="-30"
                max="50"
                value={temperatureRange[0]}
                onChange={(e) => setTemperatureRange([Number(e.target.value), temperatureRange[1]])}
                className="mr-2"
              />
              <span>{temperatureRange[0]}°C</span>
            </div>
            <div className="flex items-center">
              <input
                type="range"
                min="-30"
                max="50"
                value={temperatureRange[1]}
                onChange={(e) => setTemperatureRange([temperatureRange[0], Number(e.target.value)])}
                className="mr-2"
              />
              <span>{temperatureRange[1]}°C</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => { 
              setMenuSelection('');
              setAreaSelection('');
              setDropdownSelection('');
              setLanguageSelection('');
              setWeatherSelection('');
              setTemperatureRange([0, 30]);
            }} className="bg-red-600 hover:bg-red-500 p-2 rounded">Alle Auswahlen Entfernen</button>
          <button onClick={handleSaveFilters} className="bg-blue-600 hover:bg-blue-500 p-2 rounded">Speichern</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;