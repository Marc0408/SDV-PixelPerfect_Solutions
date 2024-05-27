const FilterModal = ({ isVisible, toggleFilterModal }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
        <button onClick={toggleFilterModal} className="absolute top-4 right-4 text-2xl">&times;</button>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Menüpunkte</h3>
            <label><input type="checkbox" name="menu" value="menu1" /> Menu 1</label><br />
            <label><input type="checkbox" name="menu" value="menu2" /> Menu 2</label><br />
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Gebiete</h3>
            <label><input type="checkbox" name="area" value="area1" /> KVV</label><br />
            <label><input type="checkbox" name="area" value="area2" /> Außerhalb KVV</label>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Dropdown Menü</h3>
            <label><input type="checkbox" name="dropdown" value="option1" /> Option 1</label><br />
            <label><input type="checkbox" name="dropdown" value="option2" /> Option 2</label>
          </div>
          <div className="flex-1 min-w-150 bg-gray-800 p-4 rounded-lg shadow">
            <h3>Sprachen</h3>
            <label><input type="checkbox" name="language" value="de" /> Deutsch</label><br />
            <label><input type="checkbox" name="language" value="en" /> Englisch</label>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => { /* reset filters logic */ }} className="bg-red-600 hover:bg-red-500 p-2 rounded">Alle Auswahlen Entfernen</button>
          <button onClick={() => { /* save filters logic */ }} className="bg-blue-600 hover:bg-blue-500 p-2 rounded">Speichern</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
