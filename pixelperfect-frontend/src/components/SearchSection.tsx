const SearchSection = ({  toggleFilterModal }) => {
  return (
    <section className="flex justify-between p-4 bg-gray-700 shadow">
      <div className="flex-1">
        <p className="text-white">Screenshots</p>
      </div>
      <div className="flex-1 flex justify-center">
        <input type="text" placeholder="Search..." className="w-4/5 p-2 border border-gray-600 rounded bg-gray-800 text-white" />
      </div>
      <div className="flex-1 flex justify-end">
        <button onClick={toggleFilterModal} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
          Filter
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
