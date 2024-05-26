import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ScreenshotPreview from './components/ScreenshotPreview';
import FilterModal from './components/FilterModal';
import HelpPage from './components/HelpPage';
import ScreenshotDetails from './components/ScreenshotDetails';

function App() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  return (
    <div className="App">
      <Header />
      <SearchSection toggleFilterModal={toggleFilterModal} />
      <FilterModal isVisible={isFilterModalVisible} toggleFilterModal={toggleFilterModal} />
      <ScreenshotPreview />
      <HelpPage />
      <ScreenshotDetails />
    </div>
  );
}

export default App;
